import mongoose from "mongoose";
import quizQuestionSchema from "./schema.js";

const quizQuestionsModel = mongoose.model(
  "QuizQuestionModel",
  quizQuestionSchema
);

export default quizQuestionsModel;
