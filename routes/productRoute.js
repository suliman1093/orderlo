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

const { protect ,allowTo } = require('../services/authService');

const router = express.Router();

router.route("/").post(protect
                        ,allowTo("admin")
                        ,uploadProductImages
                        ,reSizeProductImages
                        ,createProductValidator
                        ,createProduct)

                .get(getAllProducts)
                

router.route("/:id").get(getProductValidator,getProduct)
                .put(protect
                    ,allowTo("admin")
                    ,uploadProductImages
                    ,reSizeProductImages
                    ,updateProductValidator
                    ,UpdateProduct)     

                .delete(protect
                    ,allowTo("admin")
                    ,deleteProductValidator
                    ,deleteProduct);
module.exports = router;