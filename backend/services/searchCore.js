// searchCore.js
const { PrismaClient } = require("../generated/prisma");
const { preprocessText, createTFIDFVectors, cosineSimilarity, applyBoostFactors, logSimilarityResults } = require('./searchUtils');

const prisma = new PrismaClient();
const vectorCache = new Map();
const CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

/**
 * Fetch and cache product data with related information
 */
async function getProductData() {
    const cacheKey = `products_${Date.now() - (Date.now() % CACHE_DURATION)}`;
    
    if (vectorCache.has(cacheKey)) {
        console.log("Using cached product data");
        return vectorCache.get(cacheKey);
    }
    
    console.log("Fetching fresh product data from database");
    
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
 * Enhanced search function with detailed cosine similarity logging
 */
async function searchProducts(query, limit = 20, minSimilarity = 0.01) {
    try {
        console.log(`\n=== SEARCH QUERY: "${query}" ===`);
        console.log(`Min Similarity Threshold: ${minSimilarity}`);
        console.log(`Result Limit: ${limit}`);
        
        const { products, trendingIds, featuredIds } = await getProductData();
        
        if (products.length === 0) {
            console.log("No products found in database");
            return [];
        }
        
        console.log(`Processing ${products.length} products for similarity calculation`);
        
        const documents = prepareProductDocuments(products, trendingIds, featuredIds);
        const queryDoc = { id: 'query', searchText: query };
        const allDocuments = [...documents, queryDoc];
        
        console.log("\nCreating TF-IDF vectors...");
        const { vectors, vocabulary } = createTFIDFVectors(allDocuments);
        console.log(`Vocabulary size: ${vocabulary.length} unique terms`);
        
        const queryVector = vectors.find(v => v.id === 'query').vector;
        const productVectors = vectors.filter(v => v.id !== 'query');
        
        console.log("\n=== COSINE SIMILARITY CALCULATIONS ===");
        
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
        
        const sortedSimilarities = similarities
            .sort((a, b) => b.boostedSimilarity - a.boostedSimilarity)
            .filter(item => item.boostedSimilarity >= minSimilarity);
        
        logSimilarityResults(sortedSimilarities, query, minSimilarity);
        
        const finalResults = sortedSimilarities
            .slice(0, limit)
            .map(item => ({
                ...item.product,
                searchScore: Math.round(item.boostedSimilarity * 10000) / 10000,
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
 * Simple keyword matching fallback
 */
async function keywordSearch(query, limit = 10) {
    try {
        console.log(`\n=== FALLBACK KEYWORD SEARCH: "${query}" ===`);
        const searchTerm = query.toLowerCase();
        
        const products = await prisma.product.findMany({
            where: {
                OR: [
                    { name: { contains: searchTerm, mode: 'insensitive' } },
                    { description: { contains: searchTerm, mode: 'insensitive' } },
                    { categories: { some: { name: { contains: searchTerm, mode: 'insensitive' } } } },
                    { subCategories: { some: { name: { contains: searchTerm, mode: 'insensitive' } } } }
                ]
            },
            include: {
                categories: true,
                subCategories: true,
                user: { select: { first_name: true, last_name: true, image: true } },
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

        return products.map(product => ({
            ...product,
            searchScore: 0.5,
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
 * Clear cache
 */
function clearCache() {
    vectorCache.clear();
    console.log("Search cache cleared");
}

/**
 * Get cache info
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