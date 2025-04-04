
const slugify = require('slugify');
const CategoryModel=require('../models/categoryModel');
const {asyncHandler}=require('../middlewares/asyncHandler');
const GlobalErrorHandler = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');


// @desc get list of categories
// @route get /api/categories
// @access public
exports.getAllCategories=asyncHandler(async(req,res,next)=>{
        const countDocs = await CategoryModel.countDocuments();
        const apiFeatures = new ApiFeatures(CategoryModel.find(), req.query)
        .search(CategoryModel)
        .filter()
        .sort()
        .limitFields()
        .paginate(countDocs)
        .buildQuery();
        
        const {paginateResult , mongooseQuery} = apiFeatures;
        const categories = await mongooseQuery;

        if(!categories)
                return next(new GlobalErrorHandler("there is no categories yet",404));
        res.status(200).json({status:"SUCCESS",paginateResult,data:{categories}});
});


// @desc get specific category
// @route get /api/categories/:id
// @access public
exports.getCategory=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const category = await CategoryModel.findById(id);
        if(!category)
                return next(new GlobalErrorHandler("category not found",404));
        res.status(200).json({status:"SUCCESS",data:{category}});
});


// @desc creat new category
// @route post /api/categories
// @access private
exports.createCategory= asyncHandler(async(req,res)=>{
        const {name} = req.body;
        const newCategory = new CategoryModel({name,slug:slugify(name)})
        await newCategory.save();
        res.status(201).json({status:"SUCCESS",data:{newCategory}})
});

// @desc update specific category
// @route put /api/categories/:id
// @access private
exports.UpdateCategory=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const {name} = req.body;

        const newCategory = await CategoryModel.findByIdAndUpdate(id,{name,slug:slugify(name)},{new:true});
        if(!newCategory)
                return next(new GlobalErrorHandler("category not found",404));
        res.status(200).json({status:"SUCCESS",data:{newCategory}});
});

// @desc delete category by id
// @route delete /api/categories
// @access private 
exports.deleteCategory=asyncHandler(async(req,res,next)=>{
        const {id} = req.params;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);
        if(!deletedCategory)
                return next(new GlobalErrorHandler("category not found",404));
        res.status(200).json({status:"SUCCESS",msg:"deleted"});
});