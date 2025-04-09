const express = require('express');
const {createUser,
    getAllUsers,
    getUser,
    UpdateUser,UpdateUserPassword,
    deleteUser,uploadUserImage,reSizeImages} = require('../services/userService');

const { getUserValidator,
    createUserValidator,
    updateUserValidator,changeUserPasswordValidator,
    deleteUserValidator } = require('../utils/validators/userValidator');

const { protect ,allowTo } = require('../services/authService');

const router = express.Router();

router.put("/changepassword/:id",changeUserPasswordValidator,UpdateUserPassword)

router.route("/").post(protect,allowTo("admin"),uploadUserImage,reSizeImages,createUserValidator,createUser)
                .get(protect,allowTo("admin"),getAllUsers)
                

router.route("/:id").get(protect,allowTo("admin"),getUserValidator,getUser)
                .put(protect,allowTo("admin"),uploadUserImage,reSizeImages,updateUserValidator,UpdateUser)                
                .delete(protect,allowTo("admin"),deleteUserValidator,deleteUser);
module.exports = router;