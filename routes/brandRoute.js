const express = require('express');
const {createBrand,
    getAllBrands,
    getBrand,
    UpdateBrand,
    deleteBrand} = require('../services/brandService');

    const { getBrandValidator,
        createBrandValidator,
        updateBrandValidator,
        deleteBrandValidator } = require('../utils/validators/brandValidator');


const router = express.Router();

router.route("/").post(createBrandValidator,createBrand)
                .get(getAllBrands)
                

router.route("/:id").get(getBrandValidator,getBrand)
                .put(updateBrandValidator,UpdateBrand)                
                .delete(deleteBrandValidator,deleteBrand);
module.exports = router;