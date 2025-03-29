/* ============= imports ============== */
const mongoose = require('mongoose')
const dotenv = require('dotenv');

/* ============= config env ============== */
dotenv.config();

/* ============= connect to db ============== */
const url =process.env.MONGO_URL;

const dbconnection = ()=>{
    mongoose.connect(url).then(()=>{
        console.log("connected!");
    }).catch((err)=>{
        console.log(err);
    });
}

/* ============= exports ============== */
module.exports=dbconnection;