const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const CategoryModel=require('../models/categoryModel');
const Factory = require('./handlersFactory');
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');



//1-)category image upload
exports.uploadCategoryImage = uploadSingleImage('image');

//2-)image proccecing before save the image 
exports.reSizeImages= async(req,res,next)=>{
    if(req.file){
    const fileName = `category-${uuidv4()}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
    .resize(1000,1000)
    .toFormat('jpeg')
    .toFile(`uploads/categories/${fileName}`);
    req.body.image = fileName;}
    next();
    
}



//3-) handlers

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






