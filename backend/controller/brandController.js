const Brand = require('../models/brandModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');

const createBrand = asyncHandler(async (req, res) => {
    try {
        const newBrand = await Brand.create(req.body);
        res.json(newBrand);
    } catch (error) {
        throw new Error(error);
    }
});
const updateBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedBrand);
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand);
    } catch (error) {
        throw new Error(error);
    }
});

const getaBrand = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaBrand = await Brand.findById(id);
        res.json(getaBrand);
    } catch (error) {
        throw new Error(error);
    }
});
const getAllBrand = asyncHandler(async (req, res) => {
    try {
        const getCategories = await Brand.find();
        res.json(getCategories);
    } catch (error) {
        throw new Error(error);
    }
});
module.exports = { createBrand, updateBrand, deleteBrand, getaBrand, getAllBrand };