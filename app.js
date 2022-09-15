const express = require('express');
const mongoose=require('mongoose');
const dotenv = require('dotenv');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const ejs = require("ejs");
require('./config/passport')(passport);

var app=express();
const PORT = process.env.PORT||3000;
dotenv.config({ path: './config/config.env' });

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser:true,
    useUnifiedTopology: true
});
app.use(express.static('public'));
app.set('view engine','ejs');

app.use(express.urlencoded({extended:true}));
app.use(
    session({
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ 
        mongoUrl: process.env.MONGO_URI
      }),
    })
);
  
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(require("./routes/index"));
app.use(require("./routes/quiz"));
app.use('/auth', require('./routes/auth'));
app.listen(PORT,console.log(`listening at ${PORT}`));
