import mongoose from "mongoose";

//making website model

export default mongoose.model(
    "website",
    mongoose.Schema(
        {
            name: {
                type: String,
                require: true
            },
            url: {
                type: String,
                require: true
            },
            category: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "category",
            },
            description: {
                type: String,
                require: true
            }
        },
        {
            timestamps: true,
        }
    )
)