const express = require("express");

const { PrismaClient } = require("../generated/prisma");

const authenticate = require("../middleware/authenticate");

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", (req, res) => {
    res.json({ msg: `Search results for ${req.query.query}` });
});

module.exports = router;
