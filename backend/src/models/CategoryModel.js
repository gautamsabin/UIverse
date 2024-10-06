import mongoose from "mongoose";

//making category model

export default mongoose.model(
    "category",
    mongoose.Schema(
        {
            name: {
                type: String,
                required: true
            }

        },
        {
            timestamps: true,
        }
    )
)