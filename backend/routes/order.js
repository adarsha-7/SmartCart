const express = require("express");
const { PrismaClient } = require("../generated/prisma");
const authenticate = require("../middleware/authenticate");
const sendMail = require("../utils/sendmail");

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", authenticate, async (req, res) => {
    const user = req.access_token_decoded;
    const items = req.body.items;

    try {
        if (!user || !items || !Array.isArray(items)) {
            return res.status(400).json({ msg: "Invalid request" });
        }

        const orderData = items.map((item) => ({
            userId: user.id,
            productId: item.productId,
            quantity: item.quantity,
        }));

        const createdOrders = await prisma.order.createMany({
            data: orderData,
        });

        await prisma.cartItem.deleteMany({
            where: {
                id: { in: items.map((item) => item.id) },
            },
        });

        res.status(201).json({
            success: true,
            msg: "Your order confirmation has been received. Please check your email for more information.",
            count: createdOrders.count,
        });

        const buyer = await prisma.user.findUnique({
            where: { id: user.id },
        });

        const buyerMailMessage = `
Hello ${user.first_name || ""} ${user.last_name || ""},

Your order has been successfully placed for:

${items
    .map(
        (item, i) =>
            `${i + 1}. ${item.product.name} - Qty: ${item.quantity} - Rs.${
                item.product.price
            }`
    )
    .join("\n")}

Please keep checking your email for updates.

Thank you for shopping with StudyHub!
        `;

        sendMail(user.email, "Order Placed Successfully ✅", buyerMailMessage);

        for (const item of items) {
            const seller = await prisma.user.findUnique({
                where: { id: item.product.userID },
            });

            if (seller && seller.email) {
                const sellerMailMessage = `
Hello ${seller.first_name || ""} ${seller.last_name || ""},

An order has been placed for your product:

• Product: ${item.product.name}
• Quantity: ${item.quantity}
• Buyer: ${buyer.first_name} ${buyer.last_name}
• Buyer Email: ${buyer.email}
• Buyer Phone: ${buyer.phone_number}
• Buyer Address: ${buyer.address}

Please process this order and prepare it for delivery.
                `;

                sendMail(
                    seller.email,
                    "New Order Received 📦",
                    sellerMailMessage
                );
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, msg: "Internal server error" });
    }
});

router.patch("/confirmation", authenticate, async (req, res) => {
    const user = req.access_token_decoded;
    const { orderId, rating } = req.body;

    try {
        const order = await prisma.order.findUnique({
            where: { id: orderId },
        });

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        if (order.userId !== user.id) {
            return res.status(403).json({ msg: "Unauthorized access" });
        }

        await prisma.order.update({
            where: { id: orderId },
            data: { received: true },
        });

        const product = await prisma.product.findUnique({
            where: { id: order.productId },
        });

        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        const updatedRatings = [...product.ratings, parseInt(rating)];
        const newNumberOfRating = product.numberOfRating + 1;
        const newQuantitySold = product.quantitySold + order.quantity;
        const totalRatings = product.numberOfRating;
        const newAverageRating =
            Math.round(
                ((product.rating * totalRatings + rating) /
                    (totalRatings + 1)) *
                    10
            ) / 10;

        await prisma.product.update({
            where: { id: product.id },
            data: {
                ratings: updatedRatings,
                numberOfRating: newNumberOfRating,
                quantitySold: newQuantitySold,
                rating: newAverageRating,
            },
        });

        return res.status(200).json({
            msg: "Your order confirmation has been received. Thank you for shopping with us.",
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Something went wrong." });
    }
});

module.exports = router;
