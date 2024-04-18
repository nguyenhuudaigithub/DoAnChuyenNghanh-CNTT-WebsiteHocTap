import express from 'express';
import {
  addAnwser,
  addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  generateVideoUrl,
  getAdminAllCourses,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from '../controllers/course.controller';
import { authorizeRoles, isAutheticated } from '../middleware/auth';
// import { getAdminAllCourses } from "../controllers/user.controller";
const courseRouter = express.Router();

courseRouter.post(
  '/create-course',
  isAutheticated,
  authorizeRoles('admin'),
  uploadCourse
);

courseRouter.put(
  '/edit-course/:id',
  isAutheticated,
  authorizeRoles('admin'),
  editCourse
);

courseRouter.get('/get-course/:id', getSingleCourse);

courseRouter.get('/get-courses', getAllCourses);

courseRouter.get('/get-course-content/:id', isAutheticated, getCourseByUser);

courseRouter.put('/add-question', isAutheticated, addQuestion);

courseRouter.put('/add-anwser', isAutheticated, addAnwser);

courseRouter.put('/add-review/:id', isAutheticated, addReview);

courseRouter.put(
  '/add-reply-review',
  isAutheticated,
  authorizeRoles('admin'),
  addReplyToReview
);

courseRouter.get(
  '/get-admin-all-courses',
  isAutheticated,
  authorizeRoles('admin'),
  getAdminAllCourses
);
courseRouter.delete(
  '/delete-course/:id',
  isAutheticated,
  authorizeRoles('admin'),
  deleteCourse
);

courseRouter.post('/getVdoCipherOTP', generateVideoUrl);

export default courseRouter;
