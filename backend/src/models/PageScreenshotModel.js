import mongoose from "mongoose";

//making category model

export default mongoose.model(
    "pageScreenshot",
    mongoose.Schema(
        {
            website: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "website",
                required: true
            },
            page: {
                type: String,
                required: true,
                enum: [
                    'landing',
                    'logo',
                    'dashboard',
                    'about',
                    'services',
                    'pricing',
                    'features',
                    'products',
                    'contact',
                    'login',
                    'signup',
                    'profile',
                    '404',
                    'blog',
                    'catalog',
                    'FAQ',
                    'career',
                    'team',
                    'other'
                ],
                default: 'other'
            },
            imageUrl: {
                type: String,
                required: true,
            },

            imageId: {
                type: String,
                required: true,
            },
            description: {
                type: String
            }
        },
        {
            timestamps: true,
        }
    )
)