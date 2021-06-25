// const dotenv = require('dotenv');
const mongoose  = require("mongoose");

const express = require("express");
const cookieParser = require('cookie-parser');


const app = express();
app.use(cookieParser());

const port = 5000;
require('./db/conn');
const User = require('./model/userSchema');

// dotenv.config({path: './config.env'});


//Connecting to DataBase.

// const DB = process.env.DATABASE ; 
// const DB = 'mongodb+srv://vedant:884zqcdma@op@cluster0.mlupm.mongodb.net/mernstack?retryWrites=true&w=majority';

// mongoose.connect( DB , {
//     useNewUrlParser:true,
//     useCreateIndex:true,
//     useUnifiedTopology:true,
//     useFindAndModify:false
// }).then(() => {
//     console.log("Connection Successful");
// }).catch((e) => console.log(`erroeee:${e}`))



//Middleware

// converting json data into node readable form
app.use(express.json());

//linking routes to main file
app.use(require('./routes/auth'));




// const middleware = (req, res, next) =>{
//     console.log("MiddleWare Here Hi! /just for testing/ ");
//     next();
// }
// middleware();

// app.get('/', (req, res) => {
//     res.send("Hello World"); 
// })


// app.get('/about', (req, res) => {
//     console.log("Hello About here!");
//     res.send("About"); 
// })

// app.get('/contact', (req, res) => {
//     res.cookie("test", "hiii");
//     res.send("Contact"); 
// })

// app.get('/signin', (req, res) => {
//     res.send("Login"); 
// })

// app.get('/register', (req, res) => {
//     res.send("Registration"); 
// })







app.listen(port, () => {
    console.log(`Server Running at  ${port}`);
})