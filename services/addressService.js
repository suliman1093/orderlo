const {asyncHandler}=require('../middlewares/asyncHandler');
const UserModel=require('../models/userModel');


// @desc get logged addresses
// @route get /api/addresses
// @access private / user
exports.getLoggedAddresses=asyncHandler(async(req,res,next)=>{
    const user = await UserModel.findById(req.user._id).populate("addresses");
    res.status(200).json({status:"SUCCESS",data:user.addresses});
})



// @desc add address to addresses
// @route post /api/addresses
// @access private / user
exports.addAddress=asyncHandler(async(req,res,next)=>{
    const user = await UserModel.findByIdAndUpdate(req.user._id,{
        $addToSet:{addresses:req.body}
    },{new:true});
    res.status(200).json({status:"SUCCESS",message:"address added to you",data:user.addresses});
})


// @desc remove address from addresses
// @route delete /api/adresses/:id
// @access private / user
exports.RemoveAddress=asyncHandler(async(req,res,next)=>{
    const user = await UserModel.findByIdAndUpdate(req.user._id,{
        $pull:{addresses:{_id:req.params.id}}
    },{new:true});
    res.status(200).json({status:"SUCCESS",message:"address removed",data:user.addresses});
})