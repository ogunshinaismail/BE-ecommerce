const express = require("express")
const route = express.Router()
const { getCategory, getCategoryById, createCategory, deleteCategory, updateCategory } = require("../controllers/category.controller")
const { isUserLoggedIn, adminsOnly } = require("../middlewares/middlewares")

// route.use(isUserLoggedIn)

route.get('/', getCategory)
route.get('/:id', getCategoryById)
route.patch('/:id', isUserLoggedIn, adminsOnly, updateCategory)
route.post('/', isUserLoggedIn, adminsOnly, createCategory)
route.delete('/:id', isUserLoggedIn, adminsOnly, deleteCategory)

module.exports = route