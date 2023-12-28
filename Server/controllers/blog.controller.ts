import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createBlog } from "../services/blog.service";
import BlogModel from "../models/blog.model";

// create new blog
export const createNewBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      console.log(data)
      if (thumbnail) {
        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "blog",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      createBlog(data, res, next);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit blog
export const editBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;

      const thumbnail = data.thumbnail;

      const blogId = req.params.id;

      const blogData = (await BlogModel.findById(blogId)) as any;
     
      if (thumbnail && !thumbnail.startsWith("https")) {
        await cloudinary.v2.uploader.destroy(blogData.thumbnail.public_id);

        const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
          folder: "blog",
        });

        data.thumbnail = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }

      if (thumbnail.startsWith("https")) {
        data.thumbnail = {
          public_id: blogData?.thumbnail.public_id,
          url: blogData?.thumbnail.url,
        };
      }

      const blog = await BlogModel.findByIdAndUpdate(
        blogId,
        {
          $set: data,
        },
        { new: true }
      );

      res.status(201).json({
        success: true,
        blog,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blog = await BlogModel.find().select("title description thumbnail");

      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
