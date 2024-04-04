import db from "../Database/index.js";
function AssignmentRoutes(app) {
  app.put("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignmentIndex = db.assignments.findIndex((a) => a._id === aid);
    if (assignmentIndex === -1) {
      res.status(404).send("Assignment not found");
      return;
    }
    db.assignments[assignmentIndex] = {
      ...db.assignments[assignmentIndex],
      ...req.body,
    };
    res.sendStatus(204);
  });

  app.delete("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    db.assignments = db.assignments.filter((a) => a._id !== aid);
    res.sendStatus(200);
  });

  app.post("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const newassignment = {
      ...req.body,
      courseId: cid,
      _id: new Date().getTime().toString(),
    };
    db.assignments.push(newassignment);
    res.send(newassignment);
  });

  app.get("/api/courses/:cid/assignments", (req, res) => {
    const { cid } = req.params;
    const assignments = db.assignments.filter((a) => a.courseId === cid);
    res.send(assignments);
  });

  app.get("/api/courses/:cid/assignmentSections", (req, res) => {
    const { cid } = req.params;
    const assignmentSections = db.assignmentSections.filter(
      (a) => a.courseId === cid
    );
    res.send(assignmentSections);
  });

  app.get("/api/assignments/:aid", (req, res) => {
    const { aid } = req.params;
    const assignment = db.assignments.find((a) => a._id === aid);
    if (!assignment) {
      res.status(404).send("Assignment not found");
      return;
    }
    res.send(assignment);
  });
}
export default AssignmentRoutes;
