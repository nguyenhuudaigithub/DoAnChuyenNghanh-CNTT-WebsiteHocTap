import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createBlog, getAllBlogsService } from "../services/blog.service";
import BlogModel from "../models/blog.model";
import { redis } from "../utils/redis";
import NotificationModel from "../models/notificationModel";
import ejs from "ejs";
import sendMail from "../utils/sendMail";
import path from "path";
import userModel from "../models/user.model";

// create new blog
export const createNewBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const thumbnail = data.thumbnail;

      // console.log(data);
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

      await redis.set(blogId, JSON.stringify(blog));

      res.status(201).json({
        success: true,
        blog,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
//get all blog - user
export const getAllBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blog = await BlogModel.find({ display: true }).select(
        "title description thumbnail tags updatedAt"
      );

      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all blog -- only for admin
export const getAdminAllBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllBlogsService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

// detele blog -- only for admin
export const deleteBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const blog = await BlogModel.findById(id);
      if (!blog) {
        return next(new ErrorHandler("Bài viết không hợp lệ!", 404));
      }
      await blog.deleteOne({ id });
      await redis.del(id);
      res.status(200).json({
        success: true,
        message: "Xóa bài viết thành công!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getSingleBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const blogId = req.params.id;

      const isCacheExist = await redis.get(blogId);

      if (isCacheExist) {
        const blog = JSON.parse(isCacheExist);
        return res.status(200).json({
          success: true,
          blog,
        });
      } else {
        const blog = await BlogModel.findById(req.params.id);

        await redis.set(blogId, JSON.stringify(blog));

        res.status(200).json({
          success: true,
          blog,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

interface IAddQuestionData {
  question: string;
  blogId: string;
}

export const addQuestionBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { question, blogId }: IAddQuestionData = req.body;
      const idUser = req.user?._id;

      const user = await userModel
        .findById(idUser)
        .select("_id name email avatar");
      const blog = await BlogModel.findById(blogId);

      const newQuestion: any = {
        user: user,
        question,
        questionReplies: [],
      };

      if (!blog) {
        return next(new ErrorHandler("Không tìm bài viết", 400));
      } else {
        blog.questions.push(newQuestion);

        await NotificationModel.create({
          user: req.user?._id,
          title: "Câu hỏi mới",
          message: `Bạn có một câu hỏi mới từ bài viết "${blog?.title}"`,
        });

        await blog?.save();

        await redis.set(blogId, JSON.stringify(blog));

        res.status(200).json({
          success: true,
          blog,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

interface IAddAnswerData {
  answer: string;
  blogId: string;
  questionId: string;
}

export const addAnwserBlog = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { answer, blogId, questionId }: IAddAnswerData = req.body;
      const idUser = req.user?._id;

      const user = await userModel
        .findById(idUser)
        .select("_id name email avatar");
      const blog = await BlogModel.findById(blogId);

      const question = blog?.questions?.find((item: any) =>
        item._id.equals(questionId)
      );

      if (!question) {
        return next(new ErrorHandler("Không tìm thấy bình luận!", 400));
      }

      const newAnswer: any = {
        user: user,
        answer,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      question.questionReplies?.push(newAnswer);

      await blog?.save();

      await redis.set(blogId, JSON.stringify(blog));

      if (idUser === question.user._id) {
        await NotificationModel.create({
          user: req.user?._id,
          title: "Trả lời mới.",
          message: `Bạn có một câu trả lời trong bài viết ${blog?.title}`,
        });
      } else {
        const data = {
          name: question.user.name,
          title: blog?.title,
        };
        // console.log(data);
        const html = await ejs.renderFile(
          path.join(__dirname, "../mails/question-reply-blog.ejs"),
          data
        );

        try {
          await sendMail({
            email: question.user.email,
            subject: "Trả lời câu hỏi",
            template: "question-reply-blog.ejs",
            data,
          });
        } catch (error: any) {
          return next(new ErrorHandler(error.message, 500));
        }
      }
      res.status(200).json({
        success: true,
        blog,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
