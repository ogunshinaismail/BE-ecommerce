const express = require('express')
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")
// const Product = require("./models/product.model")
const port = process.env.PORT || 8000
const app = express()
const productRoute = require("./routes/product")
const authRoute = require("./routes/auth")
const categoryRoute = require("./routes/category")
const cartRoute = require("./routes/cart")
const orderRoute = require("./routes/order")
const upload = require("./routes/upload")
const testRoute = require("./routes/test")
const index = require("./routes/index")

const connect = mongoose.connect(process.env.mongoDBURL)

const corsOptions = {
    origin: "http://localhost:3000" || "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials",
    ],
};

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))
app.use("/", index)
app.use("/v1/auth", authRoute)
app.use("/v1/products", productRoute)
app.use("/v1/category", categoryRoute)
app.use("/v1/cart", cartRoute)
app.use("/v1/orders", orderRoute)
app.use("/v1/upload", upload)
app.use("/v1/test", testRoute)

connect.then(() => {
    console.log("connected to db succesfully")
    app.listen(port, () => {
        console.log("Listening to port " + port);
    })
}).catch(error => {
    console.log("could not connect to db: " + error)
})


// app.use(express.json())