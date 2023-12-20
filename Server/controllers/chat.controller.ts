import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createChat, getAllChatService } from "../services/chat.service";
import NotificationModel from "../models/notificationModel";
import ChatModel from "../models/chat.model";

export const newChat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const members = req.body.group || [];
      const nameGroup =
        members.length === 1
          ? members[0].user.name + "-" + req.user?.name
          : members.map((user: any) => user.user.name).join(",") +
            "," +
            req.user?.name;

      const data: any = {
        nameGroup: nameGroup,
        group: [
          ...members.map((user: any) => ({ user: user.user })),
          { user: req.user },
        ],
      };

      await createChat(data, res, next);
    } catch (error: any) {
      next(new ErrorHandler(error.message, 500));
    }
  }
);

export const replyChat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req.body;
      const image = data.image;

      if (image) {
        const myCloud = await cloudinary.v2.uploader.upload(image, {
          folder: "chat",
        });
        data.image = myCloud.secure_url;
      }

      const chatId = req.params.id;

      const chat = await ChatModel.findById(chatId);

      if (!chat) {
        return next(new ErrorHandler("Không tìm thấy trò chuyện", 404));
      }

      const newMessage: any = {
        user: req.user?._id,
        message: data.message,
        image: data.image,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      chat.message.push(newMessage);

      await chat.save();

      res.status(201).json({
        success: true,
        chat,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllChat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      getAllChatService(res);
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);

export const getSingleChat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = req.params.id;
      const chat = await ChatModel.findById(chatId);
      res.status(200).json({
        success: true,
        chat,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
