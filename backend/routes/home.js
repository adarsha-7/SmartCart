const express = require("express");

const { PrismaClient } = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/content", async (req, res) => {
    try {
        const [categories, trendingProducts, featuredProducts] =
            await Promise.all([
                prisma.category.findMany(),
                prisma.trendingProduct.findMany({
                    include: { product: true },
                }),
                prisma.featuredProduct.findMany({
                    include: { product: true },
                }),
            ]);

        const data = {
            categories,
            trendingProducts,
            featuredProducts,
        };

        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
