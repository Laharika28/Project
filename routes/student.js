const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser"); 
const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config({ path: './config/config.env' });
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));



