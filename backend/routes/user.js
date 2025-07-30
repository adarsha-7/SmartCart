const express = require("express");
const multer = require("multer");

const { PrismaClient } = require("../generated/prisma");

const authenticate = require("../middleware/authenticate");
const uploadToCloudinary = require("../utils/uploadtocloud");

const router = express.Router();
const prisma = new PrismaClient();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.patch("/profile", authenticate, async (req, res) => {
    try {
        const id = req.access_token_decoded.id;

        const updateData = {};

        if (req.body.first_name !== undefined && req.body.first_name !== "") {
            updateData.first_name = req.body.first_name;
        }
        if (req.body.last_name !== undefined && req.body.last_name !== "") {
            updateData.last_name = req.body.last_name;
        }
        if (req.body.email !== undefined && req.body.email !== "") {
            updateData.email = req.body.email;
        }
        if (
            req.body.phone_number !== undefined &&
            req.body.phone_number !== ""
        ) {
            updateData.phone_number = req.body.phone_number;
        }
        if (req.body.address !== undefined && req.body.address !== "") {
            updateData.address = req.body.address;
        }

        const updatedUser = await prisma.user.update({
            where: { id: id },
            data: updateData,
        });

        res.json({ msg: "success", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Update failed" });
    }
});

router.patch(
    "/profile/image",
    authenticate,
    upload.single("image"),
    async (req, res) => {
        try {
            const id = req.access_token_decoded.id;

            if (!req.file) {
                return res.status(400).json({ error: "No image uploaded" });
            }

            const filename = `profile_${Date.now()}`;
            const uploaded = await uploadToCloudinary(
                req.file.buffer,
                filename,
                "profile"
            );

            const updatedUser = await prisma.user.update({
                where: { id },
                data: { image: uploaded },
            });

            res.json({
                msg: "Profile image updated successfully",
                image: uploaded,
                user: updatedUser,
            });
        } catch (error) {
            console.error("Image upload error:", error);
            res.status(500).json({ error: "Image upload failed" });
        }
    }
);

router.get("/dashboard", authenticate, async (req, res) => {
    try {
        const userId = req.access_token_decoded.id;

        const listings = await prisma.product.findMany({
            where: {
                userID: userId,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                name: true,
                price: true,
                rating: true,
                imageURL: true,
                quantitySold: true,
                createdAt: true,
            },
        });

        const orders = await prisma.order.findMany({
            where: {
                userId: userId,
                received: false,
            },
            orderBy: {
                createdAt: "desc",
            },
            select: {
                id: true,
                quantity: true,
                createdAt: true,
                product: {
                    select: {
                        id: true,
                        name: true,
                        price: true,
                        rating: true,
                        imageURL: true,
                        quantitySold: true,
                        createdAt: true,
                    },
                },
            },
        });

        res.json({
            success: true,
            listings: listings,
            orders: orders,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: error.message,
        });
    }
});

module.exports = router;
