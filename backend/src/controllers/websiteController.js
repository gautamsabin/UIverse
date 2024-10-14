import WebsiteModel from "../models/WebsiteModel.js";
import CategoryModel from "../models/CategoryModel.js";
import PageScreenshotModel from "../models/PageScreenshotModel.js";
import ElementScreenshotModel from "../models/elementScreenshotModel.js";
import { emptyBodyValidator, bodyValidator, emptyFieldValidator, mongooseIdValidator } from "../utils/validator.js";
import { okResponse, errorResponse } from "../utils/response.js";

//POST Website
export const addWebsite = async (req, res) => {
    try {
        if (emptyBodyValidator(req.body, res)) return;
        let { name, url, category, description } = req.body;
        let fields = [name, url, category, description]
        if (emptyFieldValidator(fields, res)) return;
        const selectedCategory = await CategoryModel.findOne({ _id: category });
        if (!selectedCategory) {
            return errorResponse({
                status: 200,
                message: "Category id not found",
                res,
            });
        }
        let data = await new WebsiteModel({
            name,
            url,
            category,
            description
        }).save();
        okResponse({
            status: 200,
            data,
            res,
            message: "Website added successfully",
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

//GET Website
export const getAllWebsite = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        let websites;
        websites = await WebsiteModel.find({}).populate("category", 'name');
        //no Website find
        if (websites.length === 0) {
            return okResponse({
                status: 204,
                data: [],
                res,
                message: "No websites found",
            });
        }
        okResponse({
            status: 200,
            data: websites,
            res,
            message: "websites retrieved successfully",
        });
    } catch (err) {
        errorResponse({ status: 500, message: err.message, res });
    }
};


//GET One Website
export const getOneWebsite = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        const website = await WebsiteModel.findById({
            _id: id,
        }).populate("category", 'name');
        const pageScreenshots = await PageScreenshotModel.find({ website: website._id });
        const elementScreenshots = await ElementScreenshotModel.find({ website: website._id });
        let pageScreenshotsData = pageScreenshots.map((obj) => ({
            pageType: obj._doc.page,
            imageUrl: obj._doc.imageUrl,
            description: obj._doc.description
        }));

        let elementScreenshotsData = elementScreenshots.map((obj) => ({
            elementType: obj._doc.element,
            imageUrl: obj._doc.imageUrl
        }))

        let data = {
            website,
            pageScreenshotsData,
            elementScreenshotsData
        }
        if (!website) {
            errorResponse({
                status: 204,
                message: "website not found",
                res,
            });
        }
        okResponse({
            status: 200,
            data,
            message: 'website found successfully',
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

//Update Website
export const updateWebsite = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (emptyBodyValidator(req.body, res)) return;
        let { name, url, category, description } = req.body;
        let data;
        data = await WebsiteModel.findByIdAndUpdate(id, { name, url, category, description });
        if (!data) {
            return errorResponse({
                status: 404,
                message: "Website cannot be updated",
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

//DELETE Website
export const deleteWebsite = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (bodyValidator(req.body, res)) return;
        const website = await WebsiteModel.findByIdAndDelete(id);
        if (!website) {
            errorResponse({
                status: 404,
                message: 'website not found.',
                res
            });
        }
        okResponse({
            status: 200,
            data: website,
            res,
            message: 'website deleted successfully.'
        });

    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res
        });
    }
}

//search website
export const searchByWebsiteName = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        const searchString = req.query.name || " ";
        const websites = await WebsiteModel.find({ name: { $regex: searchString, $options: "i" } }).populate("category", 'name');
        //no Website find
        if (websites.length === 0) {
            return okResponse({
                status: 204,
                data: [],
                res,
                message: "No website found",
            });
        }
        okResponse({
            status: 200,
            data: websites,
            res,
            message: "Websites retrieved successfully",
        });
    } catch (err) {
        errorResponse({ status: 500, message: err.message, res });
    }
}
