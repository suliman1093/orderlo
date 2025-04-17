const express = require('express');
const {addAddress
    ,RemoveAddress,getLoggedAddresses} = require('../services/addressService');

const { protect ,allowTo } = require('../services/authService');

const router = express.Router();

router.route("/").post(protect
                        ,allowTo("user")
                        ,addAddress)
                .get(protect
                        ,allowTo("user")
                        ,getLoggedAddresses)

                    

router.route("/:id").delete(protect
                        ,allowTo("user")
                        ,RemoveAddress)

module.exports=router;