const Enquiry = require('../models/enqModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

const createEnquiry = asyncHandler(async (req, res) => {
    try {
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});
const updateEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json(deletedEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});

const getaEnquiry = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaEnquiry = await Enquiry.findById(id);
        res.json(getaEnquiry);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllEnquiry = asyncHandler(async (req, res) => {
    try {
        const getEnquirys = await Enquiry.find();
        res.json(getEnquirys);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createEnquiry, updateEnquiry, deleteEnquiry, getaEnquiry, getAllEnquiry };