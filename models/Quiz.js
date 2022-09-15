const mongoose = require('mongoose');
// const Question = require('./Question');

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


const QuizSchema = new mongoose.Schema({
    quizName: {
        type: String,
        required: true
    },
    questionDetails:[questionSchema]
  });

module.export = Quiz = mongoose.model("quiz", QuizSchema);