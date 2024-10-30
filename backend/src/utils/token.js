import jwt from "jsonwebtoken";
import "dotenv/config";

const secretKey = process.env.JWT_SECRET; // Use environment variable for security
const tokenExpiration = "1h"; // Adjust as needed

// Generate Access Token
export const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        secretKey,
        { expiresIn: tokenExpiration }
    );
};

// Verify Access Token
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, secretKey);
    } catch (error) {
        return null; // Return null if verification fails
    }
};


