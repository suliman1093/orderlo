const  mongoose  = require("mongoose");

const CouponSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'coupon title is required'],
        unique:true,
        trim:true,
    },
    expire:{
        type:Date,
        required:[true,'coupon expire date is required'],
    },
    discount:{
        type:Number,
        required:[true,'coupon discount is required'],
    },

},{timestamps:true})





const CouponModel = mongoose.model("Coupon",CouponSchema);
module.exports= CouponModel;
