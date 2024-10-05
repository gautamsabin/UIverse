export const okResponse = ({ status, data, message, res }) => {
    try {
        const resObj = {
            success: true,
            code: status,
            payload: {
                data: data,
            },
            message,
        };
        return res.status(status).send(resObj);
    } catch (err) {
        return err.message;
    }
};
export const errorResponse = ({ status, message, res }) => {
    try {
        const resObj = {
            success: false,
            code: status,
            message: message,
        };
        return res.status(status).send(resObj);
    } catch (err) {
        return err.message;
    }
};