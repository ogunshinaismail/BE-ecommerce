const mongoose = require('mongoose');
const { Schema } = mongoose;

const ShippingSchema = new Schema({
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
    state: { 
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
    status: { 
        type: String, 
        enum: ["pending", "approved", "shipping", "awaiting arrival", "delivered"],
        default: "pending"
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
});

const Shipping = mongoose.model('Shipping', ShippingSchema);
module.exports = Shipping;
