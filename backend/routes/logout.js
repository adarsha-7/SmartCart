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
        sameSite: "strict",
        expires: new Date(0),
    });

    res.json({ success: true });
});

module.exports = router;
