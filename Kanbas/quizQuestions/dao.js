import mongoose from "mongoose";
import { quizQuestionsModel } from "./model.js";

export const getQuizQuestionsByQuizId = (quizId) =>
  quizQuestionsModel.find({ quizId: quizId });

export const createQuizQuestion = (quizId, quizQuestion) => {
  delete quizQuestion._id;
  quizQuestion.quizId = quizId;
  return quizQuestionsModel.create(quizQuestion);
};

export const deleteQuizQuestion = (quizQuestionId) => {
  quizQuestionsModel.findByIdAndDelete(quizQuestionId);
};

export const updateQuizQuestion = (quizQuestionId, quizQuestion) =>
  quizQuestionsModel.findByIdAndUpdate(quizQuestionId, quizQuestion);

export const getQuizQuestion = (quizQuestionId) =>
  quizQuestionsModel.findById(quizQuestionId);
