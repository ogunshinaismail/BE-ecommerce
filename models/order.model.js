const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderSchema = new Schema({
    cart: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Cart', 
        required: true 
    }],
    shipping_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Shipping', 
        required: true 
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

// cartSchema.pre('save', function(next) {
//   this.updated_at = Date.now();
//   next();
// });

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;
