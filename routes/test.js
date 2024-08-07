const express = require("express")
const { createTest, notification, DateManipulation } = require("../controllers/test.controller")
const route = express.Router()

route.get('/', notification) 
route.post('/', createTest)
route.post('/date', DateManipulation)

module.exports = route