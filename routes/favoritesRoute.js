const express = require('express');
const {addProductToFavorites
    ,RemoveProductFromFavorites,getLoggedFavorites} = require('../services/favoriteService');

const { protect ,allowTo } = require('../services/authService');

const router = express.Router();

router.route("/").post(protect
                        ,allowTo("user")
                        ,addProductToFavorites)
                .get(protect
                        ,allowTo("user")
                        ,getLoggedFavorites)

                    

router.route("/:id").delete(protect
                        ,allowTo("user")
                        ,RemoveProductFromFavorites)

module.exports=router;