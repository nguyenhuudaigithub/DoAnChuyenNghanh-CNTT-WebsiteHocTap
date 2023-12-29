import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {  addQuestionBlog, createNewBlog, editBlog, getAllBlog, getSingleBlog } from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.post(
  "/create-blog",
  isAutheticated,
  authorizeRoles('admin'),
  createNewBlog
);
blogRouter.get("/get-all-blogs-user", isAutheticated, getAllBlog);

blogRouter.get("/get-single-blog/:id", isAutheticated, getSingleBlog);

blogRouter.put(
  "/edit-blog/:id",
  isAutheticated,
  authorizeRoles('admin'),
  editBlog
);

blogRouter.put('/add-question-blog', isAutheticated, addQuestionBlog);

// blogRouter.put('/add-anwser', isAutheticated, addAnwser);

export default blogRouter;
