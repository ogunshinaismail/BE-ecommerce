const Order = require("../models/order.model")

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getOrders = async (req, res) => {
    const { user_id } = req.decoded
    try {
        const orders = await Order.find({user: user_id})
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const getOrderById = async (req, res) => {
    const { id } = req.params
    try {
        const orders = await Order.findById(id)
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const createOrder = async (req, res) => {
    try {
        const orders = await Order.create(req.body)
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const updateStatus = async (req, res) => {
    const { id } = req.params
    // const { status } = req.body
    try {
        const orders = await Order.findByIdAndUpdate(id, req.body)
        if(!orders) res.status(404).json({message: "order not found"})
        const updatedOrder = await Order.findById(id)
        res.status(200).json(updatedOrder)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = {
    getAllOrders,
    getOrders,
    createOrder,
    getOrderById,
    updateStatus
}