import mongoose from "mongoose";
import { quizzesModel } from "./model.js";
import { quizQuestionsModel } from "./../quizQuestions/model.js";

export const getAllQuizzesByCourseId = (courseId) =>
  quizzesModel.find({ courseId: courseId });

export const createQuiz = (courseId, quiz) => {
  delete quiz._id;
  quiz.courseId = courseId;
  return quizzesModel.create(quiz);
};

export const deleteQuiz = (quizId) => {
  quizzesModel.findByIdAndDelete(quizId);
  quizQuestionsModel.deleteMany({ quizId: quizId });
};

export const updateQuiz = (quizId, quiz) =>
  quizzesModel.findByIdAndUpdate(quizId, quiz);

export const getQuizDetails = (quizId) => quizzesModel.findById(quizId);
