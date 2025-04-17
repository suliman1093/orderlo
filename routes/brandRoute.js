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
const { protect ,allowTo } = require('../services/authService');

        


const router = express.Router();


router.route("/").post(protect
                        ,allowTo("admin")
                        ,uploadBrandImage,
                        reSizeImages
                        ,createBrandValidator,
                        createBrand)

                .get(getAllBrands)
                

router.route("/:id").get(getBrandValidator,getBrand)
                .put(protect
                        ,allowTo("admin")
                        ,uploadBrandImage
                        ,reSizeImages
                        ,updateBrandValidator
                        ,UpdateBrand)   

                .delete(protect
                    ,allowTo("admin")
                    ,deleteBrandValidator
                    ,deleteBrand);




module.exports = router;