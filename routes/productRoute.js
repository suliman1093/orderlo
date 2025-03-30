const express = require('express');
const {createProduct,
    getAllProducts,
    getProduct,
    UpdateProduct,
    deleteProduct} = require('../services/productService');

    const { getProductValidator,
        createProductValidator,
        updateProductValidator,
        deleteProductValidator } = require('../utils/validators/productValidator');


const router = express.Router();

router.route("/").post(createProductValidator,createProduct)
                .get(getAllProducts)
                

router.route("/:id").get(getProductValidator,getProduct)
                .put(updateProductValidator,UpdateProduct)                
                .delete(deleteProductValidator,deleteProduct);
module.exports = router;