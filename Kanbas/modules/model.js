import mongoose from "mongoose";
import { lessonSchema, moduleSchema } from "./schema.js";
export const lessonsModel = mongoose.model("LessonsModel", lessonSchema);
export const modulesModel = mongoose.model("ModulesModel", moduleSchema);
