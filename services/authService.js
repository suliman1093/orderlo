const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const GlobalErrorHandler = require('../utils/apiError');
const {asyncHandler}=require('../middlewares/asyncHandler');
const UserModel=require('../models/userModel');

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
    const token = jwt.sign({userId:req.body._id},process.env.JWT_SECRET_KEY,{expiresIn:"10m"});
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
        const token = jwt.sign({userId:req.body._id},process.env.JWT_SECRET_KEY,{expiresIn:"10m"});
        res.status(200).json({status:"SUCCESS",data:{user},token:token});
    }

    return next(new GlobalErrorHandler("uncorrect password",404));



})



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
    

    req.user = currentUser;
    next();
})


exports.allowTo=(...roles)=>asyncHandler(async(req,res,next)=>{
    if(!roles.includes(req.user.role)) return next(new GlobalErrorHandler('not allow to access',403)); 
    next();
})

