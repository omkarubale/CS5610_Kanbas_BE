import { lessonModel, moduleModel } from "./model.js";

export const createModule = (module) => {
  delete module._id;
  return moduleModel.create(module);
};

export const findAllModulesForCourse = (courseId) =>
  moduleModel.find({ courseId: courseId }).populate("lessons");

export const findModuleById = (moduleId) => {
  return moduleModel.findById(moduleId).populate("lessons");
};

export const updateModule = (moduleId, module) =>
  moduleModel.findOneAndUpdate({ _id: moduleId }, { $set: module });

export const deleteModule = (moduleId) =>
  moduleModel.deleteOne({ _id: moduleId });
