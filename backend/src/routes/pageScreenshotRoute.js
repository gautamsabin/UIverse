import { Router } from "express";
import {
    addPageScreenshot,
    getAllPageScreenshot,
    getOnePageScreenshot,
    updatePageScreenshot,
    deletePageScreenshot,
    getScreenshotsByPageTypes,
} from "../controllers/pageScreenshotController.js";
import { upload } from "../middlewares/fileUpload.js";
const pageScreenshotRoute = Router();

pageScreenshotRoute.post("/", upload.image.single("image"), addPageScreenshot);
pageScreenshotRoute.get("/", getAllPageScreenshot);
pageScreenshotRoute.get("/page/:pageType", getScreenshotsByPageTypes)
pageScreenshotRoute.get("/:id", getOnePageScreenshot);
pageScreenshotRoute.patch("/:id", upload.image.single("image"), updatePageScreenshot);
pageScreenshotRoute.delete("/:id", deletePageScreenshot);


export default pageScreenshotRoute;