const mongoose = require('mongoose');

const SubCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'subcategory is required'],
        unique:[true,'subcategory must be unique'],
        minlength:[2,'too short subcategory name'],
        maxlength:[32,'too long subcategory name'],
        trim:true
    },
    //A and B => a-and-b
    slug:{
        type:String,
        lowercase:true
    },
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'Category',
        require:[true,'subcategory must be belong to category']
    }
},{timestamps:true});

const SubCategoryModel = mongoose.model("SubCategory",SubCategorySchema);
module.exports= SubCategoryModel;