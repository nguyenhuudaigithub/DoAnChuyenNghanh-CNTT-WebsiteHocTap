import { Response } from "express";
import ChatModel from "../models/chat.model";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

export const createChat = CatchAsyncError(
  async (data: any, res: Response) => {
    const chat = await ChatModel.create(data);
    for (const member of data.group) {
      const userId = member.user._id;
      const user = await userModel.findById(userId);
      if (user) {
        user.chats.push(chat._id);
        await redis.set(userId, JSON.stringify(user));
        await user.save();
      }
    }

    res.status(201).json({
      success: true,
      chat,
    });
  }
);

export const getAllChatService = async (res: Response) => {
  const chats = await ChatModel.find().sort({ createdAt: -1 });
  res.status(201).json({
    success: true,
    chats,
  });
};
