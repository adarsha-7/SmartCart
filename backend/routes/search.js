const express = require("express");
const authenticate = require("../middleware/authenticate");
const { 
    searchProducts, 
    keywordSearch, 
    clearCache, 
    getCacheInfo, 
    prisma 
} = require("../services/searchCore");

const router = express.Router();

/**
 * Search suggestions endpoint
 * Returns product names, categories, and subcategories that match the query
 */
router.get("/suggestions", async (req, res) => {
    try {
        const query = req.query.q || req.query.query;
        
        if (!query || query.trim().length < 2) {
            return res.json({ suggestions: [] });
        }
        
        const searchTerm = query.trim().toLowerCase();
        
        // Get product names, categories, and subcategories for suggestions
        const [products, categories, subCategories] = await Promise.all([
            prisma.product.findMany({
                where: {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                select: {
                    name: true,
                    quantitySold: true
                },
                take: 5,
                orderBy: {
                    quantitySold: 'desc'
                }
            }),
            prisma.category.findMany({
                where: {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                select: { name: true },
                take: 3
            }),
            prisma.subCategory.findMany({
                where: {
                    name: {
                        contains: searchTerm,
                        mode: 'insensitive'
                    }
                },
                select: { name: true },
                take: 3
            })
        ]);
        
        const suggestions = [
            ...products.map(p => ({ text: p.name, type: 'product' })),
            ...categories.map(c => ({ text: c.name, type: 'category' })),
            ...subCategories.map(sc => ({ text: sc.name, type: 'subcategory' }))
        ].slice(0, 8);
        
        res.json({ suggestions });
        
    } catch (error) {
        console.error('Suggestions error:', error);
        res.status(500).json({ suggestions: [] });
    }
});

/**
 * Popular searches endpoint
 * Returns trending categories and popular products as suggested searches
 */
router.get("/popular", async (req, res) => {
    try {
        // Get popular categories and trending products as popular searches
        const [categories, trendingProducts] = await Promise.all([
            prisma.category.findMany({
                select: { name: true },
                take: 6,
                orderBy: { id: 'asc' }
            }),
            prisma.trendingProduct.findMany({
                include: {
                    product: {
                        select: { name: true }
                    }
                },
                take: 4
            })
        ]);
        
        const popularSearches = [
            ...categories.map(c => c.name),
            ...trendingProducts.map(tp => tp.product.name)
        ].slice(0, 8);
        
        res.json({ popularSearches });
        
    } catch (error) {
        console.error('Popular searches error:', error);
        res.status(500).json({ popularSearches: [] });
    }
});

/**
 * Main search route
 * Performs intelligent product search using cosine similarity with keyword fallback
 */
router.get("/", async (req, res) => {
    try {
        const query = req.query.query || req.query.q;
        
        if (!query || query.trim().length === 0) {
            return res.json({ 
                msg: "No search query provided",
                products: [],
                query: "",
                searchTime: 0,
                total: 0
            });
        }
        
        const startTime = Date.now();
        const limit = parseInt(req.query.limit) || 20;
        const minSimilarity = parseFloat(req.query.minSimilarity) || 0.01;
        
        let products = [];
        
        try {
            // Try cosine similarity search first
            products = await searchProducts(query.trim(), limit, minSimilarity);
            
            // If cosine similarity returns few results, supplement with keyword search
            if (products.length < 5) {
                console.log("\nToo few cosine similarity results, supplementing with keyword search...");
                const keywordResults = await keywordSearch(query.trim(), limit - products.length);
                
                // Merge results, avoiding duplicates
                const existingIds = new Set(products.map(p => p.id));
                const newResults = keywordResults.filter(p => !existingIds.has(p.id));
                
                products = [...products, ...newResults].slice(0, limit);
                console.log(`Combined results: ${products.length} total products`);
            }
        } catch (error) {
            console.error('Cosine similarity search failed, falling back to keyword search:', error);
            // Fallback to keyword search if cosine similarity fails
            products = await keywordSearch(query.trim(), limit);
        }
        
        const searchTime = Date.now() - startTime;
        
        // Enhanced response with similarity details
        const response = { 
            msg: `Found ${products.length} results for "${query}" (${searchTime}ms)`,
            products: products,
            query: query.trim(),
            searchTime: searchTime,
            total: products.length,
            // Include similarity scores in response for debugging
            similarityScores: products.map(p => ({
                id: p.id,
                name: p.name,
                searchScore: p.searchScore,
                rawSimilarity: p.rawSimilarity || p.searchScore
            }))
        };
        
        console.log(`\n=== FINAL RESPONSE ===`);
        console.log(`Query: "${query}"`);
        console.log(`Results: ${products.length}`);
        console.log(`Search Time: ${searchTime}ms`);
        
        res.json(response);
        
    } catch (error) {
        console.error('Search route error:', error);
        res.status(500).json({ 
            error: "Search temporarily unavailable",
            products: [],
            query: req.query.query || req.query.q || "",
            searchTime: 0,
            total: 0
        });
    }
});

/**
 * Advanced search route with custom parameters
 * Allows fine-tuning of search parameters for testing and optimization
 */
router.get("/advanced", async (req, res) => {
    try {
        const {
            query,
            limit = 20,
            minSimilarity = 0.01,
            useKeywordFallback = true,
            keywordFallbackThreshold = 5
        } = req.query;
        
        if (!query || query.trim().length === 0) {
            return res.json({ 
                error: "Query parameter is required",
                products: []
            });
        }
        
        const startTime = Date.now();
        let products = [];
        let searchMethod = 'cosine_similarity';
        
        try {
            // Primary search using cosine similarity
            products = await searchProducts(
                query.trim(), 
                parseInt(limit), 
                parseFloat(minSimilarity)
            );
            
            // Optional keyword fallback
            if (useKeywordFallback === 'true' && products.length < parseInt(keywordFallbackThreshold)) {
                console.log("\nApplying keyword fallback...");
                const keywordResults = await keywordSearch(
                    query.trim(), 
                    parseInt(limit) - products.length
                );
                
                const existingIds = new Set(products.map(p => p.id));
                const newResults = keywordResults.filter(p => !existingIds.has(p.id));
                products = [...products, ...newResults].slice(0, parseInt(limit));
                
                searchMethod = 'hybrid';
            }
        } catch (error) {
            console.error('Advanced search error, using keyword fallback:', error);
            products = await keywordSearch(query.trim(), parseInt(limit));
            searchMethod = 'keyword_fallback';
        }
        
        const searchTime = Date.now() - startTime;
        
        res.json({
            query: query.trim(),
            searchMethod: searchMethod,
            parameters: {
                limit: parseInt(limit),
                minSimilarity: parseFloat(minSimilarity),
                useKeywordFallback: useKeywordFallback === 'true',
                keywordFallbackThreshold: parseInt(keywordFallbackThreshold)
            },
            results: {
                total: products.length,
                searchTime: searchTime,
                products: products
            },
            debugging: {
                similarityScores: products.map(p => ({
                    id: p.id,
                    name: p.name,
                    searchScore: p.searchScore,
                    rawSimilarity: p.rawSimilarity || p.searchScore,
                    badges: p.badges
                }))
            }
        });
        
    } catch (error) {
        console.error('Advanced search route error:', error);
        res.status(500).json({ 
            error: "Advanced search failed",
            products: []
        });
    }
});

/**
 * Search analytics endpoint
 * Returns search performance metrics and cache statistics
 */
router.get("/analytics", async (req, res) => {
    try {
        const cacheInfo = getCacheInfo();
        
        // Get some basic database statistics
        const [totalProducts, totalCategories, totalSubCategories, trendingCount, featuredCount] = await Promise.all([
            prisma.product.count(),
            prisma.category.count(),
            prisma.subCategory.count(),
            prisma.trendingProduct.count(),
            prisma.featuredProduct.count()
        ]);
        
        res.json({
            database: {
                totalProducts,
                totalCategories,
                totalSubCategories,
                trendingProducts: trendingCount,
                featuredProducts: featuredCount
            },
            cache: {
                size: cacheInfo.size,
                keys: cacheInfo.keys,
                status: cacheInfo.size > 0 ? 'active' : 'empty'
            },
            searchAlgorithms: {
                primary: 'TF-IDF Cosine Similarity',
                fallback: 'Keyword Matching',
                boostFactors: [
                    'Trending Products (+15%)',
                    'Featured Products (+10%)',
                    'High Rated Products (+5%)',
                    'Popular Products (+3%)'
                ]
            }
        });
        
    } catch (error) {
        console.error('Analytics error:', error);
        res.status(500).json({ error: "Analytics unavailable" });
    }
});

/**
 * Clear search cache endpoint
 * Useful for testing and cache management
 */
router.post("/clear-cache", (req, res) => {
    try {
        clearCache();
        res.json({ 
            success: true, 
            message: "Search cache cleared successfully",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Clear cache error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to clear cache" 
        });
    }
});

/**
 * Health check endpoint
 * Returns system status and basic diagnostics
 */
router.get("/health", async (req, res) => {
    try {
        const cacheInfo = getCacheInfo();
        
        // Test database connection
        await prisma.$queryRaw`SELECT 1`;
        
        res.json({ 
            status: "healthy",
            timestamp: new Date().toISOString(),
            cache: {
                size: cacheInfo.size,
                keys: cacheInfo.keys
            },
            database: {
                status: "connected"
            },
            endpoints: {
                search: "/search",
                suggestions: "/search/suggestions",
                popular: "/search/popular",
                advanced: "/search/advanced",
                analytics: "/search/analytics",
                health: "/search/health"
            }
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({ 
            status: "unhealthy",
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router;