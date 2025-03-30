const slugify = require('slugify');
const SubCategoryModel = require('../models/subCategoryModel');
const {asyncHandler}=require('../middlewares/asyncHandler');
const GlobalErrorHandler = require('../utils/apiError');


// @desc get list of subcategories
// @route get /api/subcategories
// @access public
exports.getAllSubCategories=asyncHandler(async(req,res,next)=>{
        console.log(req.params.categoryId);
        let filter = {};
        if(req.params.categoryId)
                filter = {category:req.params.categoryId}
        const limit = +req.query.limit||2;
        const page = +req.query.page||1;
        const skip = limit*page-limit;
        const subCategories = await SubCategoryModel.find(filter).limit(limit).skip(skip);
        if(!subCategories)
                return next(new GlobalErrorHandler("there is no subcategories yet",404));
        res.status(200).json({status:"SUCCESS",page:page,data:{subCategories}});
});



// @desc get specific subcategory
// @route get /api/subcategories/:id
// @access public
exports.getSubCategory=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const subCategory = await SubCategoryModel.findById(id)
        .populate({path:'category',select:'name-_id'});
        if(!subCategory)
                return next(new GlobalErrorHandler("subcategory not found",404));
        res.status(200).json({status:"SUCCESS",data:{subCategory}});
});


// @desc middleware for nested route to create subcategory from category '/:categoryId/subcategories'
// @route post
// @access private
exports.setCategoryIdToBody=(req,res,next)=>{
        //nested route
        if(!req.body.category) req.body.category = req.params.categoryId;
        next();
}


// @desc creat new subcategory
// @route post /api/subcategories
// @access private
exports.createSubCategory= asyncHandler(async(req,res)=>{
        const {name , category} = req.body;
        const newSubCategory = new SubCategoryModel({name,slug:slugify(name),category})
        await newSubCategory.save();
        res.status(201).json({status:"SUCCESS",data:{newSubCategory}})
});

// @desc update specific subcategory
// @route put /api/subcategories/:id
// @access private
exports.UpdateSubCategory=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const {name , category} = req.body;
        const newSubCategory = await SubCategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name),category},{new:true});
        if(!newSubCategory)
                return next(new GlobalErrorHandler("subcategory not found",404));
        res.status(200).json({status:"SUCCESS",data:{newSubCategory}});
});

// @desc delete subcategory by id
// @route delete /api/subcategories
// @access private 
exports.deleteSubCategory=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const deletedSubCategory = await SubCategoryModel.findByIdAndDelete(id);
        if(!deletedSubCategory)
                return next(new GlobalErrorHandler("subcategory not found",404));
        res.status(200).json({status:"SUCCESS",msg:"deleted"});
});