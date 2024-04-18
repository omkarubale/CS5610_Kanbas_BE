import mongoose from "mongoose";

const ChoiceSchema = new mongoose.Schema({
    "choiceText": String,
    "isCorrect": Boolean
})

const quizSchema = new mongoose.Schema({
    "quizId": { type: mongoose.Types.ObjectId, ref: "QuizModel" },
    "quizQuestionType": Number,
    "title": String,
    "questionText": String,
    "points": Number,
    "choices": { type: [ChoiceSchema], require: false },
    "correctAnswer": { type: Boolean, require: false },
    "correctAnswers": { type: [], require: false }
},
    { collection: "quizQuestions" });

export default quizSchema; 
