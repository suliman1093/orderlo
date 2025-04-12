const express = require('express');
const {signup,login,forgotPassword,verifyResetCode,resetPassword} = require('../services/authService');

    const { signupValidator,loginValidator } = require('../utils/validators/authValidator');


const router = express.Router();



router.post('/signup',signupValidator,signup);
router.post('/login',loginValidator,login);

router.post('/forgetPassword',forgotPassword);
router.post('/verifyReseteCode',verifyResetCode);
router.post('/resetPassword',resetPassword);


module.exports = router;