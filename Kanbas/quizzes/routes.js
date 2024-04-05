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
}

export default QuizRoutes;
