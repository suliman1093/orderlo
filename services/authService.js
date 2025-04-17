const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const GlobalErrorHandler = require('../utils/apiError');
const {asyncHandler}=require('../middlewares/asyncHandler');
const UserModel=require('../models/userModel');
const sendEmail = require('../utils/sendEmail');


dotenv.config();


// @desc signup new user
// @route get /api/auth/signup
// @access public
exports.signup=asyncHandler(async(req,res,next)=>{
    // create user
    const user = await UserModel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
    });
    //generate token
    
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"10m"});
    res.status(200).json({status:"SUCCESS",data:{user},token:token});

})


// @desc login user
// @route get /api/auth/login
// @access public
exports.login=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;

    //find user by email
    const user = await UserModel.findOne({email});
    if (!user) 
        return next(new GlobalErrorHandler('user not found with this email',400));

    //check password
    const isMatched = await bcrypt.compare(password,user.password);
    if(isMatched){
        //generate token
        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"10m"});
        res.status(200).json({status:"SUCCESS",data:{user},token:token});
    }

    return next(new GlobalErrorHandler("uncorrect password",404));



})

// @desc send reset code to email
// @route get /api/auth/forgetPassword
// @access public
exports.forgotPassword = asyncHandler(async(req,res,next)=>{

    //1)-get user by email
    const user = await UserModel.findOne({email:req.body.email})
    if(!user) return next(new GlobalErrorHandler('user not found',404));
    
    //2)- if user exist , generate random 6 digit and save it in db
    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedResetCode = crypto.createHash('sha256')
    .update(resetCode).digest('hex');

    //3)- save hashed reset code
    user.passwordResetCode = hashedResetCode;
    user.passwordResetExp = Date.now()+10*60*1000;
    user.passwordResetCodeVerifiy = false;
    
    await user.save();

    //4)- send resetCode via email
    await sendEmail({
        email:user.email,
        subject:"your reset code",
        message:resetCode
    });

    return res.status(200).json({status:"success",message:"email sended"});
})


// @desc verify resetCode
// @route get /api/auth/verifyResetCode
// @access public
exports.verifyResetCode = asyncHandler(async(req,res,next)=>{

    // hashed reset code in req
    const hashedResetCode = crypto.createHash('sha256')
    .update(req.body.resetCode).digest('hex');

    // get user by reset code
    const user = await UserModel.findOne({passwordResetCode:hashedResetCode
        ,passwordResetExp:{$gt:Date.now()}
    })
    if(!user) return next(new GlobalErrorHandler('unvalid or expired reset code',404));

// if reset code is valid 
    user.passwordResetCodeVerifiy = true;
    await user.save();
    return res.status(200).json({status:"success",message:".password Reset Code Verified succesfuly"});

})


// @desc set new password
// @route get /api/auth/resetPassword
// @access public
exports.resetPassword = asyncHandler(async(req,res,next)=>{
    // get user by email
    const user = await UserModel.findOne({email:req.body.email});
    if(!user) return next(new GlobalErrorHandler('user not found',404));
    if(!user.passwordResetCodeVerifiy) return next(new GlobalErrorHandler('passwordResetCodeVerifiy is not verified',400));

    // update password
    user.password = req.body.newPassword;
    user.passwordResetCode = undefined;
    user.passwordResetCodeVerifiy = false;
    user.passwordResetExp=undefined;
    await user.save();

    //generate new token and return it
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"10m"});
    res.status(200).json({status:"SUCCESS",data:{user},token:token});
})



// @desc make sure user logged in
exports.protect=asyncHandler(async(req,res,next)=>{

    
    //1)- check if token exist
    if(!req.headers.authorization) return next(new GlobalErrorHandler('not Authorized',401)); 
    const token = req.headers.authorization.split(' ')[1];
    //2)- verify the token (no change happened - expired token)
    const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY)
    
    if(!decoded) return next(new GlobalErrorHandler('unvalid token',401));

    //3)- check if user exist
    const currentUser = await UserModel.findById(decoded.userId);
    if(!currentUser) return next(new GlobalErrorHandler('user not found for this token',401));

    //4)- check if user active
    if(!currentUser.active) return next(new GlobalErrorHandler('user not active',401));
    req.user = currentUser;
    next();
})

// @desc authorization
exports.allowTo=(...roles)=>asyncHandler(async(req,res,next)=>{
    if(!roles.includes(req.user.role)) return next(new GlobalErrorHandler('not allow to access',403)); 
    next();
})

