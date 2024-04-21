import mongoose from "mongoose";
import quizQuestionsModel from "./model.js";

export const getQuizQuestions = (quizId) =>
  quizQuestionsModel.find({ quizId: quizId });
