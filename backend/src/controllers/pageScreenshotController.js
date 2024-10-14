import PageScreenshotModel from "../models/PageScreenshotModel.js";
import WebsiteModel from "../models/WebsiteModel.js";
import { emptyBodyValidator, bodyValidator, emptyFieldValidator, mongooseIdValidator } from "../utils/validator.js";
import { okResponse, errorResponse } from "../utils/response.js";
import { cloudinaryFileUpload, deleteCloudinaryImage } from "../helpers/cloudinary.js";

//POST Page screenshots
export const addPageScreenshot = async (req, res) => {
    try {
        if (emptyBodyValidator(req.body, res)) return;
        let { website, page, description } = req.body;
        let fields = [website, page]
        if (emptyFieldValidator(fields, res)) return;
        const selectedWebsite = await WebsiteModel.findOne({ _id: website });
        if (!selectedWebsite) {
            return errorResponse({
                status: 200,
                message: "Website id not found",
                res,
            });
        }
        let image = {};
        req.file && (image = await cloudinaryFileUpload(req.file.path));


        let data = await new PageScreenshotModel({
            website,
            page,
            imageUrl: image.secureURL,
            imageId: image.publicId,
            description
        }).save();
        okResponse({
            status: 200,
            data,
            res,
            message: "Page screenshot added successfully",
        });
    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res,
        });
    }
};

//GET all page screenshots
export const getAllPageScreenshot = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        let pageScreenshots;
        pageScreenshots = await PageScreenshotModel.find({}).populate("website", "name url");
        //no Website find
        if (pageScreenshots.length === 0) {
            return okResponse({
                status: 204,
                data: [],
                res,
                message: "No page screenshots found",
            });
        }
        okResponse({
            status: 200,
            data: pageScreenshots,
            res,
            message: "Page screenshots retrieved successfully",
        });
    } catch (err) {
        errorResponse({ status: 500, message: err.message, res });
    }
};

//GET One Page Screenshot
export const getOnePageScreenshot = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        const pageScreenshot = await PageScreenshotModel.findById({
            _id: id,
        }).populate("website", "name url");
        if (!pageScreenshot) {
            errorResponse({
                status: 204,
                message: "Page screenshot not found",
                res,
            });
        }
        okResponse({
            status: 200,
            data: pageScreenshot,
            message: 'Page screenshot found successfully',
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

//Get By Page Types
export const getScreenshotsByPageTypes = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        let pageType = req.params.pageType || " ";
        let pageScreenshots;
        pageScreenshots = await PageScreenshotModel.find({ page: pageType }).populate("website", "name url");
        //no Website find
        if (pageScreenshots.length === 0) {
            return okResponse({
                status: 204,
                data: [],
                res,
                message: "No page screenshots found",
            });
        }
        okResponse({
            status: 200,
            data: pageScreenshots,
            res,
            message: "Page screenshots retrieved successfully",
        });
    } catch (err) {
        errorResponse({ status: 500, message: err.message, res });
    }
}

//Update Screenshot
export const updatePageScreenshot = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (emptyBodyValidator(req.body, res)) return;
        let { website, page, description } = req.body;
        const selectedPageScreenshot = await PageScreenshotModel.findOne({ _id: id });
        if (!selectedPageScreenshot) {
            return errorResponse({
                status: 200,
                message: "Page screenshot id not found",
                res,
            });
        }
        let image = req.file;
        if (!image) {
            return errorResponse({
                status: 499,
                message: "Image is required",
                res
            })
        }
        //req.file && (image = await cloudinaryFileUpload(req.file.path));
        if (req.file) {
            image = image = await cloudinaryFileUpload(req.file.path);
            const pageScreenshot = await PageScreenshotModel.findOne({ _id: id });
            const imagePublicId = pageScreenshot._doc.imageId;
            //delete the image from cloudinary
            await deleteCloudinaryImage(imagePublicId);
        }
        let data;
        data = await PageScreenshotModel.findByIdAndUpdate(id, {
            website,
            page,
            imageUrl: image.secureURL,
            imageId: image.publicId,
            description
        });
        if (!data) {
            return errorResponse({
                status: 404,
                message: "Page screenshot cannot be updated",
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

//DELETE page screenshot
export const deletePageScreenshot = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (bodyValidator(req.body, res)) return;
        const pageScreenshot = await PageScreenshotModel.findOne({ _id: id });
        if (!pageScreenshot) {
            errorResponse({
                status: 404,
                message: 'pageScreenshot not found.',
                res
            });
        }
        const imagePublicId = pageScreenshot._doc.imageId;

        //delete the image from cloudinary
        await deleteCloudinaryImage(imagePublicId);

        //delete the screenshots from database
        await PageScreenshotModel.findByIdAndDelete(id);

        okResponse({
            status: 200,
            data: pageScreenshot,
            res,
            message: 'Page screenshot deleted successfully.'
        });

    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res
        });
    }
}

