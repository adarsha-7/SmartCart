const { PrismaClient } = require("../backend/generated/prisma");

const prisma = new PrismaClient();

// Configuration constants for recommendations
const CONFIG = {
    CACHE_DURATION: 30 * 60 * 1000, // 30 minutes TTL
    DEFAULT_LIMIT: 10,
    MIN_SIMILARITY: 0.05,
    SIMILAR_LIMIT: 8,
    
    // Recommendation boost factors
    BOOST_FACTORS: {
        SAME_CATEGORY: 1.3,     // 30% boost for shared categories
        SAME_SUBCATEGORY: 1.2,   // 20% boost for shared subcategories  
        SIMILAR_PRICE: 1.1,      // 10% boost for similar price range (±25%)
        TRENDING: 1.05,          // 5% boost for trending products
        FEATURED: 1.05,          // 5% boost for featured products
        HIGH_RATING: 1.05        // 5% boost for high-rated products (≥4.0)
    },
    
    // Field weights for recommendation document construction
    WEIGHTS: {
        PRODUCT_NAME: 2,
        CATEGORIES: 3,     // Higher weight for better category matching
        SUBCATEGORIES: 2,
        DESCRIPTION: 1,
        SELLER: 1
    },
    
    // Distribution for "You Might Also Like" recommendations
    SIMILAR_DISTRIBUTION: {
        TRENDING: 0.2,   // 20%
        FEATURED: 0.2,   // 20%
        CATEGORY: 0.3,   // 30%
        POPULAR: 0.2,    // 20%
        RECENT: 0.1      // 10%
    }
};

// In-memory cache for recommendation vectors (use Redis in production)
const recommendationCache = new Map();

// English stop words for text preprocessing (shared with search engine)
const STOP_WORDS = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'must', 'can', 'shall', 'this', 'that', 'these', 'those', 'a', 'an'
]);

/**
 * Text preprocessing pipeline for recommendation documents
 * @param {string} text - Raw text input
 * @returns {string[]} Array of processed tokens
 */
function preprocessText(text) {
    if (!text) return [];
    
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 2)
        .filter(word => !STOP_WORDS.has(word));
}

/**
 * TF-IDF vectorization optimized for product recommendations
 * @param {Object[]} products - Product documents with enhanced searchText
 * @returns {Object} Vectors and vocabulary for similarity computation
 */
function createProductVectors(products) {
    const vocabulary = new Set();
    const docTermFreq = [];
    
    // Phase 1: Build vocabulary and term frequencies
    products.forEach(product => {
        const terms = preprocessText(product.searchText);
        const termCount = {};
        
        terms.forEach(term => {
            vocabulary.add(term);
            termCount[term] = (termCount[term] || 0) + 1;
        });
        
        docTermFreq.push({
            ...product,
            terms: termCount,
            totalTerms: terms.length
        });
    });
    
    const vocabArray = Array.from(vocabulary);
    const docCount = products.length;
    
    // Phase 2: Calculate IDF scores
    const idfScores = {};
    vocabArray.forEach(term => {
        const docsWithTerm = docTermFreq.filter(doc => doc.terms[term] > 0).length;
        idfScores[term] = Math.log(docCount / (docsWithTerm + 1));
    });
    
    // Phase 3: Create sparse TF-IDF vectors
    const vectors = docTermFreq.map(doc => {
        const vector = {};
        vocabArray.forEach(term => {
            const tf = doc.terms[term] || 0;
            if (tf > 0) {
                const normalizedTF = tf / (doc.totalTerms || 1);
                vector[term] = normalizedTF * idfScores[term];
            }
        });
        return {
            ...doc,
            vector: vector
        };
    });
    
    return { vectors, vocabulary: vocabArray };
}

/**
 * Cosine similarity calculation for recommendation vectors
 * @param {Object} vectorA - First vector (sparse object)
 * @param {Object} vectorB - Second vector (sparse object)
 * @param {string[]} vocabulary - Complete vocabulary array
 * @returns {number} Similarity score [0, 1]
 */
function cosineSimilarity(vectorA, vectorB, vocabulary) {
    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;
    
    vocabulary.forEach(term => {
        const a = vectorA[term] || 0;
        const b = vectorB[term] || 0;
        
        dotProduct += a * b;
        magnitudeA += a * a;
        magnitudeB += b * b;
    });
    
    magnitudeA = Math.sqrt(magnitudeA);
    magnitudeB = Math.sqrt(magnitudeB);
    
    if (magnitudeA === 0 || magnitudeB === 0) {
        return 0;
    }
    
    return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Fetch and cache recommendation data with time-based bucketing
 * @returns {Object} Product data with trending/featured flags
 */
async function getRecommendationData() {
    const cacheKey = `recommendations_${Date.now() - (Date.now() % CONFIG.CACHE_DURATION)}`;
    
    if (recommendationCache.has(cacheKey)) {
        console.log("Cache hit: Using cached recommendation data");
        return recommendationCache.get(cacheKey);
    }
    
    console.log("Cache miss: Fetching fresh recommendation data");
    
    const [productsData, trending, featured] = await Promise.all([
        prisma.product.findMany({
            include: {
                categories: true,
                subCategories: true,
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                        image: true
                    }
                }
            }
        }),
        prisma.trendingProduct.findMany(),
        prisma.featuredProduct.findMany()
    ]);
    
    const result = {
        products: productsData,
        trendingIds: new Set(trending.map(t => t.id)),
        featuredIds: new Set(featured.map(f => f.id))
    };
    
    recommendationCache.set(cacheKey, result);
    
    // Cleanup expired cache entries
    for (const [key] of recommendationCache) {
        if (key !== cacheKey && key.startsWith('recommendations_')) {
            recommendationCache.delete(key);
        }
    }
    
    return result;
}

/**
 * Prepare products for recommendation calculation with enhanced weighting
 * @param {Object[]} products - Raw product objects
 * @param {Set} trendingIds - Set of trending product IDs
 * @param {Set} featuredIds - Set of featured product IDs
 * @returns {Object[]} Enhanced recommendation documents
 */
function prepareRecommendationDocuments(products, trendingIds, featuredIds) {
    return products.map(product => {
        const categoryNames = product.categories.map(cat => cat.name).join(' ');
        const subCategoryNames = product.subCategories.map(subCat => subCat.name).join(' ');
        const sellerName = `${product.user.first_name || ''} ${product.user.last_name || ''}`.trim();
        
        // Enhanced weighting for recommendation quality
        const searchComponents = [
            product.name.repeat(CONFIG.WEIGHTS.PRODUCT_NAME),
            product.description || '',
            categoryNames.repeat(CONFIG.WEIGHTS.CATEGORIES), // Critical for recommendations
            subCategoryNames.repeat(CONFIG.WEIGHTS.SUBCATEGORIES),
            sellerName.repeat(CONFIG.WEIGHTS.SELLER)
        ];
        
        let searchText = searchComponents.join(' ');
        
        // Add contextual signals for trending/featured products
        if (trendingIds.has(product.id)) {
            searchText += ' trending popular';
        }
        if (featuredIds.has(product.id)) {
            searchText += ' featured special';
        }
        
        return {
            id: product.id,
            product: product,
            searchText: searchText,
            isTrending: trendingIds.has(product.id),
            isFeatured: featuredIds.has(product.id)
        };
    });
}

/**
 * Calculate multi-factor recommendation boost scores
 * @param {Object} doc - Recommendation document
 * @param {Object} targetProduct - Target product for comparison
 * @returns {Object} Boost factor and applied boost descriptions
 */
function calculateRecommendationBoost(doc, targetProduct) {
    let boost = 1.0;
    const boosts = [];
    
    // Category affinity boost (strongest signal)
    const sharedCategories = doc.product.categories.filter(cat => 
        targetProduct.categories.some(targetCat => targetCat.id === cat.id)
    );
    if (sharedCategories.length > 0) {
        boost *= CONFIG.BOOST_FACTORS.SAME_CATEGORY;
        boosts.push(`Same Category (+${((CONFIG.BOOST_FACTORS.SAME_CATEGORY - 1) * 100).toFixed(0)}%)`);
    }
    
    // Subcategory affinity boost
    const sharedSubCategories = doc.product.subCategories.filter(subCat => 
        targetProduct.subCategories.some(targetSubCat => targetSubCat.id === subCat.id)
    );
    if (sharedSubCategories.length > 0) {
        boost *= CONFIG.BOOST_FACTORS.SAME_SUBCATEGORY;
        boosts.push(`Same Subcategory (+${((CONFIG.BOOST_FACTORS.SAME_SUBCATEGORY - 1) * 100).toFixed(0)}%)`);
    }
    
    // Price similarity boost (within 25% range)
    const priceRatio = Math.abs(doc.product.price - targetProduct.price) / targetProduct.price;
    if (priceRatio <= 0.25) {
        boost *= CONFIG.BOOST_FACTORS.SIMILAR_PRICE;
        boosts.push(`Similar Price (+${((CONFIG.BOOST_FACTORS.SIMILAR_PRICE - 1) * 100).toFixed(0)}%)`);
    }
    
    // Business signal boosts
    if (doc.isTrending) {
        boost *= CONFIG.BOOST_FACTORS.TRENDING;
        boosts.push("Trending (+5%)");
    }
    
    if (doc.isFeatured) {
        boost *= CONFIG.BOOST_FACTORS.FEATURED;
        boosts.push("Featured (+5%)");
    }
    
    if (doc.product.rating >= 4.0) {
        boost *= CONFIG.BOOST_FACTORS.HIGH_RATING;
        boosts.push(`High Rating (+5%)`);
    }
    
    return { boost, boosts };
}

/**
 * Generate content-based product recommendations using TF-IDF similarity
 * @param {number} targetProductId - Target product ID for recommendations
 * @param {number} limit - Maximum recommendations to return
 * @param {number} minSimilarity - Minimum similarity threshold
 * @returns {Object[]} Ranked product recommendations
 */
async function getProductRecommendations(targetProductId, limit = CONFIG.DEFAULT_LIMIT, minSimilarity = CONFIG.MIN_SIMILARITY) {
    try {
        console.log(`\n=== GENERATING RECOMMENDATIONS FOR PRODUCT ID: ${targetProductId} ===`);
        
        const { products, trendingIds, featuredIds } = await getRecommendationData();
        
        // Find target product
        const targetProduct = products.find(p => p.id === parseInt(targetProductId));
        if (!targetProduct) {
            console.log("Target product not found");
            return [];
        }
        
        console.log(`Target: "${targetProduct.name}"`);
        console.log(`Categories: ${targetProduct.categories.map(c => c.name).join(', ')}`);
        
        // Filter out target product
        const otherProducts = products.filter(p => p.id !== parseInt(targetProductId));
        
        if (otherProducts.length === 0) {
            console.log("No other products available");
            return [];
        }
        
        // Prepare recommendation documents
        const documents = prepareRecommendationDocuments([targetProduct, ...otherProducts], trendingIds, featuredIds);
        
        console.log("Creating recommendation vectors...");
        const { vectors, vocabulary } = createProductVectors(documents);
        console.log(`Vocabulary: ${vocabulary.length} terms`);
        
        // Extract vectors for similarity calculation
        const targetVector = vectors.find(v => v.id === parseInt(targetProductId)).vector;
        const otherVectors = vectors.filter(v => v.id !== parseInt(targetProductId));
        
        console.log("Computing content-based similarities...");
        
        // Calculate similarities with multi-factor boosting
        const similarities = otherVectors.map(doc => {
            const rawSimilarity = cosineSimilarity(targetVector, doc.vector, vocabulary);
            const { boost, boosts } = calculateRecommendationBoost(doc, targetProduct);
            const boostedSimilarity = rawSimilarity * boost;
            
            return {
                product: doc.product,
                rawSimilarity: rawSimilarity,
                boostedSimilarity: boostedSimilarity,
                boosts: boosts,
                isTrending: doc.isTrending,
                isFeatured: doc.isFeatured
            };
        });
        
        // Sort and filter recommendations
        const sortedSimilarities = similarities
            .sort((a, b) => b.boostedSimilarity - a.boostedSimilarity)
            .filter(item => item.boostedSimilarity >= minSimilarity);
        
        // Log top recommendations for debugging
        const displayCount = Math.min(10, sortedSimilarities.length);
        console.log(`\nTop ${displayCount} recommendations:`);
        console.log("─".repeat(130));
        console.log("RANK | PRODUCT NAME                    | RAW SCORE | BOOSTED | BOOSTS APPLIED");
        console.log("─".repeat(130));
        
        sortedSimilarities.slice(0, displayCount).forEach((item, index) => {
            const rank = (index + 1).toString().padStart(4);
            const name = item.product.name.substring(0, 30).padEnd(30);
            const rawScore = item.rawSimilarity.toFixed(4).padStart(9);
            const boostedScore = item.boostedSimilarity.toFixed(4).padStart(7);
            const boosts = item.boosts.length > 0 ? item.boosts.join(", ") : "None";
            
            console.log(`${rank} | ${name} | ${rawScore} | ${boostedScore} | ${boosts}`);
        });
        
        console.log("─".repeat(130));
        console.log(`Total above threshold (${minSimilarity}): ${sortedSimilarities.length}`);
        
        // Format final results with recommendation badges
        const finalResults = sortedSimilarities
            .slice(0, limit)
            .map(item => ({
                ...item.product,
                similarityScore: Math.round(item.boostedSimilarity * 10000) / 10000,
                rawSimilarity: Math.round(item.rawSimilarity * 10000) / 10000,
                recommendationBadges: {
                    trending: item.isTrending,
                    featured: item.isFeatured,
                    highRated: item.product.rating >= 4.0,
                    popular: item.product.quantitySold > 10,
                    sameCategory: item.boosts.some(b => b.includes('Same Category')),
                    similarPrice: item.boosts.some(b => b.includes('Similar Price'))
                }
            }));
        
        console.log(`Returning ${finalResults.length} recommendations\n`);
        return finalResults;
        
    } catch (error) {
        console.error('Recommendation generation error:', error);
        throw error;
    }
}

/**
 * Category-based recommendation fallback for insufficient TF-IDF results
 * @param {number} targetProductId - Target product ID
 * @param {number} limit - Result limit
 * @returns {Object[]} Category-matched recommendations
 */
async function getCategoryBasedRecommendations(targetProductId, limit = CONFIG.DEFAULT_LIMIT) {
    try {
        console.log(`\n=== FALLBACK: Category-based recommendations for ${targetProductId} ===`);
        
        const targetProduct = await prisma.product.findUnique({
            where: { id: parseInt(targetProductId) },
            include: {
                categories: true,
                subCategories: true
            }
        });
        
        if (!targetProduct) {
            return [];
        }
        
        const categoryIds = targetProduct.categories.map(cat => cat.id);
        const subCategoryIds = targetProduct.subCategories.map(subCat => subCat.id);
        
        const recommendations = await prisma.product.findMany({
            where: {
                AND: [
                    { id: { not: parseInt(targetProductId) } },
                    {
                        OR: [
                            { categories: { some: { id: { in: categoryIds } } } },
                            { subCategories: { some: { id: { in: subCategoryIds } } } }
                        ]
                    }
                ]
            },
            include: {
                categories: true,
                subCategories: true,
                user: {
                    select: {
                        first_name: true,
                        last_name: true,
                        image: true
                    }
                },
                featuredProduct: true,
                trendingProduct: true
            },
            take: limit,
            orderBy: [
                { quantitySold: 'desc' },
                { rating: 'desc' },
                { createdAt: 'desc' }
            ]
        });
        
        console.log(`Category-based fallback: ${recommendations.length} results`);
        
        return recommendations.map(product => ({
            ...product,
            similarityScore: 0.3, // Lower baseline score
            rawSimilarity: 0.3,
            recommendationBadges: {
                trending: !!product.trendingProduct,
                featured: !!product.featuredProduct,
                highRated: product.rating >= 4.0,
                popular: product.quantitySold > 10,
                sameCategory: true,
                similarPrice: false
            }
        }));
        
    } catch (error) {
        console.error('Category-based recommendation error:', error);
        return [];
    }
}

/**
 * Generate diversified "You Might Also Like" recommendations
 * @param {number} targetProductId - Target product ID
 * @param {number} limit - Result limit
 * @returns {Object[]} Diversified recommendation mix
 */
async function getSimilarRecommendations(targetProductId, limit = CONFIG.SIMILAR_LIMIT) {
    try {
        console.log(`\n=== GENERATING "YOU MIGHT ALSO LIKE" FOR PRODUCT ID: ${targetProductId} ===`);
        
        const targetProduct = await prisma.product.findUnique({
            where: { id: parseInt(targetProductId) },
            include: {
                categories: true,
                subCategories: true
            }
        });
        
        if (!targetProduct) {
            return [];
        }
        
        // Calculate distribution counts
        const counts = {
            trending: Math.ceil(limit * CONFIG.SIMILAR_DISTRIBUTION.TRENDING),
            featured: Math.ceil(limit * CONFIG.SIMILAR_DISTRIBUTION.FEATURED),
            category: Math.ceil(limit * CONFIG.SIMILAR_DISTRIBUTION.CATEGORY),
            popular: Math.ceil(limit * CONFIG.SIMILAR_DISTRIBUTION.POPULAR),
            recent: Math.ceil(limit * CONFIG.SIMILAR_DISTRIBUTION.RECENT)
        };
        
        // Parallel fetching for different recommendation types
        const [
            trendingProducts,
            featuredProducts,
            categoryProducts,
            popularProducts,
            recentProducts
        ] = await Promise.all([
            // Trending products
            prisma.product.findMany({
                where: {
                    id: { not: parseInt(targetProductId) },
                    trendingProduct: { isNot: null }
                },
                include: {
                    categories: true,
                    subCategories: true,
                    user: { select: { first_name: true, last_name: true, image: true } },
                    trendingProduct: true,
                    featuredProduct: true
                },
                take: counts.trending,
                orderBy: { quantitySold: 'desc' }
            }),
            
            // Featured products
            prisma.product.findMany({
                where: {
                    id: { not: parseInt(targetProductId) },
                    featuredProduct: { isNot: null }
                },
                include: {
                    categories: true,
                    subCategories: true,
                    user: { select: { first_name: true, last_name: true, image: true } },
                    trendingProduct: true,
                    featuredProduct: true
                },
                take: counts.featured,
                orderBy: { rating: 'desc' }
            }),
            
            // Same category products
            prisma.product.findMany({
                where: {
                    AND: [
                        { id: { not: parseInt(targetProductId) } },
                        {
                            categories: {
                                some: {
                                    id: { in: targetProduct.categories.map(c => c.id) }
                                }
                            }
                        }
                    ]
                },
                include: {
                    categories: true,
                    subCategories: true,
                    user: { select: { first_name: true, last_name: true, image: true } },
                    trendingProduct: true,
                    featuredProduct: true
                },
                take: counts.category,
                orderBy: { quantitySold: 'desc' }
            }),
            
            // Popular products overall
            prisma.product.findMany({
                where: {
                    id: { not: parseInt(targetProductId) }
                },
                include: {
                    categories: true,
                    subCategories: true,
                    user: { select: { first_name: true, last_name: true, image: true } },
                    trendingProduct: true,
                    featuredProduct: true
                },
                take: counts.popular,
                orderBy: [
                    { quantitySold: 'desc' },
                    { rating: 'desc' }
                ]
            }),
            
            // Recent products
            prisma.product.findMany({
                where: {
                    id: { not: parseInt(targetProductId) }
                },
                include: {
                    categories: true,
                    subCategories: true,
                    user: { select: { first_name: true, last_name: true, image: true } },
                    trendingProduct: true,
                    featuredProduct: true
                },
                take: counts.recent,
                orderBy: { createdAt: 'desc' }
            })
        ]);
        
        // Combine and deduplicate products
        const allProducts = [];
        const seenIds = new Set();
        
        const addProducts = (products, type, priority) => {
            products.forEach(product => {
                if (!seenIds.has(product.id)) {
                    seenIds.add(product.id);
                    allProducts.push({
                        ...product,
                        recommendationType: type,
                        priority: priority,
                        similarityScore: 0.1 + (priority * 0.1),
                        rawSimilarity: 0.1 + (priority * 0.1),
                        recommendationBadges: {
                            trending: !!product.trendingProduct,
                            featured: !!product.featuredProduct,
                            highRated: product.rating >= 4.0,
                            popular: product.quantitySold > 10,
                            sameCategory: type === 'category',
                            similarPrice: false // Not calculated for mixed recommendations
                        }
                    });
                }
            });
        };
        
        // Add products with priority weighting
        addProducts(trendingProducts, 'trending', 5);
        addProducts(featuredProducts, 'featured', 4);
        addProducts(categoryProducts, 'category', 3);
        addProducts(popularProducts, 'popular', 2);
        addProducts(recentProducts, 'recent', 1);
        
        // Shuffle for diversity and take requested limit
        const shuffledProducts = allProducts.sort(() => Math.random() - 0.5);
        const finalResults = shuffledProducts.slice(0, limit);
        
        console.log(`\n"You Might Also Like" composition:`);
        console.log(`- Trending: ${trendingProducts.length}`);
        console.log(`- Featured: ${featuredProducts.length}`);
        console.log(`- Category: ${categoryProducts.length}`);
        console.log(`- Popular: ${popularProducts.length}`);
        console.log(`- Recent: ${recentProducts.length}`);
        console.log(`- Final: ${finalResults.length} (shuffled)`);
        
        return finalResults;
        
    } catch (error) {
        console.error('"You Might Also Like" generation error:', error);
        return [];
    }
}

/**
 * Clear recommendation cache
 */
function clearRecommendationCache() {
    recommendationCache.clear();
    console.log("Recommendation cache cleared");
}

/**
 * Get recommendation cache statistics
 * @returns {Object} Cache information
 */
function getRecommendationCacheInfo() {
    return {
        size: recommendationCache.size,
        keys: Array.from(recommendationCache.keys()),
        memoryUsage: process.memoryUsage ? process.memoryUsage() : 'N/A'
    };
}

module.exports = {
    getProductRecommendations,
    getCategoryBasedRecommendations,
    getSimilarRecommendations,
    clearRecommendationCache,
    getRecommendationCacheInfo,
    CONFIG,
    prisma
};