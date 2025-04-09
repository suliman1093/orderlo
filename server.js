/* ============= imports ============== */
const path = require('path')
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const dbconnection = require('./config/database');
const categoryRoute= require('./routes/categoryRoute');
const subCategoryRoute= require('./routes/subCategoryRoute');
const brandRoute= require('./routes/brandRoute');
const productRoute= require('./routes/productRoute');
const userRoute= require('./routes/userRoute');
const authRoute= require('./routes/authRoute');
const {routeMidlewareHandler}=require('./middlewares/routeMidlewareHandler');
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
app.use(express.static(path.join(__dirname,'uploads')))
if(process.env.NODE_ENV==='development'){// run the logger just in dev mode
    app.use(morgan('dev'));}; // request logger





/* ============= routes ============== */
app.use("/api/categories",categoryRoute);
app.use("/api/subcategories",subCategoryRoute);
app.use("/api/brands",brandRoute);
app.use("/api/products",productRoute);
app.use("/api/users",userRoute);
app.use("/api/auth",authRoute);
/* ============= route not found middleware handler ============== */
app.all("*",routeMidlewareHandler);


/* ============= global error handling middleware for express ============== */
app.use(globalErrorHandler);