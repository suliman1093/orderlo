const express = require('express');
const {getCoupons
    ,getCoupon
    ,createCoupon
    ,UpdateCoupon
    ,deleteCoupon} = require('../services/couponService');

const { protect ,allowTo } = require('../services/authService');

const router = express.Router();

router.route("/").post(protect
                        ,allowTo("admin")
                        ,createCoupon)

router.route("/").get(protect
                        ,allowTo("admin")
                        ,getCoupons)

                    
router.route("/:id").delete(protect
                        ,allowTo("admin")
                        ,deleteCoupon)

router.route("/:id").put(protect
                        ,allowTo("admin")
                        ,UpdateCoupon)

router.route("/:id").get(protect
                        ,allowTo("admin")
                        ,getCoupon)

module.exports=router;