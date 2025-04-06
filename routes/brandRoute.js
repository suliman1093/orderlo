const express = require('express');
const {createBrand,
    getAllBrands,
    getBrand,
    UpdateBrand,
    deleteBrand,uploadBrandImage,reSizeImages} = require('../services/brandService');

    const { getBrandValidator,
        createBrandValidator,
        updateBrandValidator,
        deleteBrandValidator } = require('../utils/validators/brandValidator');


const router = express.Router();

router.route("/").post(uploadBrandImage,reSizeImages,createBrandValidator,createBrand)
                .get(getAllBrands)
                

router.route("/:id").get(getBrandValidator,getBrand)
                .put(uploadBrandImage,reSizeImages,updateBrandValidator,UpdateBrand)                
                .delete(deleteBrandValidator,deleteBrand);
module.exports = router;