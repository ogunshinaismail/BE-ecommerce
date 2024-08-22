const express = require("express")
const { isUserLoggedIn } = require("../middlewares/middlewares")
const { getShipping, getShippingById, createShipping, updateShipping } = require("../controllers/shipping.controller")
const route = express.Router()

route.get('/', isUserLoggedIn, getShipping)
route.get('/:id', isUserLoggedIn, getShippingById)
route.post('/', isUserLoggedIn, createShipping)
route.patch('/', isUserLoggedIn, updateShipping)

module.exports = route