const express = require("express");

const { PrismaClient } = require("../generated/prisma");

const authenticate = require("../middleware/authenticate");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
    const productID = parseInt(req.query.id);
    prisma.product
        .findUnique({ where: { id: productID } })
        .then((product) => res.json({ product }))
        .catch((error) => {
            console.error(error);
            res.json(error);
        });
});

router.post("/add-to-cart", authenticate, async (req, res) => {
    const productID = req.body.productID;
    const userID = req.access_token_decoded.id;

    try {
        const existingItem = await prisma.cartItem.findFirst({
            where: {
                userId: userID,
                productId: parseInt(productID),
            },
        });

        let cartItem;

        if (existingItem) {
            cartItem = await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: {
                    quantity: { increment: 1 },
                },
            });
        } else {
            cartItem = await prisma.cartItem.create({
                data: {
                    userId: userID,
                    productId: parseInt(productID),
                    quantity: 1,
                },
            });
        }
        res.json({ success: true, cartItem });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error });
    }
});

module.exports = router;
