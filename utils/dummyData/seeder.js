const dotenv = require('dotenv');

dotenv.config({path:'../../.env'});
const fs = require('fs');
const ProductModel=require('../../models/productModel');
const dbconnection = require('../../config/database');



// connect to DB
console.log("MongoDB URI:", process.env.MONGO_URL);
dbconnection();

// Read data
const products = JSON.parse(fs.readFileSync('./products.json'));


// Insert data into DB
const insertData = async () => {
  try {
    await ProductModel.create(products);

    console.log('Data Inserted');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await ProductModel.deleteMany();
    console.log('Data Destroyed');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === '-i') {
  insertData();
} else if (process.argv[2] === '-d') {
  destroyData();
}