import mongoose from "mongoose";
import schema from "./schema.js";
const coursesModel = mongoose.model("CoursesModel", schema);
export default coursesModel;
