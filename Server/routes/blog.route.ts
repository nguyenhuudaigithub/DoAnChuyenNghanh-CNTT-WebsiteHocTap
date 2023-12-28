import express from "express";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { createNewBlog, editBlog, getAllBlog } from "../controllers/blog.controller";

const blogRouter = express.Router();

blogRouter.post(
  "/create-blog",
  authorizeRoles("admin"),
  isAutheticated,
  createNewBlog
);

blogRouter.get("/get-all-blog", isAutheticated, getAllBlog);

blogRouter.put(
  "/edit-blog/:id",
  isAutheticated,
  authorizeRoles("admin"),
  editBlog
);

export default blogRouter;
