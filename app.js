const express=require('express');
const mongoose=require('mongoose');
const path=require('path')
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser }=require('./middleware/authmiddleware')
const app=express();

const authRoutes=require('./Routes/authRoutes')
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));
app.set('view engine','ejs');

mongoose.connect("mongodb://localhost:27017/Login")
.then((result)=>{
    app.listen (4000)
    console.log("mongodb connected")
})
.catch(()=>{
    console.log("Failed to connect")
})
app.get('*',checkUser);
app.get('/',requireAuth,(req,res)=> {
    res.render('home');
})
app.use(authRoutes)
