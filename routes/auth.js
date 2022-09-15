//Importing required modules 
const express = require('express');
const ejs = require("ejs");
const passport = require('passport');
// const router = express.Router();

const app = express();
app.set('view engine','ejs');

app.get('/google', passport.authenticate('google', { scope: ['profile','email'] }));

app.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
      res.redirect('/log');
});

app.get('/logout', (req, res) => {
    req.logout((err) => {
        if(err){
          console.log(err);
        }else{
          res.redirect("/log");
        }
      });
    res.redirect("/");
});
  
module.exports = app;