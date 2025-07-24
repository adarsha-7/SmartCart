// recommendCore.js
const { PrismaClient } = require("../generated/prisma");
const { CONFIG, prepareRecommendationDocuments, createProductVectors, cosineSimilarity, calculateRecommendationBoost } = require('./recommendUtils');

const prisma = new PrismaClient();
const recommendationCache = new Map();

/**
 * Fetch and cache recommendation data with time-based bucketing
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
 * Generate content-based product recommendations using TF-IDF similarity
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
 * Category-based recommendation fallback
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
        const [trendingProducts, featuredProducts, categoryProducts, popularProducts, recentProducts] = await Promise.all([
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
    prisma
};