const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
    res.cookie("access_token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        expires: new Date(0),
    });
    res.cookie("refresh_token", "", {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        expires: new Date(0),
    });

    // 200 OK – cookies cleared successfully
    res.status(200).json({ success: true });
});

module.exports = router;
