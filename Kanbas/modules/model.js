import mongoose from "mongoose";
import { lessonSchema, moduleSchema } from "./schema.js";
export const lessonModel = mongoose.model("LessonModel", lessonSchema);
export const moduleModel = mongoose.model("ModuleModel", moduleSchema);
