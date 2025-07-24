// searchUtils.js

// English stop words for text preprocessing
const STOP_WORDS = new Set([
    'the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
    'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
    'do', 'does', 'did', 'will', 'would', 'could', 'should', 'may', 'might',
    'must', 'can', 'shall', 'this', 'that', 'these', 'those', 'a', 'an'
]);

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
        .filter(word => !STOP_WORDS.has(word)); // Remove stop words
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

module.exports = {
    preprocessText,
    createTFIDFVectors,
    cosineSimilarity,
    applyBoostFactors,
    logSimilarityResults,
    STOP_WORDS
};