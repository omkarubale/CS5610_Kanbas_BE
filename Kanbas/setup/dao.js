import db from "./../Database/index.js";
import coursesModel from "./../courses/model.js";
import { modulesModel, lessonsModel } from "../modules/model.js";

export const repopulateData = async (isTesting) => {
  await coursesModel.deleteMany({});
  await modulesModel.deleteMany({});
  await lessonsModel.deleteMany({});
  if (!isTesting) {
  }

  for (const c of db.courses) {
    const _courseId = c._id;
    delete c._id;

    const course = await coursesModel.create(c);
    console.log("course created: ", course);

    const modulePromises = db.modules
      .filter((m) => m.courseId == _courseId)
      .map(async (m) => {
        const _moduleId = m._id;
        delete m._id;
        const _lessons = m.lessons;
        delete m.lessons;

        m.courseId = course._id;
        m.lessons = [];

        const module = await modulesModel.create(m);
        console.log("module created: ", module);

        if (_lessons) {
          const lessonPromises = _lessons.map(async (l) => {
            const _lessonId = l._id;
            delete l._id;
            l.moduleId = module._id;

            const lesson = await lessonsModel.create(l);
            console.log("lesson created: ", lesson);

            // reset lesson data
            l._id = _lessonId;
            l.moduleId = _moduleId;

            return lesson._id;
          });

          const lessonIds = await Promise.all(lessonPromises);

          module.lessons = lessonIds;
          await module.save();

          console.log("lessons added to module: ", lessonIds);
        }

        // reset module data
        m._id = _moduleId;
        m.courseId = _courseId;
        m.lessons = _lessons;

        return module;
      });

    // reset course data
    c._id = _courseId;

    await Promise.all(modulePromises);
  }
};
