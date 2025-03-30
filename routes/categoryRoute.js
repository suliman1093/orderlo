const express = require('express');
const {createCategory,
        getAllCategories,
        getCategory,
        UpdateCategory,
        deleteCategory} = require('../services/categoryService');
const { getCategoryValidator,
        createCategoryValidator,
        updateCategoryValidator,
        deleteCategoryValidator } = require('../utils/validators/categoryValidators');
const subCategoryRoute= require('./subCategoryRoute');    

const router = express.Router();

// nested route
// to access sub categories if we have this route from category
router.use('/:categoryId/subcategories',subCategoryRoute);


router.route("/").post(createCategoryValidator,createCategory)
                .get(getAllCategories)
                

router.route("/:id").get(getCategoryValidator,getCategory)
                .put(updateCategoryValidator,UpdateCategory)                
                .delete(deleteCategoryValidator,deleteCategory);
module.exports = router;