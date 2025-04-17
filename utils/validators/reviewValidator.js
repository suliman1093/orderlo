const { param,body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const ReviewModel = require('../../models/reviewModel');
const ApiError = require('../apiError');

exports.getReviewValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id')
    ,validatorMiddleware
];

exports.createReviewValidator=[
    body('title').optional(),
    body('rating').notEmpty().withMessage(' rating must be not empty')
    .isFloat({min:1,max:5}).withMessage('rating value must be between 1 t to 5'),
    body('user').isMongoId().withMessage('unvalid mongo id'),
    body('product').isMongoId().withMessage('unvalid mongo id')
    .custom(async(val , {req})=>{
        // check if logged user create review before  
        const review = await ReviewModel.findOne({user:req.user._id,product:val});
        if(review) throw new ApiError('you are allready create review before',409);
        return true;
    }),
    validatorMiddleware
];

exports.updateReviewValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id').custom(async(val,{req})=>{
        // check if user is the owner of the review
        const review = await ReviewModel.findById(req.params.id);
        if(!review) throw new ApiError('review not found',404);
        if(review.user._id.toString() !== req.user._id.toString()) throw new ApiError('you are not the owner',409);
        return true;
    }),
    validatorMiddleware
];

exports.deleteReviewValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id').custom(async(val,{req})=>{
        // check if user is the owner of the review
        const review = await ReviewModel.findById(req.params.id);
        if(!review) throw new ApiError('review not found',404);
        if(req.user.role ==='admin') return true;
        if(review.user._id.toString() !== req.user._id.toString()) throw new ApiError('you are not the owner',409);
        return true;
    }),
    validatorMiddleware
];