const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

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

// get one && get all && update
CategorySchema.post('init',(doc)=>{
    if(doc.image){
        const imageUrl =`${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
})

//create
CategorySchema.post('save',(doc)=>{
    if(doc.image){
        const imageUrl =`${process.env.BASE_URL}/categories/${doc.image}`;
        doc.image = imageUrl;
    }
})

const CategoryModel = mongoose.model("Category",CategorySchema);
module.exports= CategoryModel;