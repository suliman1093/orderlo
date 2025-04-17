const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'too short product title'],
        maxlength:[100,'too long product title'],
    },
    slug:{
        type:String,
        required:true,
        lowercase:true,
    },
    description:{
        type:String,
        required:true,
        minlength:[20,'too short product description'],
    },
    quantity:{
        type:Number,
        required:[true,'product quantity is required'],
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true,
        trim:true,
        max:[10000,'too long product price'],
    },
    priceAfterDiscount:{
        type:Number,
    },
    colors:[String],
    imageCover:{
        type:String,
        required:[true,'image cover is required']
    },
    images:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        required:[true,'product must be belong to category'],
    },
    subCategory:[{
        type:mongoose.Schema.ObjectId,
        ref:'SubCategory',
    }],
    brand:{
        type:mongoose.Schema.ObjectId,
        ref:'Brand'
    },
    ratingsAverage:{
        type:Number,
        min:[1,'rating average must be 1 or greater '],
        max:[5,'max rating is 5']
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
},
{
    timestamps:true,
    toJSON:{virtuals:true},
    toObject:{virtuals:true},
});



ProductSchema.pre(/^find/,function(next){
    this.populate({
        path:'category',
        select:'name'
    });
    next();
});

ProductSchema.post('init',(doc)=>{
    if(doc.imageCover){
        const imageCoverUrl =`${process.env.BASE_URL}/categories/${doc.imageCover}`;
        doc.imageCover = imageCoverUrl;
    }
    if(doc.images){
        const imagesList =[];
        doc.images.forEach((image)=>{
            const imageUrl =`${process.env.BASE_URL}/categories/${image}`;
            imagesList.push(imageUrl);
        })
        doc.images=imagesList;
    }
})

//create
ProductSchema.post('save',(doc)=>{
    if(doc.imageCover){
        const imageCoverUrl =`${process.env.BASE_URL}/categories/${doc.imageCover}`;
        doc.imageCover = imageCoverUrl;
    }
    if(doc.images){
        const imagesList =[];
        doc.images.forEach((image)=>{
            const imageUrl =`${process.env.BASE_URL}/categories/${image}`;
            imagesList.push(imageUrl);
        })
        doc.images=imagesList;
    }
})

ProductSchema.virtual('reviews',{
    ref:"Review",
    foreignField:"product",
    localField:"_id"
});



const ProductyModel = mongoose.model("Product",ProductSchema);
module.exports= ProductyModel;