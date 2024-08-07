const Category = require('../models/category.model')

const getCategory = async(req, res) => {
    try {
        const category = await Category.find({});
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getCategoryById = async(req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id);
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updateCategory = async(req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndUpdate(id);
        if(!category) res.status(404).json({message: "category not available"})
        const updatedCategory = await Category.findById(id);
        res.status(200).json({
            message: "category updated succesfully",
            updatedCategory
        })
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const createCategory = async(req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(200).json(category)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const deleteCategory = async(req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findByIdAndDelete(id);
        if(!category) res.status(404).json({message: "category not found"})
        res.status(200).json({message: "category deleted successfully"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports= {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}