const ProductModel=require('../models/productModel');
const Factory = require('./handlersFactory');



// @desc get list of products
// @route get /api/products
// @access public
exports.getAllProducts=Factory.GetAll(ProductModel,"ProductModel");


// @desc get specific product
// @route get /api/product/:id
// @access public
exports.getProduct=Factory.GetOne(ProductModel);


// @desc creat new product
// @route post /api/products
// @access private
exports.createProduct= Factory.CreateOne(ProductModel);


// @desc update specific product
// @route put /api/products/:id
// @access private
exports.UpdateProduct=Factory.UpdateOne(ProductModel);


// @desc delete product by id
// @route delete /api/products
// @access private 
exports.deleteProduct=Factory.DeleteOne(ProductModel);