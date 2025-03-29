const express = require('express');
const {createCategory,
        getAllCategories,
        getCategory,
        UpdateCategory,
        deleteCategory} = require('../services/categoryService');
const router = express.Router();




router.route("/").post(createCategory)
                .get(getAllCategories)
                .delete(deleteCategory);

router.route("/:id").get(getCategory)
                .put(UpdateCategory);                

module.exports = router;