const slugify = require('slugify');
const { param,body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


exports.getBrandValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'), validatorMiddleware
];

exports.createBrandValidator=[
    body('name')
    .notEmpty().withMessage('brand required')
    .isLength({min:3}).withMessage('too short brand name')
    .isLength({max:32}).withMessage('too long brand name').custom((name,{req})=>{
        req.body.slug = slugify(name);
        return true;
}),
    validatorMiddleware
];

exports.updateBrandValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    body('name')
    .notEmpty().withMessage('brand required')
    .isLength({min:3}).withMessage('too short brand name')
    .isLength({max:32}).withMessage('too long brand name').custom((name,{req})=>{
            req.body.slug = slugify(name);
            return true;
    }),
    validatorMiddleware
];

exports.deleteBrandValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];