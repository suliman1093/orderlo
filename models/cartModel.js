const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    cartItems:[{
        productId:{
            type:mongoose.Schema.ObjectId,
            ref:"Product"
        },
        color:String,
        quantity:{
            type:Number,
            default:1
        },
        price:Number,
    }],
    totalPrice:Number,
    totalPriceAfterDiscount:Number,
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User"
    },

},{timestamps:true});


const CartModel = mongoose.model("Cart",CartSchema);
module.exports= CartModel;