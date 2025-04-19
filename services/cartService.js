const CartModel=require('../models/cartModel');
const ProductModel=require('../models/productModel');
const couponModel=require('../models/couponModel');
const GlobalErrorHandler = require('../utils/apiError');
const {asyncHandler}=require('../middlewares/asyncHandler');

//calc total price
const calcTotalPrice = (cart)=>{
    // calculate total price 
    let totalPrice=0;
    cart.cartItems.forEach(element => {
        totalPrice+=element.price*element.quantity;
    });
    return totalPrice;
}


// @desc add product to user cart
// @route post /api/cart
// @access private
exports.addProductToCart=asyncHandler(async(req,res,next)=>{
    const {user}=req
    const product = await ProductModel.findById(req.body.productId);
    // 1) get logged user cart
    let cart = await CartModel.findOne({user:user._id});

    // if user don't have a cart , create one then add the product
    if(!cart){
        cart = await CartModel.create({
            user:user._id,
            cartItems:[{
                productId:req.body.productId,
                color:req.body.color,
                price:product.price,
            }]
        })
    }
    // if user has a cart , check if product exist , if exist with same color just update the quantity
    else{
        const productIndex = cart.cartItems.findIndex(
            item => item.productId.toString()=== req.body.productId && item.color ===req.body.color
        );
        if(productIndex>-1){
            const cartItem = cart.cartItems[productIndex];
            cartItem.quantity+=1;
            cart.cartItems[productIndex]=cartItem;
        }
        // if product not exist, push product to cart
        else{
            cart.cartItems.push({
                productId:req.body.productId,
                color:req.body.color,
                price:product.price,
            })
        }
    }

    // set total price to cart
    cart.totalPrice=calcTotalPrice(cart);

    // save cart
    await cart.save();

    res.status(200).json({status:"SUCCESS",cart});



})

// @desc remove product from user cart
// @route delete /api/cart/:id
// @access private
exports.RemoveProductFromCart=asyncHandler(async(req,res,next)=>{
    const {user}=req
    // 1) get logged user cart
    const cart = await CartModel.findOneAndUpdate({user:user._id},{
        $pull:{cartItems:{_id:req.params.id}}
    },{new:true});
    
    // set total price to cart
    cart.totalPrice=calcTotalPrice(cart);

    // save cart
    await cart.save();

    res.status(200).json({status:"SUCCESS",cart});



})

// @desc update cart item quantity
// @route put /api/cart/:id
// @access private
exports.updateCartItemQuantity=asyncHandler(async(req,res,next)=>{
    const {user}=req
    const itemId = req.params.id;
    const {newQuantity} = req.body;
    
    // 1) get logged user cart and update quantity
    const cart = await CartModel.findOne({user:user._id});
    if(!cart)  return next(new GlobalErrorHandler("cart not found",404));

    // find item
    const itemIndex = cart.cartItems.findIndex(
        item => item._id.toString()=== itemId);
    if(!(itemIndex>-1)) return next(new GlobalErrorHandler("item not found",404));

    //update item quantity
    cart.cartItems[itemIndex].quantity = newQuantity;
    
    // set total price to cart
    cart.totalPrice=calcTotalPrice(cart);

    // save cart
    await cart.save();

    res.status(200).json({status:"SUCCESS",cart});



})

// @desc clear user cart
// @route delete /api/cart
// @access private
exports.clearCart=asyncHandler(async(req,res,next)=>{
    const {user}=req
    const cart = await CartModel.findOneAndDelete({user:user._id});

    res.status(204).json({status:"SUCCESS",message:"cart cleared"});



})

// @desc get logged user cart
// @route get /api/cart
// @access private
exports.getLoggedCart=asyncHandler(async(req,res,next)=>{

    const {user}=req;
    const cart = await CartModel.findOne({user:user._id});
    if(!cart)  return next(new GlobalErrorHandler("cart not found",404));
    res.status(200).json({status:"SUCCESS",numberOfItems:cart.cartItems.length,cart});



})


// @desc apply coupon to cart
// @route put /api/cart/applyCoupon
// @access private
exports.applyCouponToCart=asyncHandler(async(req,res,next)=>{
    const {user}=req;
    const {coupon}=req.body;
    
    // get logged user cart
    const cart = await CartModel.findOne({user:user._id});
    if(!cart)  return next(new GlobalErrorHandler("cart not found",404));

        // get coupon from db and check if valid
        const couponExist = await couponModel.findOne({title:coupon , expire:{$gt:Date.now()}});
        if(!couponExist)  return next(new GlobalErrorHandler("coupon not found or expired",404));
        
        const newPrice = cart.totalPrice - ((cart.totalPrice*couponExist.discount)/100);
        cart.totalPriceAfterDiscount=newPrice

        // save cart
        await cart.save();

        res.status(200).json({status:"SUCCESS",message:"coupon applied",cart});




})