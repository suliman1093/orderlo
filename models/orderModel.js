const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Order must belong to a user"],
    },
    cartItems:[{
        productId:{
            type:mongoose.Schema.ObjectId,
            ref:"Product"
        },
        color:String,
        quantity:Number,
        price:Number,
    }],
    taxPrice:{
        type:Number,
        default:0,
    },
    shippingPrice:{
        type:Number,
        default:0,
    },
    shippingAddress:{
        details:String,
        phone:String,
        city:String,
        postalCode:String,
    },
    totalOrderPrice:Number,
    paymentMethod:{
        type:String,
        enum:["card","cash"],
        default:"cash",
    },
    isPaid:{
        type:Boolean,
        default:false,
    },
    paidAt:Date,
    isDelivered:{
        type:Boolean,
        default:false,
    },
    deliveredAt:Date,

},{ timestamps: true });

// populate user and product in cartItems just in get specific order
orderSchema.pre(/^find/,function(next){

    this.populate({path:"user",select:"name image"});
    this.populate({path:"cartItems.productId",select:"title"});
    next();
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
