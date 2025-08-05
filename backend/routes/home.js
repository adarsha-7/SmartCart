const express = require("express");
const { PrismaClient } = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/content", async (req, res) => {
    try {
        const [categories, trendingProducts, featuredProducts] =
            await Promise.all([
                prisma.category.findMany().catch(() => []),
                prisma.trendingProduct
                    .findMany({ include: { product: true } })
                    .catch(() => []),
                prisma.featuredProduct
                    .findMany({ include: { product: true } })
                    .catch(() => []),
            ]);

        const otherProducts = await prisma.$queryRaw`
            SELECT * FROM "Product"
            ORDER BY RANDOM()
            LIMIT 40
        `.catch(() => []);

        // 200 OK - Data fetched successfully
        res.status(200).json({
            categories,
            trendingProducts,
            featuredProducts,
            otherProducts,
        });
    } catch (error) {
        console.error(error);
        // 500 Internal Server Error - Unexpected error
        res.status(500).json({
            categories: [],
            trendingProducts: [],
            featuredProducts: [],
            otherProducts: [],
        });
    }
});

module.exports = router;
