const express = require('express');



const {createCategory,
        getAllCategories,
        getCategory,
        UpdateCategory,
        deleteCategory,uploadCategoryImage,reSizeImages} = require('../services/categoryService');
const { getCategoryValidator,
        createCategoryValidator,
        updateCategoryValidator,
        deleteCategoryValidator } = require('../utils/validators/categoryValidators');
const subCategoryRoute= require('./subCategoryRoute');    
const { protect ,allowTo } = require('../services/authService');

const router = express.Router();



// nested route
// to access sub categories if we have this route from category
router.use('/:categoryId/subcategories',subCategoryRoute);


router.route("/").post(protect
                        ,allowTo("admin")
                        ,uploadCategoryImage
                        ,reSizeImages
                        ,createCategoryValidator
                        ,createCategory)

                .get(getAllCategories)
                

router.route("/:id").get(getCategoryValidator,getCategory)
                .put(protect
                        ,allowTo("admin")
                        ,uploadCategoryImage
                        ,reSizeImages
                        ,updateCategoryValidator
                        ,UpdateCategory)        
                        

                .delete(protect
                        ,allowTo("admin")
                        ,deleteCategoryValidator
                        ,deleteCategory);


module.exports = router;