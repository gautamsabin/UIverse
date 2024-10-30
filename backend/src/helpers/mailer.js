import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

    },
});

export const sendVerificationEmail = async (email, code) => {
    const subject = "Your Verification Code";
    const text = `Your verification code is ${code}.`;

    const html = `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f4f4f4;
                    margin: 0;
                    padding: 20px;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background: #ffffff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }
                h1 {
                    color: #333333;
                }
                .code {
                    font-size: 24px;
                    font-weight: bold;
                    color: #007bff;
                    padding: 10px;
                    border: 2px solid #007bff;
                    border-radius: 4px;
                    display: inline-block;
                    margin: 20px 0;
                }
                p {
                    color: #555555;
                    line-height: 1.6;
                }
                .footer {
                    margin-top: 20px;
                    font-size: 12px;
                    color: #aaaaaa;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Email Verification</h1>
                <p>Thank you for registering! Please use the following verification code to complete your registration:</p>
                <div class="code">${code}</div>
                <p>If you did not request this, please ignore this email.</p>
                <p>Best regards,<br>Uisearch</p>
                <div class="footer">This email was sent automatically. Please do not reply.</div>
            </div>
        </body>
    </html>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: subject,
        text: text,
        html: html,
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};


