import UserModel from "../models/UserModel.js";
import { sendVerificationEmail } from "../helpers/mailer.js";
import { generateToken } from "../utils/token.js";
import { okResponse, errorResponse } from "../utils/response.js";
import { emptyBodyValidator } from "../utils/validator.js";
import crypto from "crypto";

// POST - Send Verification Code
export const sendVerificationCode = async (req, res) => {
    try {
        if (emptyBodyValidator(req.body, res)) return;
        const { email } = req.body;
        if (!email) {
            return errorResponse({
                status: 400,
                message: "Email is required.",
                res,
            });
        }

        const code = crypto.randomInt(100000, 999999).toString();

        let user = await UserModel.findOneAndUpdate(
            { email },
            { verificationCode: code, codeExpires: Date.now() + 15 * 60 * 1000 },
            { upsert: true, new: true }
        );

        await sendVerificationEmail(email, code);
        okResponse({
            status: 200,
            data: user,
            message: "Verification code sent successfully.",
            res,
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};


export const verifyCode = async (req, res) => {
    try {
        if (emptyBodyValidator(req.body, res)) return;
        const { email, code } = req.body;

        if (!email || !code) {
            return errorResponse({
                status: 400,
                message: "Email and code are required.",
                res,
            });
        }

        const user = await UserModel.findOne({ email });
        if (!user || user.verificationCode !== code || user.codeExpires < Date.now()) {
            return errorResponse({
                status: 400,
                message: "Invalid or expired verification code.",
                res,
            });
        }

        const token = generateToken({ email: user.email });
        user.verificationCode = null;
        user.codeExpires = null;
        user.isVerified = true;
        user.sessionExpiresAt = Date.now() + 7 * 24 * 30 * 60 * 1000; // Set session expiration
        const userData = await user.save();

        okResponse({
            status: 200,
            data: { token, userData },
            message: "Logged in successfully.",
            res,
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

// POST - Logout
export const logout = async (req, res) => {
    try {
        const userId = req.user._id; // Getting the user from the protected middleware
        const user = await UserModel.findById(userId);
        if (!user) {
            return errorResponse({
                status: 404,
                message: "User not found.",
                res,
            });
        }
        user.sessionExpiresAt = null;
        await user.save();

        okResponse({
            status: 200,
            message: "Logged out successfully.",
            res,
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};
