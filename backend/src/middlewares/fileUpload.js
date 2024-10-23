import multer from "multer";
import path from "path";

const filterImages = (file, cb) => {
    const fileType = /jpeg|jpg|png|webp|svg/i;
    const extName = fileType.test(path.extname(file.originalname));
    const mimeType = fileType.test(file.mimetype);
    if (extName && mimeType) {
        return cb(null, true);
    } else {
        return cb("Not a file type");
    }
};


const fileStorageEngine = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.fieldname + path.extname(file.originalname));
    },
});

export const upload = {
    image: multer({
        storage: fileStorageEngine,
        limits: { fileSize: 200000000 },
        fileFilter: (req, file, cb) => {
            filterImages(file, cb);
        },
    }),
};