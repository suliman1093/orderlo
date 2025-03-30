const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'too short product title'],
        maxlength:[100,'too long product title'],
    },
    slug:{
        type:String,
        required:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
        minlength:[20,'too short product description'],
    },
    quantity:{
        type:Number,
        required:[true,'product quantity is required'],
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        max:[20,'too long product price'],
    },
    priceAfterDiscount:{
        type:Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required:[true,'image cover is required']
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'product must be belong to category'],
    },
    subCategory:[{
        type:mongoose.Schema.ObjectId,
        ref:'SubCategory',
    }],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand'
    },
    ratingsAverage:{
        type:Number,
        min:[1,'rating average must be 1 or greater '],
        max:[5,'max rating is 5']
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
},{timestamps:true});

const ProductyModel = mongoose.model("Product",ProductSchema);
module.exports= ProductyModel;