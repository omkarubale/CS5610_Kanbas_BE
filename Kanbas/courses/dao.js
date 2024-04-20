import coursesModel from "./model.js";

export const createCourse = (course) => {
  delete course._id;
  return coursesModel.create(course);
};

export const findAllCourses = () => coursesModel.find();

export const findCourseById = (courseId) => coursesModel.findById(courseId);

export const updateCourse = (courseId, course) =>
  coursesModel.findOneAndUpdate({ _id: courseId }, { $set: course });

export const deleteCourse = (courseId) =>
  coursesModel.deleteOne({ _id: courseId });
