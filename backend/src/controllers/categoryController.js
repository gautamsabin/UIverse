import CategoryModel from "../models/CategoryModel.js";
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
export const getCategory = async (req, res) => {
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
            message: 'Category updated successfully',
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
        let data;
        data = await CategoryModel.findByIdAndUpdate(id, { name });
        if (!data) {
            return errorResponse({
                status: 404,
                message: "Category cannot be updated",
                res,
            });
        }
        okResponse({
            status: 200,
            data,
            res
        })
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

//DELETE Category
export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (emptyBodyValidator(req.body, res)) return;
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

    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res
        });
    }
}