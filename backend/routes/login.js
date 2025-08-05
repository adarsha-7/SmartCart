const express = require("express");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("../generated/prisma");

const sendMail = require("../utils/sendmail");
const createCookies = require("../utils/createcookies");

const router = express.Router();
const prisma = new PrismaClient();

const FRONTEND_URL =
    process.env.ENV == "development"
        ? process.env.FRONTEND_URL_DEV
        : process.env.FRONTEND_URL;

// SIGNUP
router.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const [userInUser, userInPending] = await Promise.all([
        prisma.user.findUnique({ where: { email } }),
        prisma.pendingUser.findUnique({ where: { email } }),
    ]);

    if (userInUser) {
        return res
            .status(409)
            .json({ msg: "User with this email already exists." }); // 409 Conflict
    } else if (userInPending && Date.now() < userInPending.expiresAt) {
        return res
            .status(409)
            .json({ msg: "Email is already sent for verification." }); // 409 Conflict
    } else {
        try {
            const { nanoid } = await import("nanoid");

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            await prisma.pendingUser.deleteMany({ where: { email } });

            const newPendingUser = await prisma.pendingUser.create({
                data: {
                    email,
                    passwordHash: hashedPassword,
                    expiresAt: new Date(Date.now() + 2 * 60 * 1000),
                    verificationToken: nanoid(),
                },
            });

            const verificationLink = `${FRONTEND_URL}/login/verify?token=${newPendingUser.verificationToken}`;
            console.log(verificationLink);

            const mailSubject = "SmartCart Login Verification Link";
            const mailMessage = `Please click this link to verify your email for SmartCart: ${verificationLink}. \n If you did not attempt to sign in to SmartCart using this email, you can safely ignore this.`;
            const mailReceiver = newPendingUser.email;

            sendMail(mailReceiver, mailSubject, mailMessage);

            return res.status(200).json({
                msg: `An email is sent to ${newPendingUser.email} for verification.`,
            });
        } catch (err) {
            console.error(err);
            return res
                .status(500)
                .json({ msg: "Something went wrong during signup." }); // 500 Internal Server Error
        }
    }
});

// SIGNIN
router.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        return res
            .status(404)
            .json({ msg: "Account does not exist. Please sign up first." }); // 404 Not Found
    }

    if (!user.provider.includes("manual")) {
        return res
            .status(403)
            .json({ msg: "This account uses Google for authentication." }); // 403 Forbidden
    }

    const passwordCorrect = await bcrypt.compare(password, user.passwordHash);

    if (!passwordCorrect) {
        return res.status(401).json({ msg: "Incorrect password." }); // 401 Unauthorized
    }

    try {
        createCookies(user, res);
        return res.status(200).json({ success: true, msg: "Login Successful" }); // 200 OK
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ success: false, msg: "Error occurred during login." }); // 500 Internal Server Error
    }
});

// VERIFY
router.post("/verify", async (req, res) => {
    const pendingUser = await prisma.pendingUser.findFirst({
        where: { verificationToken: req.body.token },
    });

    if (!pendingUser) {
        return res
            .status(400)
            .json({ success: false, msg: "Invalid verification link." }); // 400 Bad Request
    }

    if (pendingUser.expiresAt < new Date()) {
        return res
            .status(410)
            .json({ success: false, msg: "Verification link expired." }); // 410 Gone
    }

    try {
        const [newUser] = await Promise.all([
            prisma.user.create({
                data: {
                    email: pendingUser.email,
                    passwordHash: pendingUser.passwordHash,
                    provider: ["manual"],
                },
            }),
            prisma.pendingUser.delete({
                where: { id: pendingUser.id },
            }),
        ]);

        createCookies(newUser, res);

        return res.status(201).json({
            success: true,
            msg: "New account created successfully. Redirecting to dashboard ...",
        }); // 201 Created
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            msg: "Error occurred during verification.",
        }); // 500 Internal Server Error
    }
});

module.exports = router;
