const express = require("express");

const { PrismaClient } = require("../generated/prisma");

const authenticate = require("../middleware/authenticate");

const router = express.Router();
const prisma = new PrismaClient();

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

module.exports = router;
