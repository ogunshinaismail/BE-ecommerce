const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartItemSchema = new Schema({
    product: { 
        type: Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
    },
    quantity: { 
        type: Number, 
        required: true, 
        min: 1 
    },
});

const cartSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true, 
        unique: true 
    },
    items: [cartItemSchema],
    updated_at: { 
        type: Date, 
        default: Date.now 
    },
});

cartSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
