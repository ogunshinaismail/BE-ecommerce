const express = require("express")
const route = express.Router()
const { getCarts, addItemToCart, removeCartItem } = require("../controllers/cart.controller")
const { getOrder, postOrder } = require("../controllers/cart-item.controller")
const { isUserLoggedIn } = require("../middlewares/middlewares")


route.get('/', isUserLoggedIn, getCarts)
route.post('/', isUserLoggedIn, addItemToCart)
route.get('/order', isUserLoggedIn, getOrder)
route.post('/order', isUserLoggedIn, postOrder)
route.patch('/:id', isUserLoggedIn, removeCartItem)

module.exports = route