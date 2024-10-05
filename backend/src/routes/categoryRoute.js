import { Router } from "express";
import {
    addCategory,
    getAllCategory,
    getOneCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js"

const categoryRouter = Router();

categoryRouter.post("/", addCategory);
categoryRouter.get("/", getAllCategory);
categoryRouter.get("/:id", getOneCategory);
categoryRouter.patch("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);


export default categoryRouter;