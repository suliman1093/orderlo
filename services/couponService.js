const couponModel=require('../models/couponModel');
const Factory = require('./handlersFactory');




// @desc get list of coupons
// @route get /api/coupons
// @access private
exports.getCoupons=Factory.GetAll(couponModel,"couponModel");

// @desc get specific coupon
// @route get /api/coupons/:id
// @access private
exports.getCoupon=Factory.GetOne(couponModel);

// @desc creat new coupon
// @route post /api/coupons
// @access private
exports.createCoupon= Factory.CreateOne(couponModel);

// @desc update specific coupon
// @route put /api/coupons/:id
// @access private
exports.UpdateCoupon=Factory.UpdateOne(couponModel);

// @desc delete coupon by id
// @route delete /api/coupons
// @access private 
exports.deleteCoupon=Factory.DeleteOne(couponModel);