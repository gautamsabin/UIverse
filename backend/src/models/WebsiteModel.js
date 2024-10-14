import mongoose from "mongoose";

//making website model

export default mongoose.model(
    "website",
    mongoose.Schema(
        {
            name: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "category",
                required: true
            },
            description: {
                type: String,
                required: true
            }
        },
        {
            timestamps: true,
        }
    )
)