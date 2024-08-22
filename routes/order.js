const express = require("express")
const { getOrders, getAllOrders, createOrder, getOrderById, updateStatus } = require("../controllers/order.controller")
const { isUserLoggedIn, adminsOnly } = require("../middlewares/middlewares")
const route = express.Router()

route.get('/all', isUserLoggedIn, adminsOnly, getAllOrders)
route.get('/', isUserLoggedIn, getOrders)
route.get('/:id', isUserLoggedIn, getOrderById)
route.post('/', isUserLoggedIn, createOrder)
route.patch('/:id', isUserLoggedIn, adminsOnly, updateStatus)

module.exports = route