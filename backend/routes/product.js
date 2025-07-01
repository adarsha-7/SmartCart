const express = require("express");

const { PrismaClient } = require("../generated/prisma");

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

module.exports = router;
