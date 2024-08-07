
const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/auth.model'); 

const getOrder = async (req, res) => {
    const orderList = await Cart.find();
    if(!orderList) {
        res.status(500).json({success: true})
    };
    res.send(orderList);
}

const postOrder = async (req, res) => {
    try {
        const cart = await Cart.create(req.body);
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports= {
    getOrder,
    postOrder
}