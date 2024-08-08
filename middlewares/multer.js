const multer = require("multer");

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const uploadFiledata = multer({storage: storage});

module.exports = uploadFiledata