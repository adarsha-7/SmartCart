const jwt = require("jsonwebtoken");
require("dotenv").config();

function createCookies(user, res) {
    const accessToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            first_name: user.first_name || null,
            last_name: user.last_name || null,
            provider: user.provider,
        },
        process.env.JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: "5m" }
    );
    const refreshToken = jwt.sign(
        {
            id: user.id,
            email: user.email,
            first_name: user.first_name || null,
            last_name: user.last_name || null,
            provider: user.provider,
        },
        process.env.JWT_REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
    );

    res.cookie("access_token", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 5 * 60 * 1000,
    });

    res.cookie("refresh_token", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
}

module.exports = createCookies;
