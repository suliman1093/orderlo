const express = require('express');
const {createProduct,
    getAllProducts,
    getProduct,
    UpdateProduct,
    deleteProduct,uploadProductImages,reSizeProductImages} = require('../services/productService');

    const { getProductValidator,
        createProductValidator,
        updateProductValidator,
        deleteProductValidator } = require('../utils/validators/productValidator');


const router = express.Router();

router.route("/").post(uploadProductImages,reSizeProductImages,createProductValidator,createProduct)
                .get(getAllProducts)
                

router.route("/:id").get(getProductValidator,getProduct)
                .put(uploadProductImages,reSizeProductImages,updateProductValidator,UpdateProduct)                
                .delete(deleteProductValidator,deleteProduct);
module.exports = router;