const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser"); 
const dotenv = require('dotenv');
const url = require("url");
dotenv.config({ path: './config/config.env' });
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));

//importing middleware
const { ensureAuth, ensureGuest } = require('../middleware/auth');

app.get("/", ensureGuest ,(req, res) => {
    res.render('login');
});

app.get("/log",ensureAuth, async(req,res)=>{
    var userInfo = req.user;
    if(userInfo.userType == "Teacher"){
        res.render('teacher',{userinfo : userInfo});
    }else{
        // res.render('student',{userinfo : userInfo});
        res.redirect(url.format({
            pathname:"/student/login",
            query:{
                userinfo:userInfo
            }
      }));
    }
});

module.exports=app;
