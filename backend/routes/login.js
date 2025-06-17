const express = require("express");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");

const { PrismaClient } = require("../generated/prisma");

const router = express.Router();
const prisma = new PrismaClient();

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
    } else if (userInPending) {
        res.json({ msg: "Email is already sent for verification." });
    } else {
        const { nanoid } = await import("nanoid");

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newPendingUser = await prisma.pendingUser.create({
            data: {
                email: email,
                passwordHash: hashedPassword,
                expiresAt: new Date(Date.now() + 2 * 60 * 1000),
                verificationToken: nanoid(),
            },
        });

        const FRONTEND_URL =
            process.env.ENV == "development"
                ? process.env.FRONTEND_URL_DEV
                : process.env.FRONTEND_URL;
        const verificationLink = `${FRONTEND_URL}/login/verify?token=${newPendingUser.verificationToken}`;

        //Send email with verificationLink
        console.log(verificationLink);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            secure: true,
            port: 465,
            auth: {
                user: "studyhub552@gmail.com",
                pass: "qdwt cnwi badi pjok",
            },
        });

        const mailOptions = {
            from: "studyhub552@gmail.com",
            to: newPendingUser.email,
            subject: "SmartCart Login Verification Link",
            text: `Please click this link to verify your email for SmartCart: ${verificationLink}. \n If you did not attempt to sign in to SmartCart using this email, you can safely ignore this.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).send({ error });
            }
        });

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
        const passwordCorrect = await bcrypt.compare(
            password,
            user.passwordHash
        );
        if (passwordCorrect) {
            res.json({ msg: "Account exists. Sign in successfully." });
        } else {
            res.json({ msg: "Incorrect password." });
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
        res.json({ msg: "Invalid verification link." });
    } else if (pendingUser.expiresAt < new Date()) {
        res.json({ msg: "Verification link expired." });
    } else {
        const newUser = await prisma.user.create({
            data: {
                email: pendingUser.email,
                passwordHash: pendingUser.passwordHash,
            },
        });
        await prisma.pendingUser.delete({
            where: { id: pendingUser.id },
        });
        res.json({
            msg: "success",
        });
    }
});

module.exports = router;
