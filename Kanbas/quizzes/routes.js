import db from "../Database/index.js";

function QuizRoutes(app) {
  app.get("/api/courses/:cid/quizzes", (req, res) => {
    const { cid } = req.params;
    const quizzes = db.quizzes
      .filter((q) => q.courseId === cid)
      .map((q) => {
        const quiz = {
          _id: q._id,
          courseId: q.courseId,
          title: q.title,
          assignmentGroup: q.assignmentGroup,
          availableDate: q.availableDate,
          dueDate: q.dueDate,
          points: q.points,
          questionsCount: q.questionsCount,
          isMultipleAvailableDates: q.isMultipleAvailableDates,
          isPublished: q.isPublished,
        };
        return quiz;
      });
    res.send(quizzes);
  });

  app.get("/api/quizzes/:qid", (req, res) => {
    const { qid } = req.params;
    const quizDetails = db.quizzes.find((q) => q._id === qid);
    if (!quizDetails) {
      res.status(404).send("Quiz not found");
      return;
    }
    res.send(quizDetails);
  });

  app.post("/api/quizzes/:qid/publish", (req, res) => {
    const { qid } = req.params;
    const quizIndex = db.quizzes.findIndex((q) => q._id === qid);
    if (quizIndex === -1) {
      res.status(404).send("Quiz not found");
      return;
    }

    const { isPublished } = req.body;
    console.log(isPublished);

    db.quizzes[quizIndex] = {
      ...db.quizzes[quizIndex],
      isPublished: isPublished,
    };
    res.sendStatus(204);
  });

  app.get("/api/quizzes/:qid/questions", (req, res) => {
    const { qid } = req.params;
    const questions = db.quizQuestions
      .filter((q) => q.quizId === qid);

    res.send(questions);
  })
}

export default QuizRoutes;
