const {asyncHandler}=require('../middlewares/asyncHandler');
const UserModel=require('../models/userModel');
const GlobalErrorHandler = require('../utils/apiError');


// @desc get logged favorites
// @route get /api/favorites
// @access private / user
exports.getLoggedFavorites=asyncHandler(async(req,res,next)=>{
    const user = await UserModel.findById(req.user._id).populate("favorites");
    res.status(200).json({status:"SUCCESS",data:user.favorites});
})



// @desc add product to favorites
// @route post /api/favorites
// @access private / user
exports.addProductToFavorites=asyncHandler(async(req,res,next)=>{
    const user = await UserModel.findByIdAndUpdate(req.user._id,{
        $addToSet:{favorites:req.body.productId}
    },{new:true});
    res.status(200).json({status:"SUCCESS",message:"product added to favorites",data:user.favorites});
})


// @desc remove product from favorites
// @route delete /api/favorites/:id
// @access private / user
exports.RemoveProductFromFavorites=asyncHandler(async(req,res,next)=>{
    const user = await UserModel.findByIdAndUpdate(req.user._id,{
        $pull:{favorites:req.params.id}
    },{new:true});
    res.status(200).json({status:"SUCCESS",message:"product removed from favorites",data:user.favorites});
})