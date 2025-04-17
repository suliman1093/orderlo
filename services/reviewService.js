const ReviewModel=require('../models/reviewModel');
const Factory = require('./handlersFactory');

// @desc middleware for nested route to get reviews for product '/:productId/reviews'
// @route git
// @access public
exports.createFilterObj=(req,res,next)=>{
    let filterObj = {};
    if(req.params.productId)
            filterObj = {product:req.params.productId};
    req.filteration = filterObj;
    next();
};

// @desc middleware for nested route to create review from product '/:productId/reviews'
// @route post
// @access private
exports.setProductIdToBody=(req,res,next)=>{
    //nested route
    if(!req.body.product) req.body.product = req.params.productId;
    req.body.user = req.user._id;
    next();
}

// @desc get list of reviews
// @route get /api/reviews
// @access public
exports.getAllReviews=Factory.GetAll(ReviewModel,"ReviewModel");

// @desc get specific review
// @route get /api/reviews/:id
// @access public
exports.getReview=Factory.GetOne(ReviewModel);

// @desc creat new review
// @route post /api/reviews
// @access private/protect/user
exports.createReview= Factory.CreateOne(ReviewModel);

// @desc update specific review
// @route put /api/reviews/:id
// @access private/protect/user
exports.UpdateReview=Factory.UpdateOne(ReviewModel);

// @desc delete review by id
// @route delete /api/reviews
// @access private/protect/user - admin
exports.deleteReview=Factory.DeleteOne(ReviewModel);