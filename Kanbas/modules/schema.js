import { Schema } from "mongoose";
import mongoose from "mongoose";

export const lessonSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    moduleId: { type: Schema.ObjectId, ref: "ModulesModel" },
  },
  { collection: "moduleLessons" }
);

export const moduleSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    courseId: { type: Schema.ObjectId, ref: "CoursesModel" },
    lessons: [{ type: Schema.ObjectId, ref: "LessonsModel" }],
  },
  { collection: "modules" }
);
