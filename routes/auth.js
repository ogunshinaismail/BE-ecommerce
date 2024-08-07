const express = require("express")
const { Register, Login, Profile } = require("../controllers/auth.controller")
const { isUserLoggedIn } = require("../middlewares/middlewares")
const route = express.Router()

route.post('/register', Register)
route.post('/login', Login)
route.get('/profile', isUserLoggedIn, Profile)

module.exports = route