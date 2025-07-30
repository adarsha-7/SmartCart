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

router.post("/signup", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const [userInUser, userInPending] = await Promise.all([
        prisma.user.findUnique({
            where: { email: email },
        }),
        prisma.pendingUser.findUnique({
            where: { email: email },
        }),
    ]);

    if (userInUser) {
        res.json({ msg: "User with this email already exists." });
    } else if (userInPending && Date.now() < userInPending.expiresAt) {
        res.json({ msg: "Email is already sent for verification." });
    } else {
        const { nanoid } = await import("nanoid");

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pendingUser = await prisma.pendingUser.deleteMany({
            where: { email: email },
        });

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

        res.json({
            msg: `An email is sent to ${newPendingUser.email} for verification.`,
        });
    }
});

router.post("/signin", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if (user) {
        if (user.provider.includes("manual")) {
            const passwordCorrect = bcrypt.compare(password, user.passwordHash);
            if (passwordCorrect) {
                try {
                    createCookies(user, res);
                    res.json({ success: true, msg: "Login Successful" });
                } catch (err) {
                    console.error(err);
                    res.json({ success: false, msg: "Error occured" });
                }
            } else {
                res.json({ msg: "Incorrect password." });
            }
        } else {
            res.json({ msg: "This account uses Google for authentication." });
        }
    } else {
        res.json({ msg: "Account does not exist. Please sign up first." });
    }
});

router.post("/verify", async (req, res) => {
    const pendingUser = await prisma.pendingUser.findFirst({
        where: { verificationToken: req.body.token },
    });

    if (!pendingUser) {
        res.json({ success: false, msg: "Invalid verification link." });
    } else if (pendingUser.expiresAt < new Date()) {
        res.json({ success: false, msg: "Verification link expired." });
    } else {
        const [newUser, deletedPendingUser] = await Promise.all([
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

        try {
            createCookies(newUser, res);
            res.json({
                success: true,
                msg: "New account created successfully. Redirecting to dashboard ...",
            });
        } catch (err) {
            console.error(err);
            res.json({ success: false, msg: "Error occured" });
        }
    }
});

module.exports = router;
