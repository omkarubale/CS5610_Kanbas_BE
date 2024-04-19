import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  app.get("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const course = await dao.findCourseById(id);
      if (!course) {
        res.status(404).send("Course not found");
        return;
      }
      res.send(course);
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  app.put("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const course = req.body;
      await dao.updateCourse(id, course);
      res.sendStatus(204);
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  app.delete("/api/courses/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await dao.deleteCourse(id);
      res.sendStatus(204);
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  app.post("/api/courses", async (req, res) => {
    try {
      const course = await dao.createCourse(req.body);
      res.send(course);
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  app.get("/api/courses", async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.send(courses);
    } catch (e) {
      console.log("ERROR", e);
    }
  });
}
