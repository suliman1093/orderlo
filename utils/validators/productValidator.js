const { default: slugify } = require("slugify");
const { param,body } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const CategoryModel=require('../../models/categoryModel');
const SubCategoryModel=require('../../models/subCategoryModel');


exports.createProductValidator=[
    body('title')
    .notEmpty().withMessage('product required')
    .isLength({min:3}).withMessage('too short product name').custom((title,{req})=>{
        req.body.slug = slugify(title);
        return true;
}),


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
    .isFloat({ min: 1 }).withMessage('too low price'),


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
    .isMongoId().withMessage('category id must be a valid MongoDB ID')
    .custom(async (categoryId) => {
        const category = await CategoryModel.findById(categoryId);
        if (!category) {
            return Promise.reject(new Error('No category found for this ID'));
        }
        return true;
    }),


    body('subCategory')
    .optional()
    .isMongoId().withMessage('subCategory id must be a valid mongoo id')
    .custom(async (subCategoriesIds) => {
        const foundSubCategories  = await SubCategoryModel.find({ _id: { $in: subCategoriesIds } });
        if (foundSubCategories.length !== subCategoriesIds.length ) {
            return Promise.reject(new Error('unvalid subCategories IDs'));
        }
        return true;
    })
    .custom(async (subCategoriesIds , {req}) => {
        const SubCategoriesOfCategory  = await SubCategoryModel.find({category: req.body.category});
        const subCategoriesOfCategoryIds = SubCategoriesOfCategory.map(sub => sub._id.toString());
        const isValid = subCategoriesIds.every(id => subCategoriesOfCategoryIds.includes(id.toString()));
        if (!isValid) {
            return Promise.reject(new Error("sub category must be belong to category"));
        }
        return true;
    }),


    body('brand')
    .optional()
    .isMongoId().withMessage('brand id must be a valid mongoo id'),


    body('ratingsAverage')
    .optional()
    .isNumeric()
    .isFloat({ min: 1, max: 5 }).withMessage('max rating average is 1->5'),


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
    body('title').custom((name,{req})=>{
        req.body.slug = slugify(name);
        return true;
}),
    validatorMiddleware
];

exports.getProductValidator=[
    param('id').isMongoId().withMessage('unvalid mongo id'),
    validatorMiddleware
];