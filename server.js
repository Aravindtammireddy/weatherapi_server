const request = require('request'); 
const dotenv = require('dotenv');
const morgan =require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const app = express();
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/User');
dotenv.config({path : './config/config.env'});

connectDB();
app.use(cors());
app.use(express.json());
app.get('/',(req,res)=> res.status(200).json('hello user'));

const {imagegenerator,weatherfinder} = require('./api/helper');

app.post('/weather' , async (req,res) =>{
     
     const user = new User({city : req.body.city , apikey : req.body.apikey});
        let user1;
         user.save()
        .then(user => {user1 = user;})
        .catch(err => console.log(err));  
   //  const temp =  await weatherfinder(req.body.latitude,req.body.longitude ); 
   console.log(req.body.city)
   const temp = await weatherfinder(req.body.apikey , req.body.city) 
     console.log("temp" , temp);
     const img = await imagegenerator(temp);
     console.log("img" , img)
     res.status(200).json(img);
}) 


const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`));