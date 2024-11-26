const express = require("express")
const { createTest, notification, DateManipulation, views, createViews, getAllView } = require("../controllers/test.controller")
const route = express.Router()

route.get('/', notification) 
route.post('/', createTest)
route.post('/date', DateManipulation)
route.get('/views', getAllView) 
route.post('/views', createViews)
route.post('/views/:id', views)

module.exports = route