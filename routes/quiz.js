const express = require('express');
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser"); 
const dotenv = require('dotenv');
const mongoose = require("mongoose");
dotenv.config({ path: './config/config.env' });
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI);

const questionSchema = new mongoose.Schema({
    questionType: {
        type: String,
        required: true
    },
    questionName: {
        type: String,
        required: true
    },
    optionA : String,
    optionB : String,
    optionC : String,
    optionD :  String,
    minChar:  String,
    maxChar :  String,
    ansValue: String,
    points: {
        type: String,
        required: true
    }
});

const Question = mongoose.model("Question",questionSchema);

const QuizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    questionDetails:[questionSchema]
  });

  const Quiz = mongoose.model("Quiz",QuizSchema);

app.post("/createQuiz",(req,res)=>{
    var quizName = req.body.quizName;
    res.redirect("/createQuiz/" + quizName);
});

app.get("/createQuiz/:customQuizName",(req,res)=>{
    const quizName = req.params.customQuizName;
    Quiz.findOne({quizName: quizName},function(err,foundQuiz){
        if(!err){
          if(!foundQuiz){
            //Create a new Quiz
            const quiz = new Quiz({
              quizName: quizName,
              questionDetails: []
            });
    
            quiz.save();
            res.redirect("/createQuiz/" + quizName);
          }else{
            //Show an existing Quiz
    
            res.render("createQuiz", {
              quizName: foundQuiz.quizName ,
              questionsList : foundQuiz.questionDetails
            });
          }
        }
      });
});

app.post("/addQuestion",(req,res)=>{
    const question = new Question({
        questionType: req.body.questionType,
        questionName: req.body.questionName,
        optionA : req.body.optionA,
        optionB : req.body.optionB,
        optionC : req.body.optionC,
        optionD : req.body.optionD,
        minChar:  req.body.minChar,
        maxChar :  req.body.maxChar,
        ansValue: req.body.ansValue,
        points: req.body.points
    });
    let quizName = req.body.quizName;
    Quiz.findOne({quizName:quizName},(err,foundQuiz)=>{
        if(!err){
            foundQuiz.questionDetails.push(question);
            foundQuiz.save();
            res.redirect("/createQuiz/" + quizName);
        }
    });
});

app.post("/question/delete",(req,res)=>{
    const quizName = req.body.quizName;
    const questionID = req.body.ques;
    Quiz.findOneAndUpdate({quizName: quizName},{$pull:{questionDetails:{_id: questionID }}},function(err,foundQuiz){
        if(!err){
          res.redirect("/createQuiz/" + quizName);
        }
      });
});

app.get("/student/login",(req,res)=>{
  var passedVariable = req.query.userinfo;

  Quiz.find({},(err,foundQuiz)=>{
    if(!err){
      res.render("student",{
        userinfo: passedVariable,
        quizList : foundQuiz
      });
    }
  });
});

app.post("/student/quizstart",(req,res)=>{
  const quizName = req.body.quizName;
  Quiz.findOne({quizName: quizName},(err,foundQuiz)=>{
    if(!err){
      res.render("quizStart",{
        quizId : foundQuiz._id,
        quizName : foundQuiz.quizName,
        questions : foundQuiz.questionDetails
      });
    }
  });
});

module.exports=app;
