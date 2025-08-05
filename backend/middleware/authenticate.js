const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticate(req, res, next) {
    const cookies = req.cookies;

    if (cookies.access_token) {
        try {
            const access_token_decoded = jwt.verify(
                cookies.access_token,
                process.env.JWT_ACCESS_TOKEN_SECRET
            );
            req.access_token_decoded = access_token_decoded;
            next();
        } catch (err) {
            console.error(err);
            // 401 Unauthorized for invalid access token
            res.status(401).json({
                success: false,
                msg: "Invalid access token",
                error: err.name,
            });
        }
    } else if (!cookies.access_token && cookies.refresh_token) {
        try {
            const refresh_token_decoded = jwt.verify(
                cookies.refresh_token,
                process.env.JWT_REFRESH_TOKEN_SECRET
            );

            const { id, email, first_name, last_name, provider } =
                refresh_token_decoded;

            const accessToken = jwt.sign(
                {
                    id,
                    email,
                    first_name,
                    last_name,
                    provider,
                },
                process.env.JWT_ACCESS_TOKEN_SECRET,
                { expiresIn: "5m" }
            );

            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                maxAge: 5 * 60 * 1000,
            });

            req.access_token_decoded = refresh_token_decoded;
            next();
        } catch (err) {
            console.error(err);
            // 403 Forbidden for invalid refresh token
            res.status(403).json({
                success: false,
                msg: "Invalid refresh token",
                error: err.name,
            });
        }
    } else {
        // 401 Unauthorized when no token is provided
        res.status(401).json({
            success: false,
            msg: "User is not authenticated",
        });
    }
}

module.exports = authenticate;
