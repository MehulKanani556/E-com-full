const fs = require('fs');
const asyncHandler = require('express-async-handler');

const slugify = require('slugify');
const { cloudinaryUploadImg, cloudinaryDeleteImg } = require('../utils/cloudinary');
const uploadImages = asyncHandler(async (req, res) => {

    try {
        const uploader = (path) => cloudinaryUploadImg(path, 'images');
        const urls = [];
        const files = req.files;
        for (let file of files) {
            const { path } = file;
            const newPath = await uploader(path);
            urls.push(newPath);
            try {
                // Add a small delay before attempting to delete the file
                await new Promise(resolve => setTimeout(resolve, 100));
                fs.unlinkSync(path);
            } catch (unlinkError) {
                console.warn(`Warning: Could not delete temporary file ${path}:`, unlinkError);
                // Continue execution even if file deletion fails
            }
        }
        const images = urls.map(file => file);
        res.json(images);
        // const findProduct = await Product.findByIdAndUpdate(id, { images: urls.map(file => { return file }) }, { new: true });
        // res.json(findProduct)

    } catch (error) {
        throw new Error(error)
    }
});

const deleteImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = cloudinaryDeleteImg(id, 'images');
        res.json({ message: 'Deleted' });
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = {uploadImages, deleteImages};