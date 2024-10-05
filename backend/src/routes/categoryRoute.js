import { Router } from "express";
import {
    addCategory,
    getCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js"

const categoryRouter = Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getCategory);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);


export default categoryRouter;