import mongoose from "mongoose";

// User Model
export default mongoose.model(
    "user",
    mongoose.Schema(
        {
            email: {
                type: String,
                required: true,
                unique: true
            },
            verificationCode: {
                type: String,
            },
            isVerified: {
                type: Boolean,
                default: false
            },
            sessionExpiresAt: {
                type: Date
            },
            codeExpires: { // Add this field
                type: Date
            }
        },
        {
            timestamps: true,
        }
    )
);
