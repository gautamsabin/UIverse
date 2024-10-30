import mongoose from "mongoose";

//making Favorite model

export default mongoose.model(
    "Favorite",
    mongoose.Schema(
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true
            },
            website: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "website",
                required: true
            }

        },
        {
            timestamps: true,
        }
    )
)