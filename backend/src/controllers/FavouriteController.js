import FavouriteModel from "../models/FavouriteModel.js";
import { okResponse, errorResponse } from "../utils/response.js";

// Add website to Favourites
export const addFavouriteWebsite = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user ID from request
        const { websiteId } = req.body;

        if (!websiteId) {
            return errorResponse({
                status: 400,
                message: "Website ID is required",
                res,
            });
        }

        // Check if the Favourite already exists
        const existingFavourite = await FavouriteModel.findOne({ user: userId, website: websiteId });
        if (existingFavourite) {
            return errorResponse({
                status: 409,
                message: "Website is already in Favourites",
                res,
            });
        }

        // Create and save the new Favourite
        const newFavourite = new FavouriteModel({
            user: userId,
            website: websiteId,
        });

        await newFavourite.save();

        okResponse({
            status: 200,
            data: newFavourite,
            res,
            message: "Website added to Favourites successfully",
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

// Get user's Favourite websites
export const getFavouriteWebsites = async (req, res) => {
    try {
        const userId = req.user.id;

        const Favourites = await FavouriteModel.find({ user: userId }).populate("user").populate("website");

        okResponse({
            status: 200,
            data: Favourites,
            res,
            message: "Favourites retrieved successfully",
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

export const removeFromFavorites = async (req, res) => {
    const { websiteId } = req.params;
    try {

        const favourite = await FavouriteModel.findOneAndDelete({
            user: req.user._id,
            website: websiteId,
        });

        if (!favourite) {
            errorResponse({
                status: 500,
                message: "Favourite not found",
                res,
            });
        }

        okResponse({
            status: 200,
            data: favourite,
            res,
            message: "Favourite removed successfully",
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};