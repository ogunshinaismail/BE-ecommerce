const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    product: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'CartItem', 
        required: true 
    }],
    shipping_address_one: { 
        type: String, 
        required: true, 
    },
    shipping_address_two: { 
        type: String, 
    },
    city: { 
        type: String, 
        required: true, 
    },
    zip: { 
        type: String, 
        required: true, 
    },
    country: { 
        type: String, 
        required: true, 
    },
    phone_number: { 
        type: String, 
        required: true, 
    },
    total_price: { 
        type: String, 
        required: true, 
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
    date_ordered: {
        type: Date, 
        default: Date.now 
    }
});

// const cartSchema = new Schema({
//     user: { 
//         type: Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true, 
//         unique: true 
//     },
//     items: [cartItemSchema],
//     updated_at: { 
//         type: Date, 
//         default: Date.now 
//     },
// });

cartSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
