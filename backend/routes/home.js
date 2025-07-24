const express = require("express");
const { PrismaClient } = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/content", async (req, res) => {
    try {
        const [categories, trendingProducts, featuredProducts] = await Promise.all([
            prisma.category.findMany().catch(() => []),
            prisma.trendingProduct.findMany({ include: { product: true } }).catch(() => []),
            prisma.featuredProduct.findMany({ include: { product: true } }).catch(() => []),
        ]);

        const otherProducts = await prisma.product.findMany({
            take: 40,
            orderBy: { createdAt: 'desc' }
        }).catch(() => []);

        res.json({
            categories,
            trendingProducts, 
            featuredProducts,
            otherProducts
        });
    } catch (error) {
        console.error(error);
        res.json({
            categories: [],
            trendingProducts: [],
            featuredProducts: [],
            otherProducts: []
        });
    }
});

module.exports = router;