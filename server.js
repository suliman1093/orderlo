/* ============= imports ============== */
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbconnection = require('./config/database');
/* ============= config env ============== */
dotenv.config();

/* ============= connect to db ============== */
dbconnection();

/* ============= run the server ============== */
const app = express();
const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log('listen on port ',PORT);
});

/* ============= middlewares ============== */
app.use(express.json());
if(process.env.NODE_ENV=='development'){// run the logger just in dev mode
    app.use(morgan('dev'));}; // request logger