const nodemailer = require("nodemailer");

function sendMail(mailReceiver, mailSubject, mailMessage) {
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

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error });
        }
    });
}

module.exports = sendMail;
