const express = require('express');
const {addProductToCart
    ,getLoggedCart
    ,RemoveProductFromCart
    ,clearCart
    ,updateCartItemQuantity,applyCouponToCart} = require('../services/cartService');

const { protect ,allowTo } = require('../services/authService');

const router = express.Router();

router.use(protect,allowTo("user"))


router.route("/").post(addProductToCart)
                    .get(getLoggedCart)
                    .delete(clearCart)

router.route("/applyCoupon").put(applyCouponToCart)

router.route("/:id").delete(RemoveProductFromCart)
                    .put(updateCartItemQuantity)




module.exports=router;