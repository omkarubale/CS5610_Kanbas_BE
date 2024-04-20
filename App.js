import express from "express";
import Hello from "./Hello.js";
import Lab5 from "./Lab5.js";
import cors from "cors";
import CourseRoutes from "./Kanbas/courses/routes.js";
import ModuleRoutes from "./Kanbas/modules/routes.js";
import AssignmentRoutes from "./Kanbas/assignments/routes.js";
import QuizRoutes from "./Kanbas/quizzes/routes.js";
import UserRoutes from "./Users/routes.js";
import SetupRoutes from "./Kanbas/setup/routes.js";
import mongoose from "mongoose";
import session from "express-session";
import "dotenv/config";

const MONGODB_URL = process.env.MONGODB_URL;
const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;

mongoose.connect(
  `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@${MONGODB_URL}`
);
const app = express();
app.use(
  cors({
    credentials: true,
    origin: [
      process.env.FRONTEND_URL,
      /^https:\/\/[0-9A-Za-z]+--omkarubale-cs5610-kanbas\.netlify\.app$/,
    ],
  })
);
app.use(express.json());
const port = process.env.PORT || 4000;

const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.HTTP_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions));

SetupRoutes(app);
UserRoutes(app);
CourseRoutes(app);
ModuleRoutes(app);
AssignmentRoutes(app);
QuizRoutes(app);
Hello(app);
Lab5(app);

app.listen(port);
