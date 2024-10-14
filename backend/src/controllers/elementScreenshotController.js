import ElementScreenshotModel from "../models/elementScreenshotModel.js";
import WebsiteModel from "../models/WebsiteModel.js";
import { emptyBodyValidator, bodyValidator, emptyFieldValidator, mongooseIdValidator } from "../utils/validator.js";
import { okResponse, errorResponse } from "../utils/response.js";
import { cloudinaryFileUpload, deleteCloudinaryImage } from "../helpers/cloudinary.js";

//POST element screenshots
export const addElementScreenshot = async (req, res) => {
    try {
        if (emptyBodyValidator(req.body, res)) return;
        let { website, element } = req.body;
        let fields = [website, element]
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
        let data = await new ElementScreenshotModel({
            website,
            element,
            imageUrl: image.secureURL,
            imageId: image.publicId,
        }).save();
        okResponse({
            status: 200,
            data,
            res,
            message: "Element screenshot added successfully",
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
export const getAllElementScreenshot = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        let elementScreenshots;
        elementScreenshots = await ElementScreenshotModel.find({}).populate("website", 'name url');
        //no Website find
        if (elementScreenshots.length === 0) {
            return okResponse({
                status: 204,
                data: [],
                res,
                message: "No element screenshots found",
            });
        }
        okResponse({
            status: 200,
            data: elementScreenshots,
            res,
            message: "Element screenshots retrieved successfully",
        });
    } catch (err) {
        errorResponse({ status: 500, message: err.message, res });
    }
};
//Get By Elements Types
export const getScreenshotsByElementTypes = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        let elementType = req.params.elementType || "";
        let elementScreenshots;
        elementScreenshots = await ElementScreenshotModel.find({ element: elementType }).populate("website", 'name url');
        //no Website find
        if (elementScreenshots.length === 0) {
            return okResponse({
                status: 204,
                data: [],
                res,
                message: "No element screenshots found",
            });
        }
        okResponse({
            status: 200,
            data: elementScreenshots,
            res,
            message: "Element screenshots retrieved successfully",
        });
    } catch (err) {
        errorResponse({ status: 500, message: err.message, res });
    }
}
//GET One Element Screenshot
export const getOneElementScreenshot = async (req, res) => {
    try {
        if (bodyValidator(req.body, res)) return;
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        const elementScreenshot = await ElementScreenshotModel.findById({
            _id: id,
        }).populate("website", 'name url');
        if (!elementScreenshot) {
            errorResponse({
                status: 204,
                message: "Element screenshot not found",
                res,
            });
        }
        okResponse({
            status: 200,
            data: elementScreenshot,
            message: 'Element screenshot found successfully',
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

//Update Screenshot
export const updateElementScreenshot = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (emptyBodyValidator(req.body, res)) return;
        let { website, element } = req.body;
        const selectedElementScreenshot = await ElementScreenshotModel.findOne({ _id: id });
        if (!selectedElementScreenshot) {
            return errorResponse({
                status: 200,
                message: "Element screenshot id not found",
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
        if (typeof req.file !== 'undefined' && req.file) {
            image = image = await cloudinaryFileUpload(req.file.path);
            const elementScreenshot = await ElementScreenshotModel.findOne({ _id: id });
            const imagePublicId = elementScreenshot._doc.imageId;
            //delete the image from cloudinary
            await deleteCloudinaryImage(imagePublicId);
        }
        let data;
        data = await ElementScreenshotModel.findByIdAndUpdate(id, {
            website,
            element,
            imageUrl: image.secureURL,
            imageId: image.publicId
        });
        if (!data) {
            return errorResponse({
                status: 404,
                message: "Element screenshot cannot be updated",
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

//DELETE element screenshot
export const deleteElementScreenshot = async (req, res) => {
    try {
        const { id } = req.params;
        if (mongooseIdValidator(id, res)) return;
        if (bodyValidator(req.body, res)) return;
        const elementScreenshot = await ElementScreenshotModel.findOne({ _id: id });
        if (!elementScreenshot) {
            errorResponse({
                status: 404,
                message: 'Element screenshot not found.',
                res
            });
        }
        const imagePublicId = elementScreenshot._doc.imageId;

        //delete the image from cloudinary
        await deleteCloudinaryImage(imagePublicId);

        //delete the screenshots from database
        await ElementScreenshotModel.findByIdAndDelete(id);

        okResponse({
            status: 200,
            data: elementScreenshot,
            res,
            message: 'Element screenshot deleted successfully.'
        });

    } catch (err) {
        errorResponse({
            status: 500,
            message: err.message,
            res
        });
    }
}


