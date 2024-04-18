import mongoose from "mongoose";
import quizQuestionSchema from "./schema.js";

const model = mongoose.model("QuizQuestionModel", quizQuestionSchema);

export default model; 
