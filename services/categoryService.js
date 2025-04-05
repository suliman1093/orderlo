const CategoryModel=require('../models/categoryModel');
const Factory = require('./handlersFactory');

// @desc get list of categories
// @route get /api/categories
// @access public
exports.getAllCategories=Factory.GetAll(CategoryModel,"CategoryModel");


// @desc get specific category
// @route get /api/categories/:id
// @access public
exports.getCategory=Factory.GetOne(CategoryModel);


// @desc creat new category
// @route post /api/categories
// @access private
exports.createCategory= Factory.CreateOne(CategoryModel);

// @desc update specific category
// @route put /api/categories/:id
// @access private
exports.UpdateCategory=Factory.UpdateOne(CategoryModel);

// @desc delete category by id
// @route delete /api/categories
// @access private 
exports.deleteCategory=Factory.DeleteOne(CategoryModel);