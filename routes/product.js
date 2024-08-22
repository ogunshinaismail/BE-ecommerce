const express = require("express")
const route = express.Router()
const { getProduct, getProductById, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller")
const { isUserLoggedIn, adminsOnly } = require("../middlewares/middlewares")

// route.use(isUserLoggedIn)

route.get('/', getProduct)
route.get('/:id', getProductById)
route.post('/', isUserLoggedIn, adminsOnly, createProduct)
route.patch('/:id', isUserLoggedIn, adminsOnly, updateProduct)
route.delete('/:id', isUserLoggedIn,adminsOnly, deleteProduct) 

module.exports = route