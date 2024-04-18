import mongoose from "mongoose";
import model from "./model.js";

export const getQuizQuestions = (quizId) =>
    model.find({ quizId: mongoose.Types.ObjectId.createFromHexString(quizId) });