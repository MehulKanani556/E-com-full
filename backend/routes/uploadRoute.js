const express = require('express');
const {  uploadImages, deleteImages } = require('../controller/uploadController');
const router = express.Router();
const { isAdmin, authMiddleware } = require('../middlewares/authMiddleware');
const { uploadPhoto,productImageResize } = require('../middlewares/uploadImages');


router.post('/',authMiddleware,isAdmin,uploadPhoto.array('images',10),productImageResize,uploadImages)

router.delete('/delete-img/:id', authMiddleware, isAdmin, deleteImages);

module.exports = router;