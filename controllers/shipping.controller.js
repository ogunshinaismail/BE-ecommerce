const Shipping = require("../models/shipping.model")

const getShipping = async (req, res) => {
    const { user_id } = req.decoded
    try {
        const shipping = await Shipping.find({user: user_id})
        res.status(200).json(shipping)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getShippingById = async (req, res) => {
    const { id } = req.params
    try {
        const shipping = await Shipping.findById(id)
        res.status(200).json(shipping)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const createShipping = async (req, res) => {
    try {
        const shipping = await Shipping.create(req.body)
        res.status(200).json(shipping)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updateShipping = async(req, res) => {
    try {
        const { id } = req.params
        const shipping = await Shipping.findByIdAndUpdate(id, req.body);
        if(!shipping) res.status(404).json({message: "shipping not found"})
        const updatedShipping = await Shipping.findById(id);
        res.status(200).json(updatedShipping)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getShipping,
    getShippingById,
    createShipping,
    updateShipping
}