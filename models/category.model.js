const mongoose = require("mongoose");
const { Schema } = mongoose

const CategorySchema = Schema(
    {
        name: { 
            type: String, 
            required: true, unique: true 
        }
    },
    {
        timestamps: true
    }
)

const Category = mongoose.model("Category", CategorySchema);
module.exports= Category;