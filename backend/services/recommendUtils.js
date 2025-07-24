// recommendUtils.js

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

// English stop words for text preprocessing (shared with search engine)
const STOP_WORDS = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'must', 'can', 'shall', 'this', 'that', 'these', 'those', 'a', 'an'
]);

/**
 * Text preprocessing pipeline for recommendation documents
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
 * Prepare products for recommendation calculation with enhanced weighting
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
 * TF-IDF vectorization optimized for product recommendations
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
 * Calculate multi-factor recommendation boost scores
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

module.exports = {
    CONFIG,
    preprocessText,
    prepareRecommendationDocuments,
    createProductVectors,
    cosineSimilarity,
    calculateRecommendationBoost,
    STOP_WORDS
};