import { lessonsModel, modulesModel } from "./model.js";
import { mongo } from "mongoose";

export const createModule = (module) => {
  delete module._id;
  return modulesModel.create(module);
};

export const findAllModulesForCourse = (courseId) =>
  modulesModel.find({ courseId: courseId }).populate("lessons");

export const findModuleById = (moduleId) => {
  return modulesModel.findById(moduleId).populate("lessons");
};

export const updateModule = (moduleId, module) =>
  modulesModel.findOneAndUpdate({ _id: moduleId }, { $set: module });

export const deleteModule = (moduleId) =>
  modulesModel.deleteOne({ _id: moduleId });

export const findLessons = (lessonIds) => {
  return lessonsModel.find({
    _id: {
      $in: lessonIds.map((lessonId) => new mongo.ObjectId(lessonId)),
    },
  });
};

export const createModuleLesson = (moduleLesson) => {
  delete moduleLesson._id;
  return lessonsModel.create(moduleLesson);
};
