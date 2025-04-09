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


const router = express.Router();


router.put("/changepassword/:id",changeUserPasswordValidator,UpdateUserPassword)

router.route("/").post(uploadUserImage,reSizeImages,createUserValidator,createUser)
                .get(getAllUsers)
                

router.route("/:id").get(getUserValidator,getUser)
                .put(uploadUserImage,reSizeImages,updateUserValidator,UpdateUser)                
                .delete(deleteUserValidator,deleteUser);
module.exports = router;