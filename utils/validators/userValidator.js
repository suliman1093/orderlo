const bcrypt = require('bcrypt');
const slugify = require('slugify');
const { param,body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const UserModler=require('../../models/userModel');
const ApiError = require('../apiError');

exports.getUserValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'), validatorMiddleware
];

exports.createUserValidator=[

    body('name')
    .notEmpty().withMessage('user name required')
    .isLength({min:3}).withMessage('too short user name')
    .isLength({max:32}).withMessage('too long user name').custom((name,{req})=>{
        req.body.slug = slugify(name);
        return true;
    }),

    body('email')
    .notEmpty().withMessage('email required')
    .isEmail().withMessage('must be a valid email').custom(async(email)=>{
        const isFound = await UserModler.findOne({email})
        if(isFound) 
            throw new ApiError('email already used',400);
        return true
        
    }),

    body('password')
    .notEmpty().withMessage('password required')
    .isLength({min:8}).withMessage('password must be more than 8')
    .isLength({max:32}).withMessage('password must be less than 32')
    .custom((password,{req})=>{;
    
        if(password!== req.body.passwordConfirm){
            console.log("enter condition");
            throw new ApiError('password and passwordConfirm not matched',400);}
        return true;
    }),

    body('passwordConfirm')
    .notEmpty().withMessage('passwordConfirm required'),

    body('profileImg')
    .optional(),

    
    body('role')
    .optional(),


    validatorMiddleware
];

exports.updateUserValidator=[

    
    param('id').isMongoId().withMessage('unvalid mongo id'),
    body('name')
    .notEmpty().withMessage('user required')
    .isLength({min:3}).withMessage('too short user name')
    .isLength({max:32}).withMessage('too long user name').custom((name,{req})=>{
            req.body.slug = slugify(name);
            return true;
    }),


    body('email')
    .notEmpty().withMessage('email required')
    .isEmail().withMessage('must be a valid email').custom(async(email)=>{
        const isFound = await UserModler.findOne({email})
        if(isFound) 
            throw new ApiError('email already used',400);
        return true
        
    }),


    body('profileImg')
    .optional(),

    
    body('role')
    .optional(),
    validatorMiddleware
];

exports.updateLoggedUserValidator=[
    body('name')
    .notEmpty().withMessage('user required')
    .isLength({min:3}).withMessage('too short user name')
    .isLength({max:32}).withMessage('too long user name').custom((name,{req})=>{
            req.body.slug = slugify(name);
            return true;
    }),


    body('email')
    .notEmpty().withMessage('email required')
    .isEmail().withMessage('must be a valid email').custom(async(email)=>{
        const isFound = await UserModler.findOne({email})
        if(isFound) 
            throw new ApiError('email already used',400);
        return true
        
    }),


    body('profileImg')
    .optional(),
    validatorMiddleware
];


exports.changeUserPasswordValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),

    body('newPassword')
    .notEmpty().withMessage('newPassword required')
    .isLength({min:8}).withMessage('newPassword must be more than 8')
    .isLength({max:32}).withMessage('newPassword must be less than 32')
    .custom((newPassword,{req})=>{;
        if(newPassword!== req.body.passwordConfirm){
            throw new ApiError('newPassword and passwordConfirm not matched',400);}
        return true;
    }),

    body('currentPassword')
    .notEmpty().withMessage('currentPassword required')
    .custom(async(currentPassword,{req})=>{
        const user = await UserModler.findById(req.params.id);
        if(!user)
            throw new ApiError('user not found',404);
        const isMatched = await bcrypt.compare(currentPassword,user.password);
        if(!isMatched){
            throw new ApiError('currentPassword not true',400);}
        return true;
    }),

    body('passwordConfirm')
    .notEmpty().withMessage('passwordConfirm required'),
    validatorMiddleware
];

exports.changeLoggedUserPasswordValidator=[
    body('newPassword')
    .notEmpty().withMessage('newPassword required')
    .isLength({min:8}).withMessage('newPassword must be more than 8')
    .isLength({max:32}).withMessage('newPassword must be less than 32')
    .custom((newPassword,{req})=>{;
        if(newPassword!== req.body.passwordConfirm){
            throw new ApiError('newPassword and passwordConfirm not matched',400);}
        return true;
    }),

    body('currentPassword')
    .notEmpty().withMessage('currentPassword required')
    .custom(async(currentPassword,{req})=>{
        if(!req.user)
            throw new ApiError('user not found',404);
        const isMatched = await bcrypt.compare(currentPassword,req.user.password);
        if(!isMatched){
            throw new ApiError('currentPassword not true',400);}
        return true;
    }),

    body('passwordConfirm')
    .notEmpty().withMessage('passwordConfirm required'),
    validatorMiddleware
];

exports.deleteUserValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];