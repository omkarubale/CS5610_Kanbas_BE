import db from "./../Database/index.js";
import coursesModel from "./../courses/model.js";
import { modulesModel, lessonsModel } from "../modules/model.js";
import { quizzesModel } from "../quizzes/model.js";
import { quizQuestionsModel } from "../quizQuestions/model.js";

const quizTemplate = {
  courseId: "RS101",
  title: "Quiz A",
  quizType: 1,
  availableDate: "2023-01-05",
  availableUntilDate: "2023-01-10",
  dueDate: "2023-01-10",
  points: 10,
  questionsCount: 5,
  isMultipleAvailableDates: false,
  isPublished: false,
  isShuffleAnswers: false,
  timeLimit: 20,
  isMultipleAttempts: false,
  showCorrectAnswersDate: "2021-01-11",
  isOneQuestionAtATime: false,
  isWebcamRequired: false,
  isLockQuestionsAfterAnswering: false,
};

const quizQuestionTemplate = {
  quizId: "1",
  quizQuestionType: 1,
  title: "MCQ 1",
  questionText: "MCQ Text 1",
  points: 2,
};

const generateQuizes = async (courseId) => {
  const quiz1 = generateQuiz(courseId, quizTemplate, 1, "Quiz A", 5);
  const quiz2 = generateQuiz(courseId, quizTemplate, 1, "Quiz B", 4);
  const quiz3 = generateQuiz(courseId, quizTemplate, 1, "Quiz C", 3);

  return await Promise.all([quiz1, quiz2, quiz3]);
};

const generateQuiz = async (
  courseId,
  quizTemplate,
  quizType,
  quizTitle,
  questionsCountPerType
) => {
  const _quiz = JSON.parse(JSON.stringify(quizTemplate));
  _quiz.quizType = quizType;
  _quiz.courseId = courseId;
  _quiz.title = quizTitle;
  _quiz.questionsCount = questionsCountPerType * 3;

  console.log("attempting create: ", _quiz);
  const quiz = await quizzesModel.create(_quiz);
  console.log("quiz created: ", quiz);

  const mcqQuestions = await generateQuizQuestions(
    quiz._id,
    1,
    questionsCountPerType
  );
  const booleanQuestions = await generateQuizQuestions(
    quiz._id,
    2,
    questionsCountPerType
  );
  const blankQuestions = await generateQuizQuestions(
    quiz._id,
    3,
    questionsCountPerType
  );

  await Promise.all([mcqQuestions, booleanQuestions, blankQuestions]);

  return quiz;
};

const generateQuizQuestions = async (
  quizId,
  questionType,
  questionsCountPerType
) => {
  const quizQuestions = [];

  for (let i = 0; i < questionsCountPerType; i++) {
    const _quizQuestion = quizQuestionTemplate;
    let questionTypeString = "";
    switch (questionType) {
      case 1:
        questionTypeString = "MCQ ";
        break;
      case 2:
        questionTypeString = "True/False ";
        break;
      case 3:
        questionTypeString = "Fill in the Blank ";
        break;
      default:
        throw new Error("Question type not implemented!");
    }

    _quizQuestion.quizId = quizId;
    _quizQuestion.quizQuestionType = questionType;
    _quizQuestion.title =
      questionTypeString + "Quiz Question " + (i + 1).toString();
    _quizQuestion.questionText =
      questionTypeString + "Question Text " + (i + 1).toString();
    _quizQuestion.points = 2;

    if (questionType === 1) {
      // MCQ
      _quizQuestion.answerChoices = [
        { choiceText: "Choice 1", isCorrect: true },
        { choiceText: "Choice 2", isCorrect: false },
        { choiceText: "Choice 3", isCorrect: false },
      ];
    } else if (questionType === 2) {
      // Boolean
      _quizQuestion.correctBooleanAnswer = true;
    } else if (questionType === 3) {
      // Blank
      _quizQuestion.correctBlankAnswers = [
        "Correct Answer 1",
        "Correct Answer 2",
        "Correct Answer 3",
      ];
    }

    console.log("attempting create: ", _quizQuestion);
    const quizQuestion = await quizQuestionsModel.create(_quizQuestion);
    console.log("quizQuestion created: ", quizQuestion);

    quizQuestions.push(quizQuestion);

    delete _quizQuestion.answerChoices;
    delete _quizQuestion.correctBooleanAnswer;
    delete _quizQuestion.correctBlankAnswers;
  }
  return await Promise.all(quizQuestions);
};

export const repopulateData = async () => {
  await coursesModel.deleteMany({});
  await modulesModel.deleteMany({});
  await lessonsModel.deleteMany({});
  await quizzesModel.deleteMany({});
  await quizQuestionsModel.deleteMany({});

  for (const c of db.courses) {
    const _courseId = c._id;
    delete c._id;

    const course = await coursesModel.create(c);
    console.log("course created: ", course);

    // populate modules for course
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

    await Promise.all(modulePromises);

    // TODO: populate assignments for course
    // TODO: populate grades for course

    // populate quizzes for course
    await generateQuizes(course._id);

    // reset course data
    c._id = _courseId;
  }
};
