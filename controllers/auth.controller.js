const User = require('../models/auth.model');
const Auth = require('../models/auth.model')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
  
const Register = async(req, res) => {
    const { first_name, last_name, email, password } = req.body
    if(!first_name) return res.status(400).send("first_name is required")
    if(!last_name) return res.status(400).send("last_name is required")
    if(!email) return res.status(400).send("email is required")
    if(!password) return res.status(400).send("password is required")
    
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt)
    try {
        const user = await Auth.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            role: req.body.role,
            password: hashedPassword,
        });
        const { password, ...userDatails } = user._doc;
        res.status(201).json({message: "User created successfully", userDatails})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
 
const Login = async(req, res) => {
    const { email, password } = req.body
    const userDetails = await User.findOne({email: email})
    if(!userDetails) return res.status(404).json("user-not-found")

    const { email: userEmail, password: userPassword, _id, role, first_name, last_name } = userDetails

    const doesPasswordMatch = bcrypt.compareSync(password, userPassword);

    if(!doesPasswordMatch) return res.status(400).json("invalid-credentials")
    try {
        const token = await jwt.sign({
            email: email,
            user_id: _id,
            role: role
        }, secret)
    
        res.status(200).send({
            isRequestSuccesful: true,
            message: "user logged in successfully",
            token,
            user_profile: {
                _id,
                first_name,
                last_name,
                email: userEmail,
                role
            }
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
} 

const Profile = async (req, res) => {
    try {
        const { user_id } = req.decoded
        const user = await User.findById(user_id, "-password");
        res.status(200).json(user)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports= {
    Register,
    Login,
    Profile
}