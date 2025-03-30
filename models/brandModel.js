const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    name:{
        type:String,
        require:[true,'brand is required'],
        unique:[true,'brand must be unique'],
        minlength:[3,'too short brand name'],
        maxlength:[32,'too long brand name'],
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

const BrandyModel = mongoose.model("Brand",BrandSchema);
module.exports= BrandyModel;