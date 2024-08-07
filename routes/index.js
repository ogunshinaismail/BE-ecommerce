const express = require("express")
const route = express.Router()

route.get('/', async (req, res) => {
    try {
        res.status(200).json({message: "success"})
    } catch (error) {
        res.status(400).json({message: "failed"})
    }
})

module.exports = route