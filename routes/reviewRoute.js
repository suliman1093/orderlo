const express = require('express');
const {createReview,
        getAllReviews,
        getReview,
        UpdateReview,
        deleteReview,createFilterObj,setProductIdToBody} = require('../services/reviewService');

const { getReviewValidator,
        createReviewValidator,
        updateReviewValidator,
        deleteReviewValidator } = require('../utils/validators/reviewValidator');
const { protect ,allowTo } = require('../services/authService');

        
// to access  '/:productId/reviews'
const router = express.Router({ mergeParams: true });

router.route("/").post(protect
                        ,allowTo("user"),
                        setProductIdToBody,
                        createReviewValidator,
                        createReview)

                .get(createFilterObj,getAllReviews)
                

router.route("/:id").get(getReviewValidator,getReview)
                .put(protect
                        ,allowTo("user")
                        ,updateReviewValidator
                        ,UpdateReview)   

                .delete(protect
                        ,allowTo("admin","user")
                        ,deleteReviewValidator
                        ,deleteReview);




module.exports = router;