import { Router } from "express";
import {
    addWebsite, getAllWebsite, getOneWebsite, updateWebsite, deleteWebsite
} from "../controllers/websiteController.js"

const websiteRouter = Router();

websiteRouter.post("/", addWebsite);
websiteRouter.get("/", getAllWebsite);
websiteRouter.get("/:id", getOneWebsite);
websiteRouter.patch("/:id", updateWebsite);
websiteRouter.delete("/:id", deleteWebsite);

export default websiteRouter;