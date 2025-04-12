const express = require('express');
const {createUser,
    getAllUsers,
    getUser,
    getLoggedUser,
    UpdateUser,UpdateUserPassword,UpdateLoggedUserPassword,UpdateLoggedUser,deactiveLoggedUser,
    deleteUser,uploadUserImage,reSizeImages} = require('../services/userService');

const { getUserValidator,
    createUserValidator,
    updateUserValidator,changeUserPasswordValidator,changeLoggedUserPasswordValidator,
    updateLoggedUserValidator,
    deleteUserValidator } = require('../utils/validators/userValidator');

const { protect ,allowTo } = require('../services/authService');

const router = express.Router();

//  get logged user data
router.route("/myData").get(protect,getLoggedUser,getUser);

// update user password by admin
router.put("/changePassword/:id",changeUserPasswordValidator,UpdateUserPassword)

// update  logged user password 
router.put("/changeMyPassword",protect,changeLoggedUserPasswordValidator,UpdateLoggedUserPassword)

// update  logged user data 
router.put("/updateMe",protect,updateLoggedUserValidator,UpdateLoggedUser)

// deactive  logged user  
router.put("/deactiveMe",protect,deactiveLoggedUser)


//user CRUD operation
router.route("/").post(protect,allowTo("admin"),uploadUserImage,reSizeImages,createUserValidator,createUser)
                .get(protect,allowTo("admin"),getAllUsers)
                

router.route("/:id").get(protect,allowTo("admin"),getUserValidator,getUser)
                .put(protect,allowTo("admin"),uploadUserImage,reSizeImages,updateUserValidator,UpdateUser)                
                .delete(protect,allowTo("admin"),deleteUserValidator,deleteUser);




module.exports = router;


