import db from "../Database/index.js";
import * as dao from "./dao.js";

function ModuleRoutes(app) {
  app.put("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      const module = req.body;
      await dao.updateModule(mid, module);
      res.sendStatus(204);
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  app.delete("/api/modules/:mid", async (req, res) => {
    try {
      const { mid } = req.params;
      db.modules = await dao.deleteModule(mid);
      res.sendStatus(204);
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  app.post("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const lessonIds = req.body.lessons.map((l) => l._id);
      req.body.lessons = [];

      const lessons = await dao.findLessons(lessonIds);

      const newModule = {
        ...req.body,
        courseId: cid,
      };
      const module = await dao.createModule(newModule);

      if (lessons.length > 0) {
        const lessonPromises = lessons.map(async (l) => {
          l.moduleId = module._id;
          const lesson = await dao.createModuleLesson(l);

          return lesson;
        });

        const newLessons = await Promise.all(lessonPromises);
        module.lessons = newLessons.map((l) => l._id);
        module.save();

        module.lessons = newLessons;
      }

      res.send(module);
    } catch (e) {
      console.log("ERROR", e);
    }
  });

  app.get("/api/courses/:cid/modules", async (req, res) => {
    try {
      const { cid } = req.params;
      const modules = await dao.findAllModulesForCourse(cid);
      console.log("modules for course ", cid, modules);
      res.send(modules);
    } catch (e) {
      console.log("ERROR", e);
    }
  });
}
export default ModuleRoutes;
