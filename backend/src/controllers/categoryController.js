import mongoose from "mongoose";
import CategoryModel from "../models/CategoryModel.js";
import WebsiteModel from "../models/WebsiteModel.js";
import { emptyBodyValidator, bodyValidator, mongooseIdValidator } from "../utils/validator.js";
import { okResponse, errorResponse } from "../utils/response.js";

//POST Category
export const addCategory = async (req, res) => {
    try {
        if (emptyBodyValidator(req.body, res)) return;
        let { name } = req.body;
        if (!name) {
            return errorResponse({
                status: 400,
                message: "Category name is required.",
                res,
            });
        }
        let data = await new CategoryModel({ name }).save();
        okResponse({
            status: 200,
            data, // The saved category data
            res,
            message: "Category added successfully",
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

//GET Category
export const getAllCategory = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        let categories;
        categories = await CategoryModel.find({});

        //no category find
        if (categories.length === 0) {
            return okResponse({
                status: 204,
                data: [],
                res,
                message: "No categories found",
            });
        }
        okResponse({
            status: 200,
            data: categories,
            res,
            message: "Categories retrieved successfully",
        });
    } catch (err) {
        errorResponse({ status: 500, message: err.message, res });
    }
};

//GET One Category
export const getOneCategory = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        const category = await CategoryModel.findById({
            _id: id,
        });
        const websitesInCategory = await WebsiteModel.find({ category: category._id });
        let data;
        let websitesInCategoryData = websitesInCategory.map((obj) => ({
            name: obj._doc.name,
            url: obj._doc.url,
        }));
        data = {
            category,
            websitesInCategoryData
        }
        if (!category) {
            errorResponse({
                status: 204,
                message: "Category not found",
                res,
            });
        }
        okResponse({
            status: 200,
            data,
            message: 'Category found successfully',
            res,
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

//Filter Category wise
export const getCategoryWise = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        const categories = req.query.name;
        const categoryArray = categories ? categories.split(",") : [];
        let category;
        category = await CategoryModel.find({ name: { $in: categoryArray } });
        if (!category) {
            errorResponse({
                status: 204,
                message: "Category not found",
                res,
            });
        }
        okResponse({
            status: 200,
            data: category,
            message: 'Category found successfully',
            res,
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

//UPDATE Category
export const updateCategory = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        let { name } = req.body;
        if (!name) {
            return errorResponse({
                status: 400,
                message: "Category name is required.",
                res,
            });
        }

        session.startTransaction()
        // Find the category by id
        let category = await CategoryModel.findById(id).session(session);
        if (!category) {
            return errorResponse({
                status: 404,
                message: "Category cannot be updated",
                res,
            });
        }

        let websitesInCategory = await WebsiteModel.find({ category: id }).session(session);
        if (websitesInCategory.length === 0) {
            //update the category name
            category.name = name;
            //update the category object back to the database
            await category.save({ session });
            await session.commitTransaction(); // Commit the transaction

            return okResponse({
                status: 200,
                data: category,
                res,
                message: "Category updated successfully (no websites associated).",
            });
        } else {
            //if the website are associated, update both category and website
            //update category
            category.name = name;
            await category.save({ session });

            //update all the relative website
            await WebsiteModel.updateMany(
                { category: id }, // Filter to find all websites with this category ID
                { category: category._id }, // Update their category ID if needed
                { session }
            );

            // Commit the transaction
            await session.commitTransaction();
            okResponse({
                status: 200,
                data: category,
                res,
                message: 'Category updated successfully, websites updated if any.',
            });
        }
    } catch (err) {
        await session.abortTransaction(); // Rollback the transaction in case of error
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    } finally {
        session.endSession();
    }
};

//DELETE Category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (bodyValidator(req.body, res)) return;
        const websitesInCategory = await WebsiteModel.find({ category: id });
        if (websitesInCategory.length > 0) {
            errorResponse({
                status: 404,
                message: 'Website of this category exist.',
                res
            });
        } else {
            const category = await CategoryModel.findByIdAndDelete(id);
            if (!category) {
                errorResponse({
                    status: 404,
                    message: 'Category not found.',
                    res
                });
            }
            okResponse({
                status: 200,
                data: category,
                res,
                message: 'Category deleted successfully.'
            });
        }


    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res
        });
    }
}