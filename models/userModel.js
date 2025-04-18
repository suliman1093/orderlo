const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:[true,'user is required'],
        minlength:[3,'too short user name'],
        maxlength:[32,'too long user name'],
    },
    slug:{
        type:String,
        lowercase:true
    },
    email:{
        type:String,
        lowercase:true,
        require:[true,'email is required'],
        unique:[true,'email must be unique'],
    },
    password:{
        type:String,
        require:[true,'password is required'],
        minlength:[8,'too short password '],
    },

    passwordChangedAt:Date,
    passwordResetCode:String,
    passwordResetExp:Date,
    passwordResetCodeVerifiy:Boolean,

    profileImg:{
        type:String,
    },
    role:{
        type:String,
        enum:['user',"admin"],
        default:'user'
    },
    active:{
        type:Boolean,
        default:true
    },
    favorites:[{
        type:mongoose.Schema.ObjectId,
        ref:"Product"
    }],
    addresses:[{
        id:{type:mongoose.Schema.Types.ObjectId},
        alias:String,
        details:String,
        phone:String,
        city:String,
        postalCode:String,
    }]

},{timestamps:true});

// hashing password on create
UserSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,12);
    next();
})


const UseryModel = mongoose.model("User",UserSchema);
module.exports= UseryModel;