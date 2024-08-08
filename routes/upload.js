const express = require("express");
const { isUserLoggedIn } = require("../middlewares/middlewares");
const route = express.Router();
const uploadFiledata = require("../middlewares/multer");
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    secure: true
});
// console.log(cloudinary.config());

route.post("/", uploadFiledata.single('image'), function(req, res) {
    try {
        cloudinary.uploader.upload(req.file.path, function (err, result) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: "Error"
                })
            }
    
            const { secure_url } = result
    
            res.status(200).json({
                success: true,
                message: "Uploaded",
                url: secure_url
            })
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

module.exports = route