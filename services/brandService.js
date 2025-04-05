const BrandModel=require('../models/brandModel');
const Factory = require('./handlersFactory');

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