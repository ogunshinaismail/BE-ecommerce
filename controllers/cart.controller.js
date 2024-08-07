const Cart = require('../models/cart.model');
const Product = require('../models/product.model');
const User = require('../models/auth.model'); 

const getCarts = async (req, res) => {
  const { user_id } = req.decoded
  try {
    const cart = await Cart.findOne({user: user_id}).populate('items.product')
    if (!cart)
      return res
        .status(404)
        .send({ status: false, message: "Cart not found for this user" });
    const cartItems = cart.items
    res.status(200).json(cartItems)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

const addItemToCart = async (req, res) => {
  const { user_id } = req.decoded
  const { product_id, quantity } = req.body
    const cart = await Cart.findOne({ user: user_id });
    const product = await Product.findById(product_id);

    try {
        if (!product) throw new Error('Product not found');
          if (cart) {
            // Cart exists, check if product is already in the cart
            const itemIndex = cart.items.findIndex(item => item.product.toString() === product_id);
             
            if (itemIndex > -1) {
              // Product exists in the cart, update the quantity
              cart.items[itemIndex].quantity += quantity;
            } else {
              // Product does not exist in the cart, add it
              cart.items.push({ product: product_id, quantity });
            }
            await cart.save();
            res.status(201).json({
              message: "Item added to cart found",
              cart
            })
          } else {
            // No cart for user, create a new one
            const newCart = new Cart({
              user: user_id,
              items: [{ product: product_id, quantity }],
            });
            await newCart.save();
            res.status(201).json({
              message: "Item added to cart found",
              newCart
            })
          }
    } catch (error) {
      console.log(error)
        res.status(400).json({message: error.message})
    }
  }

const removeCartItem = async(req, res) => {
  const { user_id } = req.decoded;
  const { id } = req.params;

  try {
    const cart = await Cart.findOne({ user: user_id });
    if (!cart) {
      return res
        .status(404)
        .send({ status: false, message: "Cart not found for this user" });
    }
    const itemIndex = cart.items.findIndex(item => item._id.toString() === id);

    if (itemIndex > -1) {
      cart.items.splice(itemIndex, 1);
      await cart.save();
      return res.status(200).json(cart.items).populate('items.product');
    } else {
      return res
        .status(404)
        .send({ status: false, message: "Item not found in the cart" });
    }
  } catch (error) {
      res.status(400).json({message: error.message})
  }
}
 
  module.exports= {
    getCarts,
    addItemToCart,
    removeCartItem,
}