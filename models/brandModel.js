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


// get one && get all && update
BrandSchema.post('init',(doc)=>{
    if(doc.image){
        const imageUrl =`${process.env.BASE_URL}/brands/${doc.image}`;
        doc.image = imageUrl;
    }
})

//create
BrandSchema.post('save',(doc)=>{
    if(doc.image){
        const imageUrl =`${process.env.BASE_URL}/brands/${doc.image}`;
        doc.image = imageUrl;
    }
})

const BrandyModel = mongoose.model("Brand",BrandSchema);
module.exports= BrandyModel;