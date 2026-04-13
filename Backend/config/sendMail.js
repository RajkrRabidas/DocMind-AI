const nodemailer = require("nodemailer");

// create Transporter using SMTP

const sendMail = async ({ email, subject, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
        }
    })
    await transporter.sendMail({
        from: process.env.SMTP_EMAIL,  // ✅ was SMTP_Email (wrong case)
        to: email,
        html: html,
        subject: subject,
    });
}

module.exports = sendMail;