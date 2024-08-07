const mongoose = require("mongoose");
const { Schema } = mongoose

const ProductSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter product name"],
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        description: {
            type: String,
            required: false,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
        },
        image: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model("Product", ProductSchema);
module.exports= Product;