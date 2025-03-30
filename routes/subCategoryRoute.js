const express = require('express');
const {createSubCategory,
        getAllSubCategories,
        getSubCategory,
        UpdateSubCategory,
        deleteSubCategory,
        setCategoryIdToBody} = require('../services/subCategoryService');
const { createSubCategoryValidator,
        getSubCategoryValidator,
        updateSubCategoryValidator,
        deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidators');

// to access category id '/:categoryId/subcategories'
const router = express.Router({ mergeParams: true });




router.route("/").post(setCategoryIdToBody,createSubCategoryValidator,createSubCategory)
                .get(getAllSubCategories)
                

router.route("/:id").get(getSubCategoryValidator,getSubCategory)
                .put(updateSubCategoryValidator,UpdateSubCategory)                
                .delete(deleteSubCategoryValidator,deleteSubCategory);
module.exports = router;