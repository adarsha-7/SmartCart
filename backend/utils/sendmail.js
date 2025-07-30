const nodemailer = require("nodemailer");

async function sendMail(mailReceiver, mailSubject, mailMessage) {
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
        to: mailReceiver,
        subject: mailSubject,
        text: mailMessage,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        throw error;
    }
}

module.exports = sendMail;
