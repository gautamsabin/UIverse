import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const cloudinaryFileUpload = async (file) => {
    return new Promise((resolve) => {
        cloudinary.uploader.upload(file, (err, res) => {
            if (err) return res.status(500).send("upload error");
            resolve({
                secureURL: res.secure_url,
                publicId: res.public_id
            });
        });
    });
};
// Function to delete an image from Cloudinary
export const deleteCloudinaryImage = async (publicId) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(publicId, { invalidate: true }, (err, result) => {
            if (err) {
                reject(new Error("Error deleting image from Cloudinary: " + err.message)); // Reject on error
            } else {
                resolve(result); // Resolve with the result
            }
        });
    });
};