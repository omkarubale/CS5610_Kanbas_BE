import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const findQuizQuestions = async (req, res) => {
    try {
      const { qid } = req.params;
      const quizQuestions = await dao.getQuizQuestions(qid);
      if (!quizQuestions) {
        res.status(404).send("Quiz Questions not found");
        return;
      }
      res.send(quizQuestions);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  app.get("/api/quizzes/:qid/questions", findQuizQuestions);
}
