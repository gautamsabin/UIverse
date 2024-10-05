import mongoose from "mongoose";
import { errorResponse } from "./response.js";
export const emptyBodyValidator = (body, res) => {
    if (Object.keys(body).length === 0) {
        errorResponse({
            status: 400,
            message: "Field values are not provided",
            res,
        });
        return true;
    }
};


export const emptyQueryValidator = (query, res) => {
    if (Object.keys(query) != 0) {
        errorResponse({
            status: 400,
            message: "Bad Request",
            res,
        });
        return true;
    }
};
export const emptyFieldValidator = (data, res) => {
    var errorFlag = false;
    data.forEach((element) => {
        if (element.length === 0) {
            errorFlag = true;
        }
    });
    if (errorFlag) {
        errorResponse({
            status: 400,
            message: "Provide all the fields",
            res,
        });
        return true;
    }
};
export const mongooseIdValidator = (id, res) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        errorResponse({
            status: 400,
            message: " Given Id is not valid!!",
            res,
        });
        return true;
    }
};
export const bodyValidator = (body, res) => {
    if (Object.keys(body).length) {
        errorResponse({
            status: 400,
            message: "The request body is not empty",
            res,
        });
        return true;
    }
};