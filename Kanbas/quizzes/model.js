import mongoose from "mongoose";
import quizSchema from "./schema.js";

const quizzesModel = mongoose.model("QuizModel", quizSchema);

export default quizzesModel;
