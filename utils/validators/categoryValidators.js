const { default: slugify } = require("slugify");
const { param,body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


exports.getCategoryValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'), validatorMiddleware
];

exports.createCategoryValidator=[
    body('name')
    .notEmpty().withMessage('category required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:32}).withMessage('too long category name').custom((name,{req})=>{
        req.body.slug = slugify(name);
        return true;
}),
    validatorMiddleware
];

exports.updateCategoryValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    body('name')
    .notEmpty().withMessage('category required')
    .isLength({min:3}).withMessage('too short category name')
    .isLength({max:32}).withMessage('too long category name').custom((name,{req})=>{
        req.body.slug = slugify(name);
        return true;
}),
    validatorMiddleware
];

exports.deleteCategoryValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];