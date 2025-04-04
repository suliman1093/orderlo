const slugify = require('slugify');
const BrandModel=require('../models/brandModel');
const {asyncHandler}=require('../middlewares/asyncHandler');
const GlobalErrorHandler = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');

// @desc get list of brands
// @route get /api/brands
// @access public
exports.getAllBrands=asyncHandler(async(req,res,next)=>{
        const countDocs = await BrandModel.countDocuments();
        const apiFeatures = new ApiFeatures(BrandModel.find(), req.query)
        .search(BrandModel)
        .filter()
        .sort()
        .limitFields()
        .paginate(countDocs)
        .buildQuery();
        const {paginateResult , mongooseQuery} = apiFeatures;
        const Brands = await mongooseQuery;
        if(!Brands)
                return next(new GlobalErrorHandler("there is no brands yet",404));
        res.status(200).json({status:"SUCCESS",result:paginateResult,data:{Brands}});
});


// @desc get specific brand
// @route get /api/brands/:id
// @access public
exports.getBrand=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const brand = await BrandModel.findById(id);
        if(!brand)
                return next(new GlobalErrorHandler("brand not found",404));
        res.status(200).json({status:"SUCCESS",data:{brand}});
});


// @desc creat new brand
// @route post /api/brands
// @access private
exports.createBrand= asyncHandler(async(req,res)=>{
        const {name} = req.body;
        const newBrand = new BrandModel({name,slug:slugify(name)})
        await newBrand.save();
        res.status(201).json({status:"SUCCESS",data:{newBrand}})
});


// @desc update specific brand
// @route put /api/brands/:id
// @access private
exports.UpdateBrand=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const {name} = req.body;

        const newBrand = await BrandModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        if(!newBrand)
                return next(new GlobalErrorHandler("brand not found",404));
        res.status(200).json({status:"SUCCESS",data:{newBrand}});
});


// @desc delete brand by id
// @route delete /api/brands
// @access private 
exports.deleteBrand=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const deletedBrand = await BrandModel.findByIdAndDelete(id);
        if(!deletedBrand)
                return next(new GlobalErrorHandler("brand not found",404));
        res.status(200).json({status:"SUCCESS",msg:"deleted"});
});