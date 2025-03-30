const { param,body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.createProductValidator=[
    body('title')
    .notEmpty().withMessage('product required')
    .isLength({min:3}).withMessage('too short product name'),
    body('description')
    .notEmpty().withMessage('description required')
    .isLength({max:2000}).withMessage('too long description'),
    body('quantity')
    .notEmpty().withMessage('quantity required')
    .isNumeric().withMessage('quantity must be a number'),
    body('sold')
    .optional()
    .isNumeric().withMessage('sold must be a number'),
    body('price')
    .notEmpty().withMessage('price required')
    .isNumeric().withMessage('price must be a number')
    .isLength({max:32}).withMessage('too long price'),
    body('priceAfterDiscount')
    .optional()
    .toFloat()
    .isNumeric().withMessage('priceAfterDiscount must be a number')
    .custom((value,{req})=>{
        if(req.body.price<=value){
            throw new Error("priceAfterDiscount must be lower than price");
        }
        return true
    }),
    body('colors')
    .optional()
    .isArray().withMessage('colors must be an array '),
    body('imageCover')
    .notEmpty().withMessage('imageCover required'),
    body('images')
    .optional()
    .isArray().withMessage('images must be an array '),
    body('category')
    .notEmpty().withMessage('category required')
    .isMongoId().withMessage('category id must be a valid mongoo id'),
    body('subCategory')
    .optional()
    .isMongoId().withMessage('subCategory id must be a valid mongoo id'),
    body('brand')
    .optional()
    .isMongoId().withMessage('brand id must be a valid mongoo id'),
    body('ratingsAverage')
    .optional()
    .isNumeric()
    .isLength({min:1}).withMessage('min rating average is 1')
    .isLength({max:5}).withMessage('max rating average is 5'),
    body('ratingsQuantity')
    .optional()
    .isNumeric().withMessage('ratingsQuantity must be a number'),
    validatorMiddleware
];


exports.deleteProductValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];

exports.updateProductValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];

exports.getProductValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];