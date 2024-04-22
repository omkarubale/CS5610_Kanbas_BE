import * as dao from "./dao.js";

export default function QuizRoutes(app) {
  const findQuizQuestionsByQuizId = async (req, res) => {
    try {
      const { qid } = req.params;
      const quizQuestions = await dao.getQuizQuestionsByQuizId(qid);
      if (!quizQuestions) {
        res.status(404).send("Quiz Questions not found");
        return;
      }
      res.send(quizQuestions);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const findQuizQuestion = async (req, res) => {
    try {
      const { qqid } = req.params;
      const quizQuestions = await dao.getQuizQuestion(qqid);
      if (!quizQuestions) {
        res.status(404).send("Quiz not found");
        return;
      }
      res.send(quizQuestions);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const createQuizQuestion = async (req, res) => {
    try {
      const { qid } = req.params;
      const quiz = await dao.createQuizQuestion(qid, req.body);
      res.json(quiz);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const deleteQuizQuestion = async (req, res) => {
    try {
      const { qqid } = req.params;
      const status = await dao.deleteQuizQuestion(qqid);
      res.json(status);
    } catch (e) {
      console.log("Error: ", e);
    }
  };
  const updateQuizQuestion = async (req, res) => {
    try {
      const { qqid } = req.params;
      const status = await dao.updateQuizQuestion(qqid, req.body);
      res.json(status);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const updateQuizQuestions = async (req, res) => {
    try {
      const { qid } = req.params;
      const newQuizQuestions = req.body;
      const oldQuizQuestions = await dao.getQuizQuestionsByQuizId(qid);

      const promises = [];

      // create and update
      for (let i = 0; i < newQuizQuestions.length; i++) {
        let matchFound = false;

        for (let j = 0; j < oldQuizQuestions.length; j++) {
          if (newQuizQuestions[i]._id === oldQuizQuestions[j]._id.toString()) {
            // update
            matchFound = true;
            promises.push(
              await dao.updateQuizQuestion(
                newQuizQuestions[i]._id,
                newQuizQuestions[i]
              )
            );
            break;
          }
        }

        if (matchFound === false) {
          // create
          delete newQuizQuestions[i]._id;
          promises.push(
            await dao.createQuizQuestion(
              newQuizQuestions[i].quizId,
              newQuizQuestions[i]
            )
          );
        }
      }

      // delete
      for (let j = 0; j < oldQuizQuestions.length; j++) {
        let matchFound = false;
        for (let i = 0; i < newQuizQuestions.length; i++) {
          if (newQuizQuestions[i]._id === oldQuizQuestions[j]._id.toString()) {
            matchFound = true;
            break;
          }
        }

        if (matchFound === false) {
          // delete
          promises.push(
            await dao.deleteQuizQuestion(oldQuizQuestions[j]._id.toString())
          );
        }
      }

      await Promise.all(promises);
      res.json(204);
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  app.get("/api/quizzes/:qid/questions", findQuizQuestionsByQuizId);
  app.post("/api/quizzes/:qid/quizQuestion", createQuizQuestion);
  app.get("/api/quizQuestions/:qqid", findQuizQuestion);
  app.delete("/api/quizQuestions/:qqid", deleteQuizQuestion);
  app.put("/api/quizQuestions/:qqid", updateQuizQuestion);
  app.post("/api/quizzes/:qid/quizQuestions/bulkEdit", updateQuizQuestions);
}
