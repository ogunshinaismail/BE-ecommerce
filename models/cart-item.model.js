const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    product: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    }],
    quantity: { 
        type: Number, 
        required: true,
        min: 1,
    },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports= CartItem;