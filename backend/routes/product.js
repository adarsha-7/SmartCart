const express = require("express");
const multer = require("multer");

const { PrismaClient } = require("../generated/prisma");

const authenticate = require("../middleware/authenticate");
const uploadToCloudinary = require("../utils/uploadtocloud");

const router = express.Router();
const prisma = new PrismaClient();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
    const productID = parseInt(req.query.id);
    const userID = req.query.userID;

    if (!productID) {
        return res.status(400).json({ error: "Product ID is required" });
    }

    try {
        const product = await prisma.product.findUnique({
            where: { id: productID },
            include: {
                featuredProduct: true,
                trendingProduct: true,
                user: true,
                categories: true,
                subCategories: true,
                CartItems: userID
                    ? {
                          where: {
                              userId: userID,
                          },
                      }
                    : true,
            },
        });

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
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

router.get("/cart-items", async (req, res) => {
    const userID = req.query.userID;
    const cartItems = await prisma.cartItem.findMany({
        where: { userId: userID },
        include: {
            product: true,
        },
    });
    res.json({ cartItems });
});

router.patch("/cart-item/increase", async (req, res) => {
    const userID = req.query.userID;
    const itemID = parseInt(req.query.itemID);

    try {
        const updatedItem = await prisma.cartItem.update({
            where: { userId: userID, id: itemID },
            data: {
                quantity: {
                    increment: 1,
                },
            },
        });
        res.json({ success: true, cartItem: updatedItem });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error });
    }
});

router.patch("/cart-item/decrease", async (req, res) => {
    const userID = req.query.userID;
    const itemID = parseInt(req.query.itemID);

    try {
        const updatedItem = await prisma.cartItem.update({
            where: { userId: userID, id: itemID },
            data: {
                quantity: {
                    decrement: 1,
                },
            },
        });
        res.json({ success: true, cartItem: updatedItem });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error });
    }
});

router.delete("/cart-item/delete", async (req, res) => {
    const userID = req.query.userID;
    const itemID = parseInt(req.query.itemID);

    try {
        await prisma.cartItem.delete({
            where: { userId: userID, id: itemID },
        });
        res.json({ success: true });
    } catch (error) {
        console.error(error);
        res.json({ success: false, error });
    }
});

router.post(
    "/add-product",
    authenticate,
    upload.array("images"),
    async (req, res) => {
        try {
            const {
                title,
                category,
                subCategory,
                price,
                condition,
                description,
            } = req.body;
            const files = req.files;

            // Upload images to Cloudinary
            const imageUploadPromises = files.map((file, index) => {
                const filename = `${Date.now()}_${index}`;
                return uploadToCloudinary(file.buffer, filename);
            });

            const imageUrls = await Promise.all(imageUploadPromises);

            const newProduct = await prisma.product.create({
                data: {
                    userID: req.access_token_decoded.id,
                    name: title,
                    price: parseFloat(price),
                    rating: 0,
                    imageURL: imageUrls[0],
                    description: description || null,
                    categories: {
                        connect: [{ id: parseInt(category) }],
                    },
                    subCategories: {
                        connect: [{ id: parseInt(subCategory) }],
                    },
                },
            });

            console.log(newProduct);

            return res.status(200).json({
                success: true,
                msg: "Product uploaded",
            });
        } catch (err) {
            console.error("Error", err);
            return res
                .status(500)
                .json({ success: false, error: "Upload failed" });
        }
    }
);

module.exports = router;
