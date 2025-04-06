const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const BrandModel=require('../models/brandModel');
const Factory = require('./handlersFactory');
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');


//1-)brand image upload
exports.uploadBrandImage = uploadSingleImage('image');


//2-)image proccecing before save the image 
exports.reSizeImages= async(req,res,next)=>{
    if(req.file){
    const fileName = `brand-${uuidv4()}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
    .resize(1000,1000)
    .toFormat('jpeg')
    .toFile(`uploads/brands/${fileName}`);
    req.body.image = fileName;}
    next();
}

//3-) handlers

// @desc get list of brands
// @route get /api/brands
// @access public
exports.getAllBrands=Factory.GetAll(BrandModel,"BrandModel");

// @desc get specific brand
// @route get /api/brands/:id
// @access public
exports.getBrand=Factory.GetOne(BrandModel);

// @desc creat new brand
// @route post /api/brands
// @access private
exports.createBrand= Factory.CreateOne(BrandModel);

// @desc update specific brand
// @route put /api/brands/:id
// @access private
exports.UpdateBrand=Factory.UpdateOne(BrandModel);

// @desc delete brand by id
// @route delete /api/brands
// @access private 
exports.deleteBrand=Factory.DeleteOne(BrandModel);