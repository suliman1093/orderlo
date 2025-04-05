const { default: slugify } = require("slugify");
const { param,body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");


exports.getSubCategoryValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'), validatorMiddleware
];

exports.createSubCategoryValidator=[
    body('name')
    .notEmpty().withMessage('subcategory required')
    .isLength({min:3}).withMessage('too short subcategory name')
    .isLength({max:32}).withMessage('too long subcategory name').custom((name,{req})=>{
        req.body.slug = slugify(name);
        return true;
    }),
    body('category')
    .notEmpty().withMessage('category  required')
    .isMongoId().withMessage('unvalid  category id'),
    validatorMiddleware
];

exports.updateSubCategoryValidator=[
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

exports.deleteSubCategoryValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];