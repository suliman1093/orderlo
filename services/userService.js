const bcrypt = require('bcrypt');
const sharp = require('sharp');
const { v4: uuidv4 } = require('uuid');
const UserModler=require('../models/userModel');
const Factory = require('./handlersFactory');
const {uploadSingleImage} = require('../middlewares/uploadImageMiddleware');
const GlobalErrorHandler = require('../utils/apiError');
const {asyncHandler}=require('../middlewares/asyncHandler');

//1-)brand image upload
exports.uploadUserImage = uploadSingleImage('profileImg');


//2-)image proccecing before save the image 
exports.reSizeImages= async(req,res,next)=>{
    if(req.file){
    const fileName = `user-${uuidv4()}-${Date.now()}.jpeg`
    await sharp(req.file.buffer)
    .resize(1000,1000)
    .toFormat('jpeg')
    .toFile(`uploads/users/${fileName}`);
    req.body.profileImg = fileName;}
    next();
}

//3-) handlers

// @desc get list of users
// @route get /api/users
// @access private
exports.getAllUsers=Factory.GetAll(UserModler,"UserModler");

// @desc get specific user
// @route get /api/users/:id
// @access private
exports.getUser=Factory.GetOne(UserModler);

// @desc creat new user
// @route post /api/users
// @access private
exports.createUser= Factory.CreateOne(UserModler);

// @desc update specific user
// @route put /api/users/:id
// @access private
exports.UpdateUser=asyncHandler(async(req,res,next)=>{

        const newDoc = await UserModler.findByIdAndUpdate(req.params.id,{
            name:req.body.name,
            slug:req.body.slug,
            email:req.body.email,
            profileImg:req.body.profileImg,
            role:req.body.role,
        },{new:true});
        if(!newDoc)
                return next(new GlobalErrorHandler("Doc not found",404));
        res.status(200).json({status:"SUCCESS",data:{newDoc}});
    })

exports.UpdateUserPassword=asyncHandler(async(req,res,next)=>{
    const newDoc = await UserModler.findByIdAndUpdate(req.params.id,{
        password:await bcrypt.hash(req.body.newPassword,12),
    },{new:true});
    if(!newDoc)
            return next(new GlobalErrorHandler("Doc not found",404));
    res.status(200).json({status:"SUCCESS",data:{newDoc}});
})

// @desc delete user by id
// @route delete /api/users
// @access private 
exports.deleteUser=Factory.DeleteOne(UserModler);