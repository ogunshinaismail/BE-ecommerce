const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        first_name: {
            type: String,
            required: [true, 'first_name is required'],
        },
        last_name: {
            type: String,
            required:[true, 'last_name is required'],
        },
        email: {
            type: String,
            required: [true, 'email is required'],
            unique: true
        },
        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user"
        },
        password: {
            type: String,
            required: [true, 'password is required'],
        },
        active: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("Users", UserSchema);
module.exports= User;