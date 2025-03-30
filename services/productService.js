const slugify = require('slugify');
const ProductModel=require('../models/productModel');
const {asyncHandler}=require('../middlewares/asyncHandler');
const GlobalErrorHandler = require('../utils/apiError');

// @desc get list of products
// @route get /api/products
// @access public
exports.getAllProducts=asyncHandler(async(req,res,next)=>{
        const limit = +req.query.limit||2;
        const page = +req.query.page||1;
        const skip = limit*page-limit;
        const products = await ProductModel.find().limit(limit).skip(skip);
        if(!products)
                return next(new GlobalErrorHandler("there is no products yet",404));
        res.status(200).json({status:"SUCCESS",page:page,data:{products}});
});


// @desc get specific product
// @route get /api/product/:id
// @access public
exports.getProduct=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const product = await ProductModel.findById(id);
        if(!product)
                return next(new GlobalErrorHandler("product not found",404));
        res.status(200).json({status:"SUCCESS",data:{product}});
});


// @desc creat new product
// @route post /api/products
// @access private
exports.createProduct= asyncHandler(async(req,res)=>{
        req.body.slug = slugify(req.body.title);
        const newProduct = new ProductModel(req.body)
        await newProduct.save();
        res.status(201).json({status:"SUCCESS",data:{newProduct}})
});


// @desc update specific product
// @route put /api/products/:id
// @access private
exports.UpdateProduct=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        req.body.slug = slugify(req.body.title);
        const newProduct = await ProductModel.findByIdAndUpdate(id,req.body,{new:true});
        if(!newProduct)
                return next(new GlobalErrorHandler("Product not found",404));
        res.status(200).json({status:"SUCCESS",data:{newProduct}});
});


// @desc delete product by id
// @route delete /api/products
// @access private 
exports.deleteProduct=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const deletedproduct = await ProductModel.findByIdAndDelete(id);
        if(!deletedproduct)
                return next(new GlobalErrorHandler("product not found",404));
        res.status(200).json({status:"SUCCESS",msg:"deleted"});
});