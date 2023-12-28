import { Response } from "express";
import BlogModel from "../models/blog.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";

// create blog
export const createBlog = CatchAsyncError(
  async (data: any, res: Response) => {
    const blog = await BlogModel.create(data);
    res.status(201).json({
      success: true,
      blog,
    });
  }
);

//get all blog
export const getAllBlogsService = async (res: Response) => {
  const blog = await BlogModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    blog,
  });
};
