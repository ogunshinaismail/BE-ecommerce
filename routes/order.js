const express = require("express")
const { getOrders, getAllOrders, createOrder, getOrderById, updateStatus } = require("../controllers/order.controller")
const { isUserLoggedIn } = require("../middlewares/middlewares")
const route = express.Router()

route.get('/all', isUserLoggedIn, getAllOrders)
route.get('/', isUserLoggedIn, getOrders)
route.get('/:id', isUserLoggedIn, getOrderById)
route.post('/', isUserLoggedIn, createOrder)
route.put('/:id', isUserLoggedIn, updateStatus)

module.exports = route