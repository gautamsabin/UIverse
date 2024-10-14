import { Router } from "express";
import {
    addCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory,
    getCategoryWise
} from "../controllers/categoryController.js"

const categoryRouter = Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/search/", getCategoryWise);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);


export default categoryRouter;