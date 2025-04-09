
const slugify = require('slugify');
const { body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const UserModler=require('../../models/userModel');
const ApiError = require('../apiError');



exports.signupValidator=[

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
    validatorMiddleware
];

exports.loginValidator=[

    body('email')
    .notEmpty().withMessage('email required')
    .isEmail().withMessage('must be a valid email'),

    body('password')
    .notEmpty().withMessage('password required')
    .isLength({min:8}).withMessage('password must be more than 8')
    .isLength({max:32}).withMessage('password must be less than 32'),
    validatorMiddleware
];
