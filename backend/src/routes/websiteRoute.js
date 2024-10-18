import { Router } from "express";
import {
    addWebsite,
    getAllWebsite,
    getOneWebsite,
    updateWebsite,
    deleteWebsite,
    searchByWebsiteName
} from "../controllers/websiteController.js"

const websiteRouter = Router();

websiteRouter.post("/", addWebsite);
websiteRouter.get("/", getAllWebsite);
websiteRouter.get("/search", searchByWebsiteName);
websiteRouter.get("/:id", getOneWebsite);
websiteRouter.patch("/:id", updateWebsite);
websiteRouter.delete("/:id", deleteWebsite);

export default websiteRouter;