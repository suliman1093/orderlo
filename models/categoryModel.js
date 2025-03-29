const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'category is required'],
        unique:[true,'category must be unique'],
        minlength:[3,'too short category name'],
        maxlength:[32,'too long category name'],
    },
    //A and B => a-and-b
    slug:{
        type:String,
        lowercase:true
    },
    image:{
        type:String,
    }
},{timestamps:true});

const CategoryModel = mongoose.model("Category",CategorySchema);
module.exports= CategoryModel;