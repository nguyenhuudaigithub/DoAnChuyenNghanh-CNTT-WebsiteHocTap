import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createChat } from "../services/chat.service";
import ChatModel from "../models/chat.model";
import userModel from "../models/user.model";

export const newChat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatAdmin = req.body?.chatAdmin;
      const email = req.body?.email || [];
      const userCheck = await userModel.findOne({ email }).lean();
      const userMe = req.user;

      function findCommonObjects(array1: any, array2: any) {
        if (array1 && array2) {
          return array1.filter((obj1: any) =>
            array2.some((obj2: any) => obj1.chatId === obj2.chatId)
          );
        } else return false;
      }
    
      if (userCheck && !chatAdmin) {
        // old chat - email input and user login, chatAdmin false, userCheck(email) 
        const groupId = findCommonObjects(userCheck?.chats, userMe?.chats);
        // console.log(groupId);

        if (groupId) {
          res.status(401).json({
            error: true,
            message: "Chuyển tới cửa sổ trò chuyện!",
            groupId,
          });
        } else {
          // new chat  - userCheck(email) true and chatAdmin false
          const data: any = {
            nameGroup: "Trò Chuyện",
            group: [{ user: userCheck }, { user: userMe }],
            chatAdmin: false,
          };
          await createChat(data, res, next);
        }
      } else if (!userCheck && !chatAdmin) {
        res.status(400).json({
          error: true,
          message: "Không tìm thấy người dùng!",
        });
      } else if (!userCheck && chatAdmin) {
        //chatAdmin- chatAdmin true and email null
        const data: any = {
          nameGroup: "Tư Vấn",
          group: { user: userMe },
          chatAdmin: true,
        };
        await createChat(data, res, next);
      }
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
      const chatAdmin = req.body.chatAdmin;

      if (chatAdmin) {
        const userCheck = await ChatModel.find({ chatAdmin });
        res.status(200).json({
          success: true,
          data: userCheck,
        });
      } else {
        const userChats = req.user?.chats || [];

        const chatIds = userChats.map((chat: any) => chat._id);
        const chatsFromModel = await ChatModel.find({ _id: { $in: chatIds } });

        res.status(200).json({
          success: true,
          data: chatsFromModel,
        });
      }
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
