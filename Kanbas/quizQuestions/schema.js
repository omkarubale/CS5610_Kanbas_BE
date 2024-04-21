import mongoose from "mongoose";

const choiceSchema = new mongoose.Schema({
  choiceText: String,
  isCorrect: Boolean,
});

const quizQuestionSchema = new mongoose.Schema(
  {
    quizId: { type: mongoose.Types.ObjectId, ref: "QuizModel" },
    quizQuestionType: Number,
    title: String,
    questionText: String,
    points: Number,
    answerChoices: { type: [choiceSchema], require: false },
    correctBooleanAnswer: { type: Boolean, require: false },
    correctBlankAnswers: { type: [String], require: false },
  },
  { collection: "quizQuestions" }
);

export default { choiceSchema, quizQuestionSchema };
