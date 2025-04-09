const express = require('express');
const {createSubCategory,
        getAllSubCategories,
        getSubCategory,
        UpdateSubCategory,
        deleteSubCategory,
        setCategoryIdToBody,createFilterObj} = require('../services/subCategoryService');
const { createSubCategoryValidator,
        getSubCategoryValidator,
        updateSubCategoryValidator,
        deleteSubCategoryValidator,
} = require('../utils/validators/subCategoryValidators');
const { protect ,allowTo } = require('../services/authService');

// to access category id '/:categoryId/subcategories'
const router = express.Router({ mergeParams: true });




router.route("/").post(protect
                        ,allowTo("admin")
                        ,setCategoryIdToBody
                        ,createSubCategoryValidator
                        ,createSubCategory)

                .get(createFilterObj,getAllSubCategories)
                

router.route("/:id").get(getSubCategoryValidator,getSubCategory)
                .put(protect
                        ,allowTo("admin")
                        ,updateSubCategoryValidator
                        ,UpdateSubCategory) 

                .delete(protect
                        ,allowTo("admin")
                        ,deleteSubCategoryValidator
                        ,deleteSubCategory);


module.exports = router;