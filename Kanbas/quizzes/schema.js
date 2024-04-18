import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    "course": { type: mongoose.Types.ObjectId, ref: "CourseModel" },
    "title": String,
    "availableDate": Date,
    "dueDate": Date,
    "availableUntilDate": Date,
    "points": Number,
    "questionsCount": Number,
    "isMultipleAvailableDates": Boolean,
    "isPublished": Boolean,
    "isShuffleAnswers": Boolean,
    "timeLimit": Number,
    "isMultipleAttempts": Boolean,
    "showCorrectAnswersDate": Date,
    "isOneQuestionAtATime": Boolean,
    "isWebcamRequired": Boolean,
    "isLockQuestionsAfterAnswering": Boolean
},
    { collection: "quizzes" });

export default quizSchema; 