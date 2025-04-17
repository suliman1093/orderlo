const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const ProductModel=require('../models/productModel');
const Factory = require('./handlersFactory');
const { uploadMixOfImages } = require('../middlewares/uploadImageMiddleware');

//1-)product images upload

exports.uploadProductImages = uploadMixOfImages(
    { name: "imageCover", maxCount: 1 },
    { name: "images", maxCount: 5 }
);

exports.reSizeProductImages= async(req,res,next)=>{
    // image proccecing for image cover
    if(req.files.imageCover){
    const ImageCoverfileName = `product-${uuidv4()}-${Date.now()}-cover.jpeg`
    await sharp(req.files.imageCover[0].buffer)
    .resize(1000,1000)
    .toFormat('jpeg')
    .toFile(`uploads/products/${ImageCoverfileName}`);
    req.body.imageCover = ImageCoverfileName;}

    //image proccecing for product images
    if(req.files.images){
        const images=[];
        
        await Promise.all(req.files.images.map(async(image,index)=>{
            const ImagefileName = `product-${uuidv4()}-${Date.now()}-${index}.jpeg`
            await sharp(image.buffer)
            .resize(1000,1000)
            .toFormat('jpeg')
            .toFile(`uploads/products/${ImagefileName}`);
            images.push(ImagefileName);
        }))
        
        req.body.images = images;
    }

    next();
    
}





// @desc get list of products
// @route get /api/products
// @access public
exports.getAllProducts=Factory.GetAll(ProductModel,"ProductModel");


// @desc get specific product
// @route get /api/product/:id
// @access public
exports.getProduct=Factory.GetOne(ProductModel,"reviews");


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