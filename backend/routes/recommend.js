const express = require("express");
const { 
    getProductRecommendations, 
    getCategoryBasedRecommendations,
    getSimilarRecommendations,
    clearRecommendationCache,
    getRecommendationCacheInfo,
    prisma 
} = require("../services/recommendCore");

const router = express.Router();

/**
 * Get product recommendations endpoint
 * Returns similar products based on cosine similarity
 */
router.get("/products/:productId", async (req, res) => {
    try {
        const { productId } = req.params;
        const limit = parseInt(req.query.limit) || 10;
        const minSimilarity = parseFloat(req.query.minSimilarity) || 0.05;
        const useFallback = req.query.useFallback !== 'false'; // Default to true
        
        if (!productId || isNaN(parseInt(productId))) {
            return res.status(400).json({ 
                error: "Valid product ID is required",
                recommendations: []
            });
        }
        
        const startTime = Date.now();
        let recommendations = [];
        let method = 'cosine_similarity';
        
        try {
            // Try cosine similarity recommendations first
            recommendations = await getProductRecommendations(
                productId, 
                limit, 
                minSimilarity
            );
            
            // If too few results and fallback is enabled, supplement with category-based
            if (recommendations.length < 3 && useFallback) {
                console.log("\nToo few similarity results, adding category-based recommendations...");
                const categoryRecommendations = await getCategoryBasedRecommendations(
                    productId, 
                    limit - recommendations.length
                );
                
                // Merge results, avoiding duplicates
                const existingIds = new Set(recommendations.map(p => p.id));
                const newResults = categoryRecommendations.filter(p => !existingIds.has(p.id));
                
                recommendations = [...recommendations, ...newResults].slice(0, limit);
                method = 'hybrid';
                console.log(`Combined recommendations: ${recommendations.length} total products`);
            }
        } catch (error) {
            console.error('Cosine similarity recommendations failed:', error);
            
            if (useFallback) {
                console.log('Falling back to category-based recommendations...');
                recommendations = await getCategoryBasedRecommendations(productId, limit);
                method = 'category_fallback';
            } else {
                throw error;
            }
        }
        
        const processingTime = Date.now() - startTime;
        
        const response = {
            productId: parseInt(productId),
            method: method,
            total: recommendations.length,
            processingTime: processingTime,
            recommendations: recommendations,
            parameters: {
                limit: limit,
                minSimilarity: minSimilarity,
                useFallback: useFallback
            },
            // Include similarity scores for debugging
            similarityDetails: recommendations.map(p => ({
                id: p.id,
                name: p.name,
                similarityScore: p.similarityScore,
                rawSimilarity: p.rawSimilarity,
                badges: p.recommendationBadges
            }))
        };
        
        console.log(`\n=== RECOMMENDATION RESPONSE ===`);
        console.log(`Product ID: ${productId}`);
        console.log(`Method: ${method}`);
        console.log(`Results: ${recommendations.length}`);
        console.log(`Processing Time: ${processingTime}ms`);
        
        res.json(response);
        
    } catch (error) {
        console.error('Recommendation route error:', error);
        res.status(500).json({ 
            error: "Recommendations temporarily unavailable",
            recommendations: [],
            productId: req.params.productId,
            total: 0,
            processingTime: 0
        });
    }
});

// New route for "You might also like"
router.get('/similar/:productId', async (req, res) => {
    try {
        const { productId } = req.params;
        const limit = parseInt(req.query.limit) || 8;
        const startTime = Date.now();
        
        const recommendations = await getSimilarRecommendations(productId, limit);
        const processingTime = Date.now() - startTime;
        
        res.json({
            success: true,
            recommendations: recommendations,
            total: recommendations.length,
            method: 'diverse_mix',
            processingTime: processingTime
        });
        
    } catch (error) {
        console.error('You Might Also Like API error:', error);
        res.status(500).json({
            success: false,
            error: 'Failed to get you might also like recommendations',
            recommendations: [],
            total: 0,
            method: 'error',
            processingTime: 0
        });
    }
});

/**
 * Get recommendations with custom parameters for testing
 */
router.get("/products/:productId/advanced", async (req, res) => {
    try {
        const { productId } = req.params;
        const {
            limit = 10,
            minSimilarity = 0.05,
            useFallback = true,
            fallbackThreshold = 3
        } = req.query;
        
        if (!productId || isNaN(parseInt(productId))) {
            return res.status(400).json({ 
                error: "Valid product ID is required"
            });
        }
        
        const startTime = Date.now();
        let recommendations = [];
        let method = 'cosine_similarity';
        
        try {
            recommendations = await getProductRecommendations(
                productId, 
                parseInt(limit), 
                parseFloat(minSimilarity)
            );
            
            if (useFallback === 'true' && recommendations.length < parseInt(fallbackThreshold)) {
                const categoryRecommendations = await getCategoryBasedRecommendations(
                    productId, 
                    parseInt(limit) - recommendations.length
                );
                
                const existingIds = new Set(recommendations.map(p => p.id));
                const newResults = categoryRecommendations.filter(p => !existingIds.has(p.id));
                recommendations = [...recommendations, ...newResults].slice(0, parseInt(limit));
                
                method = 'hybrid';
            }
        } catch (error) {
            if (useFallback === 'true') {
                recommendations = await getCategoryBasedRecommendations(productId, parseInt(limit));
                method = 'category_fallback';
            } else {
                throw error;
            }
        }
        
        const processingTime = Date.now() - startTime;
        
        res.json({
            productId: parseInt(productId),
            method: method,
            parameters: {
                limit: parseInt(limit),
                minSimilarity: parseFloat(minSimilarity),
                useFallback: useFallback === 'true',
                fallbackThreshold: parseInt(fallbackThreshold)
            },
            results: {
                total: recommendations.length,
                processingTime: processingTime,
                recommendations: recommendations
            },
            debugging: {
                similarityScores: recommendations.map(p => ({
                    id: p.id,
                    name: p.name,
                    similarityScore: p.similarityScore,
                    rawSimilarity: p.rawSimilarity,
                    badges: p.recommendationBadges
                }))
            }
        });
        
    } catch (error) {
        console.error('Advanced recommendation route error:', error);
        res.status(500).json({ 
            error: "Advanced recommendations failed",
            recommendations: []
        });
    }
});

/**
 * Get multiple product recommendations at once
 */
router.post("/batch", async (req, res) => {
    try {
        const { productIds, limit = 5 } = req.body;
        
        if (!Array.isArray(productIds) || productIds.length === 0) {
            return res.status(400).json({ 
                error: "Array of product IDs is required"
            });
        }
        
        const startTime = Date.now();
        const batchResults = {};
        
        // Process recommendations for each product
        await Promise.all(productIds.map(async (productId) => {
            try {
                const recommendations = await getProductRecommendations(productId, limit, 0.05);
                batchResults[productId] = {
                    success: true,
                    total: recommendations.length,
                    recommendations: recommendations
                };
            } catch (error) {
                console.error(`Batch recommendation error for product ${productId}:`, error);
                batchResults[productId] = {
                    success: false,
                    error: error.message,
                    recommendations: []
                };
            }
        }));
        
        const processingTime = Date.now() - startTime;
        
        res.json({
            processingTime: processingTime,
            results: batchResults,
            summary: {
                requested: productIds.length,
                successful: Object.values(batchResults).filter(r => r.success).length,
                failed: Object.values(batchResults).filter(r => !r.success).length
            }
        });
        
    } catch (error) {
        console.error('Batch recommendation route error:', error);
        res.status(500).json({ 
            error: "Batch recommendations failed"
        });
    }
});

/**
 * Recommendation analytics endpoint
 */
router.get("/analytics", async (req, res) => {
    try {
        const cacheInfo = getRecommendationCacheInfo();
        
        // Get database statistics
        const [totalProducts, totalCategories, totalSubCategories] = await Promise.all([
            prisma.product.count(),
            prisma.category.count(),
            prisma.subCategory.count()
        ]);
        
        res.json({
            database: {
                totalProducts,
                totalCategories,
                totalSubCategories
            },
            cache: {
                size: cacheInfo.size,
                keys: cacheInfo.keys,
                status: cacheInfo.size > 0 ? 'active' : 'empty'
            },
            algorithm: {
                primary: 'TF-IDF Cosine Similarity',
                fallback: 'Category-based Filtering',
                boostFactors: [
                    'Same Category (+30%)',
                    'Same Subcategory (+20%)',
                    'Similar Price (+10%)',
                    'Trending Products (+5%)',
                    'Featured Products (+5%)',
                    'High Rated Products (+5%)'
                ]
            },
            endpoints: {
                productRecommendations: '/recommendations/products/:productId',
                advancedRecommendations: '/recommendations/products/:productId/advanced',
                batchRecommendations: '/recommendations/batch',
                analytics: '/recommendations/analytics',
                health: '/recommendations/health'
            }
        });
        
    } catch (error) {
        console.error('Recommendation analytics error:', error);
        res.status(500).json({ error: "Analytics unavailable" });
    }
});

/**
 * Clear recommendation cache endpoint
 */
router.post("/clear-cache", (req, res) => {
    try {
        clearRecommendationCache();
        res.json({ 
            success: true, 
            message: "Recommendation cache cleared successfully",
            timestamp: new Date().toISOString()
        });
    } catch (error) {
        console.error('Clear recommendation cache error:', error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to clear cache" 
        });
    }
});

/**
 * Health check endpoint
 */
router.get("/health", async (req, res) => {
    try {
        const cacheInfo = getRecommendationCacheInfo();
        
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
            service: "recommendation-engine"
        });
    } catch (error) {
        console.error('Recommendation health check error:', error);
        res.status(500).json({ 
            status: "unhealthy",
            error: error.message,
            timestamp: new Date().toISOString()
        });
    }
});

module.exports = router;