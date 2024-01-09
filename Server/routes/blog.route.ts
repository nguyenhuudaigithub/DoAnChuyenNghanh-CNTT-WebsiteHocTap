import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import {
  addAnwserBlog,
  addQuestionBlog,
  createNewBlog,
  deleteBlog,
  editBlog,
  getAdminAllBlog,
  getAllBlog,
  getSingleBlog,
} from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.post(
  "/create-blog",
  isAutheticated,
  authorizeRoles("admin"),
  createNewBlog
);
blogRouter.get("/get-all-blogs-user", getAllBlog);

blogRouter.get("/get-single-blog/:id", getSingleBlog);

blogRouter.put(
  "/edit-blogs-id/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editBlog
);

blogRouter.put("/add-question-blog", isAutheticated, addQuestionBlog);

blogRouter.put("/add-anwser-blog", isAutheticated, addAnwserBlog);

blogRouter.get(
  "/get-admin-all-blogs",
  isAutheticated,
  authorizeRoles("admin"),
  getAdminAllBlog
);

blogRouter.delete(
  '/delete-blog/:id',
  isAutheticated,
  authorizeRoles('admin'),
  deleteBlog
);
export default blogRouter;
