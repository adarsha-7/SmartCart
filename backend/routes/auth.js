const express = require("express");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const { PrismaClient } = require("../generated/prisma");

const createCookies = require("../utils/createcookies");
const authenticate = require("../middleware/authenticate");

const router = express.Router();
const prisma = new PrismaClient();

const FRONTEND_URL =
    process.env.ENV == "development"
        ? process.env.FRONTEND_URL_DEV
        : process.env.FRONTEND_URL;

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails[0].value;

                let user = await prisma.user.findUnique({
                    where: { email },
                });

                const fullName = profile.displayName.split(" ");
                const firstName = fullName[0];
                const lastName = fullName.slice(1).join(" ");

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            first_name: firstName,
                            last_name: lastName,
                            email: email,
                            provider: ["google"],
                            passwordHash: null,
                        },
                    });
                } else if (!user.provider.includes("google")) {
                    user = await prisma.user.update({
                        where: { email: email },
                        data: {
                            provider: [...user.provider, "google"],
                        },
                    });
                }

                return done(null, user);
            } catch (err) {
                return done(err, null);
            }
        }
    )
);

router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        try {
            const user = req.user;
            createCookies(user, res);

            res.redirect(`${FRONTEND_URL}/`);
        } catch (err) {
            console.error(err);
            res.redirect(`${FRONTEND_URL}/auth-error`);
        }
    }
);

router.get("/authentication-test", authenticate, (req, res) => {
    res.json({
        success: true,
        msg: "User is authenticated",
        data: req.access_token_decoded,
    });
});

module.exports = router;
