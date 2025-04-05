const Factory = require('./handlersFactory');
const SubCategoryModel = require('../models/subCategoryModel');



exports.createFilterObj=(req,res,next)=>{
        let filterObj = {};
        if(req.params.categoryId)
                filterObj = {category:req.params.categoryId};
        req.filteration = filterObj;
        next();
};

// @desc get list of subcategories
// @route get /api/subcategories
// @access public
exports.getAllSubCategories=Factory.GetAll(SubCategoryModel,"SubCategoryModel");



// @desc get specific subcategory
// @route get /api/subcategories/:id
// @access public
exports.getSubCategory=Factory.GetOne(SubCategoryModel);






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
exports.createSubCategory= Factory.CreateOne(SubCategoryModel);

// @desc update specific subcategory
// @route put /api/subcategories/:id
// @access private
exports.UpdateSubCategory=Factory.UpdateOne(SubCategoryModel);

// @desc delete subcategory by id
// @route delete /api/subcategories
// @access private 
exports.deleteSubCategory=Factory.DeleteOne(SubCategoryModel);