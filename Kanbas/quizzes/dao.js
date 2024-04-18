import mongoose from "mongoose";
import model from "./model.js";

export const getAllQuizzesByCourseId = (courseId) =>
    model.find({ course: courseId });

export const createQuiz = (courseId, quiz) => {
    delete quiz._id; // delete id if being passed by UI 
    quiz.course = mongoose.Types.ObjectId.createFromHexString(courseId);
    return model.create(quiz);
}

export const deleteQuiz = (quizId) =>
    model.deleteOne({ _id: mongoose.Types.ObjectId.createFromHexString(quizId) });

export const updateQuiz = (quizId, quiz) =>
    model.updateOne({ _id: mongoose.Types.ObjectId.createFromHexString(quizId) }, { $set: quiz });

export const getQuizDetails = (quizId) =>
    model.findOne({ _id: mongoose.Types.ObjectId.createFromHexString(quizId) });