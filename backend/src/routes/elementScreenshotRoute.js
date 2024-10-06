import { Router } from "express";
import { addElementScreenshot, getAllElementScreenshot, getOneElementScreenshot, updateElementScreenshot, deleteElementScreenshot } from "../controllers/elementScreenshotController.js";
import { upload } from "../middlewares/fileUpload.js";
const elementScreenshotRoute = Router();

elementScreenshotRoute.post("/", upload.image.single("image"), addElementScreenshot);
elementScreenshotRoute.get("/", getAllElementScreenshot);
elementScreenshotRoute.get("/:id", getOneElementScreenshot);
elementScreenshotRoute.patch("/:id", upload.image.single("image"), updateElementScreenshot);
elementScreenshotRoute.delete("/:id", deleteElementScreenshot);


export default elementScreenshotRoute;