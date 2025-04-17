const  mongoose  = require("mongoose");
const ProductyModel = require("./productModel");

const ReviewSchema = new mongoose.Schema({
    title:{
        type:String,
    },
    rating:{
        type:Number,
        min:[1,'min rating is 1'],
        max:[5,'max rating is 5'],
        required:[true,'rating for review is required']
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'review owner is required']
    },
    product:{
        type:mongoose.Schema.ObjectId,
        ref:'Product',
        required:[true,'product for review is required']
    },

},{timestamps:true})

ReviewSchema.pre(/^find/,function(next){
    this.populate({
        path:"user",
        select:"name",
    })
    next();
})

ReviewSchema.statics.calcAverageRatingAndQuantity = async function(productId) {
    // calculate rating average and rating quantity
    const result = await this.aggregate([
        //stage 1 : get all reviews in specific product
        {$match: {product:productId}},
        //stage 2 : group all reviews of specific product and calculate avg and ratingsQuantity
        {$group: {_id:"product", ratingsAverage:{$avg:"$rating"},ratingsQuantity:{$sum:1}}}
    ]);
    
    // update data of product
    if(result.length>0){
        await ProductyModel.findByIdAndUpdate(productId,{
            ratingsAverage:result[0].ratingsAverage,
            ratingsQuantity:result[0].ratingsQuantity,
        });
    }
    else{
        await ProductyModel.findByIdAndUpdate(productId,{
            ratingsAverage:0,
            ratingsQuantity:0,
        });
    };
};

// calculate in create and update 
ReviewSchema.post('save',async function(){
    await this.constructor.calcAverageRatingAndQuantity(this.product);
})

// save product id before delete
ReviewSchema.pre('deleteOne', { document: true, query: false }, async function (next) {
    this._productId = this.product;
    next();
});
// calculate after delete
ReviewSchema.post('deleteOne', { document: true, query: false }, async function () {
    if (this._productId) {
        await this.constructor.calcAverageRatingAndQuantity(this._productId);
    }
});




const ReviewModel = mongoose.model("Review",ReviewSchema);
module.exports= ReviewModel;
