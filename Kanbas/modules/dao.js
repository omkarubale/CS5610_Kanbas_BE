import { lessonsModel, modulesModel } from "./model.js";

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
