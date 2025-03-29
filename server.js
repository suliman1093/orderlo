/* ============= imports ============== */
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbconnection = require('./config/database');
const categoryRoute= require('./routes/categoryRoute');
const {routeMidlewareHandler}=require('./middlewares/routeMidlewareHandler');
const ApiError = require('./utils/apiError');
const globalErrorHandler = require('./middlewares/globalErrorHandler')
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





/* ============= routes ============== */
app.use("/api/categories",categoryRoute);


/* ============= route not found middleware handler ============== */
app.all("*",routeMidlewareHandler);


/* ============= global error handling middleware for express ============== */
app.use(globalErrorHandler);