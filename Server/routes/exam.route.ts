import express from 'express';
import { authorizeRoles, isAutheticated } from '../middleware/auth';
import {
  addExam,
  addQuestionToExam,
  deleteExamById,
  deleteQuestionToExam,
  editExamById,
  editQuestionToExam,
  getAllExams,
  getExamById,
} from '../controllers/exam.controller';

const examRouter = express.Router();

// add exam
examRouter.post(
  '/add-exam',
  // isAutheticated, authorizeRoles('admin'),
  addExam
);

// get all exams
examRouter.post(
  '/get-all-exams',
  //   isAutheticated,
  //   authorizeRoles('admin'),
  getAllExams
);

// get exam by id
examRouter.post(
  '/get-exam-by-id',
  //   isAutheticated,
  //   authorizeRoles('admin'),
  getExamById
);

// edit exam by id
examRouter.post(
  '/edit-exam-by-id',
  //   isAutheticated,
  //   authorizeRoles('admin'),
  editExamById
);

// delete exam by id
examRouter.post(
  '/delete-exam-by-id',
  // isAutheticated,
  // authorizeRoles('admin'),
  deleteExamById
);

// add question to exam
examRouter.post(
  '/add-question-to-exam',
  // isAutheticated,
  // authorizeRoles('admin'),
  addQuestionToExam
);

// edit question to exam
examRouter.post(
  '/edit-question-to-exam',
  // isAutheticated,
  // authorizeRoles('admin'),
  editQuestionToExam
);

// delete question to exam
examRouter.post(
  '/delete-question-to-exam',
  // isAutheticated,
  // authorizeRoles('admin'),
  deleteQuestionToExam
);

export default examRouter;
