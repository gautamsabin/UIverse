import mongoose from "mongoose";

//making website model

export default mongoose.model(
    "elementScreenshot",
    mongoose.Schema(
        {
            website: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "website",
                required: true
            },
            element: {
                type: String,
                required: true,
                enum: [
                    'accordion',
                    'alert',
                    'avatar',
                    'badge',
                    'breadcrumb',
                    'calendar',
                    'carousel',
                    'dropdown',
                    'footer',
                    'header',
                    'icon',
                    'image',
                    'list',
                    'loader',
                    'modal',
                    'pagination',
                    'popover',
                    'radioButton',
                    'sidebar',
                    'slider',
                    'stepper',
                    'table',
                    'textfield',
                    'toast',
                    'tooltip',
                    'table',
                    'button',
                    'searchbar',
                    'checkbox',
                    'form',
                    'navigationMenu',
                    'card',
                    'module',
                    'chart',
                    'progressBar',
                    'tabs',
                    'tags',
                    'blog',
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
        },
        {
            timestamps: true,
        }
    )
)