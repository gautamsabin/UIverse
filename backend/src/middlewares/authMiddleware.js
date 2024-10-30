import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/token.js';
import UserModel from '../models/UserModel.js';
import "dotenv/config";

export const protect = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[0];
    if (!token) return res.status(401).json({ message: 'Not authorized' });

    try {
        const decoded = verifyToken(token);
        const user = await UserModel.findOne({ email: decoded.email });

        if (!user || !user.isVerified) {
            return res.status(401).json({ message: 'User not verified' });
        }

        if (new Date() > user.sessionExpiresAt) {
            user.isVerified = false;
            await user.save();
            return res.status(401).json({ message: 'Session expired' });
        }

        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};


