const { PrismaClient } = require("../backend/generated/prisma");

const prisma = new PrismaClient();

// Cache for storing processed vectors (in production, use Redis)
const vectorCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Text preprocessing function
 * Cleans and normalizes text for TF-IDF processing
 */
function preprocessText(text) {
    if (!text) return [];
    
    return text
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ') // Remove punctuation
        .split(/\s+/)
        .filter(word => word.length > 2) // Remove short words
        .filter(word => !['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'shall', 'this', 'that', 'these', 'those', 'a', 'an'].includes(word)); // Remove stop words
}

/**
 * Create TF-IDF vectors for documents
 * Returns vectors and vocabulary for similarity calculations
 */
function createTFIDFVectors(documents) {
    const vocabulary = new Set();
    const docTermFreq = [];
    
    // Build vocabulary and calculate term frequencies
    documents.forEach(doc => {
        const terms = preprocessText(doc.searchText);
        const termCount = {};
        
        terms.forEach(term => {
            vocabulary.add(term);
            termCount[term] = (termCount[term] || 0) + 1;
        });
        
        docTermFreq.push({
            ...doc,
            terms: termCount,
            totalTerms: terms.length
        });
    });
    
    const vocabArray = Array.from(vocabulary);
    const docCount = documents.length;
    
    // Calculate IDF for each term
    const idfScores = {};
    vocabArray.forEach(term => {
        const docsWithTerm = docTermFreq.filter(doc => doc.terms[term] > 0).length;
        idfScores[term] = Math.log(docCount / (docsWithTerm + 1));
    });
    
    // Create TF-IDF vectors
    const vectors = docTermFreq.map(doc => {
        const vector = {};
        vocabArray.forEach(term => {
            const tf = doc.terms[term] || 0;
            const normalizedTF = tf / (doc.totalTerms || 1);
            vector[term] = normalizedTF * idfScores[term];
        });
        return {
            ...doc,
            vector: vector
        };
    });
    
    return { vectors, vocabulary: vocabArray };
}

/**
 * Calculate cosine similarity between two vectors
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
 * Fetch and cache product data with related information
 */
async function getProductData() {
    const cacheKey = `products_${Date.now() - (Date.now() % CACHE_DURATION)}`;
    
    // Check cache first
    if (vectorCache.has(cacheKey)) {
        const cached = vectorCache.get(cacheKey);
        console.log("Using cached product data");
        return cached;
    }
    
    console.log("Fetching fresh product data from database");
    
    // Fetch all products with related data
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
    
    // Cache the results
    vectorCache.set(cacheKey, result);
    
    // Clean old cache entries
    for (const [key] of vectorCache) {
        if (key !== cacheKey && key.startsWith('products_')) {
            vectorCache.delete(key);
        }
    }
    
    return result;
}

/**
 * Prepare product documents for similarity calculation
 */
function prepareProductDocuments(products, trendingIds, featuredIds) {
    return products.map(product => {
        const categoryNames = product.categories.map(cat => cat.name).join(' ');
        const subCategoryNames = product.subCategories.map(subCat => subCat.name).join(' ');
        const sellerName = `${product.user.first_name || ''} ${product.user.last_name || ''}`.trim();
        
        // Enhanced search text with weighted importance
        let searchText = [
            product.name + ' ' + product.name + ' ' + product.name, // Triple weight for product name
            product.description || '',
            categoryNames + ' ' + categoryNames, // Double weight for categories
            subCategoryNames,
            sellerName
        ].join(' ');
        
        // Add trending/featured boost
        if (trendingIds.has(product.id)) {
            searchText += ' trending popular hot selling bestseller';
        }
        if (featuredIds.has(product.id)) {
            searchText += ' featured special recommended highlight';
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
 * Apply boost factors to similarity scores
 */
function applyBoostFactors(doc, rawSimilarity) {
    let boostedSimilarity = rawSimilarity;
    const boosts = [];
    
    // Boost trending products by 15%
    if (doc.isTrending) {
        boostedSimilarity *= 1.15;
        boosts.push("Trending (+15%)");
    }
    
    // Boost featured products by 10%
    if (doc.isFeatured) {
        boostedSimilarity *= 1.10;
        boosts.push("Featured (+10%)");
    }
    
    // Boost products with higher ratings
    const rating = doc.product.rating || 0;
    if (rating >= 4.0) {
        boostedSimilarity *= 1.05;
        boosts.push(`High Rating (${rating}/5.0, +5%)`);
    }
    
    // Boost products with more sales
    const sales = doc.product.quantitySold || 0;
    if (sales > 10) {
        boostedSimilarity *= 1.03;
        boosts.push(`Popular Sales (${sales} sold, +3%)`);
    }
    
    return { boostedSimilarity, boosts };
}

/**
 * Log detailed similarity results in a formatted table
 */
function logSimilarityResults(similarities, query, minSimilarity) {
    console.log(`\nTop ${Math.min(10, similarities.length)} similarity scores:`);
    console.log("─".repeat(120));
    console.log("RANK | PRODUCT NAME                    | RAW SCORE | BOOSTED | BOOSTS APPLIED");
    console.log("─".repeat(120));
    
    similarities.slice(0, 10).forEach((item, index) => {
        const rank = (index + 1).toString().padStart(4);
        const name = item.product.name.substring(0, 30).padEnd(30);
        const rawScore = item.rawSimilarity.toFixed(4).padStart(9);
        const boostedScore = item.boostedSimilarity.toFixed(4).padStart(7);
        const boosts = item.boosts.length > 0 ? item.boosts.join(", ") : "None";
        
        console.log(`${rank} | ${name} | ${rawScore} | ${boostedScore} | ${boosts}`);
    });
    
    console.log("─".repeat(120));
    console.log(`Total products above threshold (${minSimilarity}): ${similarities.length}`);
    
    // Log statistics
    if (similarities.length > 0) {
        const scores = similarities.map(s => s.boostedSimilarity);
        const maxScore = Math.max(...scores);
        const minScore = Math.min(...scores);
        const avgScore = scores.reduce((a, b) => a + b, 0) / scores.length;
        
        console.log(`\nSimilarity Statistics:`);
        console.log(`- Highest Score: ${maxScore.toFixed(4)}`);
        console.log(`- Lowest Score: ${minScore.toFixed(4)}`);
        console.log(`- Average Score: ${avgScore.toFixed(4)}`);
    }
}

/**
 * Enhanced search function with detailed cosine similarity logging
 */
async function searchProducts(query, limit = 20, minSimilarity = 0.01) {
    try {
        console.log(`\n=== SEARCH QUERY: "${query}" ===`);
        console.log(`Min Similarity Threshold: ${minSimilarity}`);
        console.log(`Result Limit: ${limit}`);
        
        // Get product data (cached or fresh)
        const { products, trendingIds, featuredIds } = await getProductData();
        
        if (products.length === 0) {
            console.log("No products found in database");
            return [];
        }
        
        console.log(`Processing ${products.length} products for similarity calculation`);
        
        // Prepare documents for similarity calculation
        const documents = prepareProductDocuments(products, trendingIds, featuredIds);
        
        // Add query as a document
        const queryDoc = {
            id: 'query',
            searchText: query
        };
        
        const allDocuments = [...documents, queryDoc];
        
        console.log("\nCreating TF-IDF vectors...");
        // Create TF-IDF vectors
        const { vectors, vocabulary } = createTFIDFVectors(allDocuments);
        console.log(`Vocabulary size: ${vocabulary.length} unique terms`);
        
        // Find query vector
        const queryVector = vectors.find(v => v.id === 'query').vector;
        const productVectors = vectors.filter(v => v.id !== 'query');
        
        console.log("\n=== COSINE SIMILARITY CALCULATIONS ===");
        
        // Calculate similarities with additional scoring factors
        const similarities = productVectors.map(doc => {
            const rawSimilarity = cosineSimilarity(queryVector, doc.vector, vocabulary);
            const { boostedSimilarity, boosts } = applyBoostFactors(doc, rawSimilarity);
            
            return {
                product: doc.product,
                rawSimilarity: rawSimilarity,
                boostedSimilarity: boostedSimilarity,
                boosts: boosts,
                isTrending: doc.isTrending,
                isFeatured: doc.isFeatured
            };
        });
        
        // Sort by boosted similarity (descending)
        const sortedSimilarities = similarities
            .sort((a, b) => b.boostedSimilarity - a.boostedSimilarity)
            .filter(item => item.boostedSimilarity >= minSimilarity);
        
        // Log detailed similarity results
        logSimilarityResults(sortedSimilarities, query, minSimilarity);
        
        // Return final results
        const finalResults = sortedSimilarities
            .slice(0, limit)
            .map(item => ({
                ...item.product,
                searchScore: Math.round(item.boostedSimilarity * 10000) / 10000, // 4 decimal places
                rawSimilarity: Math.round(item.rawSimilarity * 10000) / 10000,
                badges: {
                    trending: item.isTrending,
                    featured: item.isFeatured,
                    highRated: item.product.rating >= 4.0,
                    popular: item.product.quantitySold > 10
                }
            }));
        
        console.log(`\nReturning ${finalResults.length} results\n`);
        return finalResults;
            
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
}

/**
 * Simple keyword matching fallback for when cosine similarity returns few results
 */
async function keywordSearch(query, limit = 10) {
    try {
        console.log(`\n=== FALLBACK KEYWORD SEARCH: "${query}" ===`);
        const searchTerm = query.toLowerCase();
        
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        description: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        categories: {
                            some: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    },
                    {
                        subCategories: {
                            some: {
                                name: {
                                    contains: searchTerm,
                                    mode: 'insensitive'
                                }
                            }
                        }
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

        console.log(`Keyword search found ${products.length} products`);
        products.forEach((product, index) => {
            console.log(`${index + 1}. ${product.name} (Keyword Match - Score: 0.5000)`);
        });

        return products.map(product => ({
            ...product,
            searchScore: 0.5, // Lower score for keyword matches
            rawSimilarity: 0.5,
            badges: {
                trending: !!product.trendingProduct,
                featured: !!product.featuredProduct,
                highRated: product.rating >= 4.0,
                popular: product.quantitySold > 10
            }
        }));
    } catch (error) {
        console.error('Keyword search error:', error);
        return [];
    }
}

/**
 * Clear the vector cache
 */
function clearCache() {
    vectorCache.clear();
    console.log("Search cache cleared");
}

/**
 * Get cache information
 */
function getCacheInfo() {
    return {
        size: vectorCache.size,
        keys: Array.from(vectorCache.keys())
    };
}

module.exports = {
    searchProducts,
    keywordSearch,
    clearCache,
    getCacheInfo,
    prisma
};