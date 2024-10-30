import { Router } from "express";
import { addFavouriteWebsite, getFavouriteWebsites, removeFromFavorites } from "../controllers/FavouriteController.js";
import { protect } from "../middlewares/authMiddleware.js"

const favouriteRouter = Router();


favouriteRouter.post("/", protect, addFavouriteWebsite);
favouriteRouter.get("/", protect, getFavouriteWebsites);
favouriteRouter.delete("/:websiteId", protect, removeFromFavorites);

export default favouriteRouter;