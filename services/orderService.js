const {asyncHandler}=require('../middlewares/asyncHandler');
const OrderModel = require("../models/orderModel");
const Factory = require('./handlersFactory');
const ApiError = require("../utils/apiError");
const CartModel = require("../models/cartModel");
const ProductModel = require("../models/productModel");


// @desc create cash order
// @route post /api/orders/:cartId
// @access private
exports.createCashOrder = asyncHandler(async(req,res,next)=>{
    const taxPrice = 0;
    const shippingPrice = 0;
    // 1-) get cartId from req.params
    const {cartId} = req.params;
    const {user} = req;
    const cart = await CartModel.findById(cartId);
    if(!cart)return next(new ApiError("Cart not found",404));
    // 2-) get order price depend on cart total price after check if coupon is applied
    const cartPrice = cart.totalPriceAfterDiscount
        ?cart.totalPriceAfterDiscount
        :cart.totalPrice;
    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;
    // 3-) create order with default payment method
    const order = await OrderModel.create({
        user:user._id,
        cartItems:cart.cartItems,
        taxPrice,
        shippingPrice,
        totalOrderPrice,
        shippingAddress:req.body.shippingAddress
        });
    // 4-) update quantity in stock and sold of product
    if(order){
        const bulkOption = cart.cartItems.map(item=>{
            return {
                updateOne: {
                    filter: { _id: item.productId },
                    update: { $inc: { quantity: -item.quantity, sold: +item.quantity } }
                }
            }
        });
        await ProductModel.bulkWrite(bulkOption,{});
        // 5-) clear cart
        await CartModel.findByIdAndDelete(cartId);
        // 6-) send success response
        res.status(201).json({status:"success",order});
    }
    else{
        return next(new ApiError("Order not created",400));
    }

})


// @desc middleware to get order for user in get all orders
exports.createFilterObj=(req,res,next)=>{
    const {user} = req;
    let filterObj = {};
    if(user.role === "user"){
            filterObj = {user:user._id};
    }
    req.filteration = filterObj;
    next();
};

// @desc get all orders
// @route get /api/orders
// @access private [ user - admin]
exports.getOrders = Factory.GetAll(OrderModel,"orders");


// @desc middleware to check if user is owner of order when get specific order
exports.checkIfUserIsOwnerOfOrder = asyncHandler(async(req,res,next)=>{
    if(req.user.role === "user"){
        const {id} = req.params;
        const order = await OrderModel.findById(id);
        if(!order)return next(new ApiError("Order not found",404));
        if(order.user.toString() !== req.user._id.toString())return next(new ApiError("you can't access this order",403));
    }
    next();
});

// @desc get specific order
// @route get /api/orders/:id
// @access private [ user - admin]
exports.getOrder = Factory.GetOne(OrderModel);

// @desc update order to paid
// @route put /api/orders/:id/pay
// @access private [admin]
exports.updateOrderToPaid = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const order = await OrderModel.findByIdAndUpdate(id,{isPaid:true,paidAt:Date.now()},
        {new:true});
    res.status(200).json({status:"success",order});
});


// @desc update order to delivered
// @route put /api/orders/:id/deliver
// @access private [admin]
exports.updateOrderToDelivered = asyncHandler(async(req,res,next)=>{
    const {id} = req.params;
    const order = await OrderModel.findByIdAndUpdate(id,{isDelivered:true,deliveredAt:Date.now()},
        {new:true});
    res.status(200).json({status:"success",order});
});

