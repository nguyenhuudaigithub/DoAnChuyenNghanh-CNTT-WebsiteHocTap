import { NextFunction, Request, Response } from "express";
import { CatchAsyncError } from "../middleware/catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import cloudinary from "cloudinary";
import { createChat } from "../services/chat.service";
import ChatModel from "../models/chat.model";
import userModel from "../models/user.model";
import { redis } from "../utils/redis";

type CompareResult = string[];

export const newChat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatAdmin = req.body?.chatAdmin;
      const email = req.body?.email;

      // select data - email add chat and user login
      const userCheck = await userModel
        .findOne({ email })
        .select("_id name email avatar chats");
      const userMe = {
        _id: req.user?._id,
        name: req.user?.name,
        email: req.user?.email,
        avatar: req.user?.avatar,
        chats: req.user?.chats,
      };

      // id chat in table user (user.chats)
      const chatIdMe = userMe.chats
        ? userMe.chats.map((chat: any) => chat._id.toString())
        : [];
      const chatIdYou = userCheck?.chats.map((chat: any) =>
        chat._id.toString()
      );
      let number, idCheck;
      if (userCheck && !chatAdmin) {
        // old chat - check idchat email input and user login - if chatAdmin false, userCheck(email) true
        const groupId: CompareResult = compareArrays(chatIdYou, chatIdMe);
        for (const id of groupId) {
          const searchChat = await ChatModel.findById(id).select("group");
          if (searchChat && searchChat.group.length == 2) {
            number = searchChat.group.length;
            idCheck = id;
          }
        }
        if (
          groupId.length > 0 &&
          chatIdMe.length > 0 &&
          chatIdYou != null &&
          number == 2 &&
          idCheck
        ) {
          // console.log(idCheck);
          res.status(401).json({
            error: true,
            message: "Chuyển tới cửa sổ trò chuyện!",
            idCheck,
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
          message: "Người dùng không tồn tại!",
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

const compareArrays = (
  array1: string[] | undefined,
  array2: string[] | undefined
): string[] => {
  if (!array1 || !array2) {
    return [];
  }

  const result: string[] = [];

  for (const element of array1) {
    if (array2.includes(element)) {
      result.push(element);
    }
  }

  return result;
};

// rep inbox and add new members in group chat
export const replyChat = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = req.params.id;
      const userId = req.user?._id;
      const data = req.body;
      
      // console.log(chatId)
      // console.log()

      const chat = await ChatModel.findById(chatId);
      const userIds = chat?.group.map((chat: any) =>
        chat?.user?._id.toString()
      );
      // compare user login and user in group chat
      const checkUser: CompareResult = compareArrays([userId], userIds);

      //check the chat in the database
      if (!chat) {
        res.status(201).json({
          error: true,
          message: "Không tìm thấy nhóm trò chuyện!",
        });
      }
      //check user login - (null not invalid - user login is not in group chat), checkUser.length > 0 true
      else if (checkUser.length > 0) {
        
       
        const email = req.body?.email;
        const chatAdmin = chat.chatAdmin
        //check add new user in group or rep message
        if (email) {
          // select data - email add chatk
          const userCheck = await userModel
            .findOne({ email })
            .select("_id name email avatar chats");
          //check userCheck valid (email in table user )
          if (userCheck) {
            const userId = userCheck?._id.toString();
            const checkUserInGroup: CompareResult = compareArrays(
              [userId],
              userIds
            );
            // user not in group
            if (checkUserInGroup.length == 0) {
              // check message - if message.lengt > 0 and chat.group.length == 2 -> new Chat else add users to a group
              if (chat.message.length > 0 && chat.group.length == 2) {
                const data: any = {
                  nameGroup: "Trò Chuyện Nhóm",
                  group: [...chat.group, { user: userCheck }],
                  chatAdmin: false,
                };

                await createChat(data, res, next);
              } else {
                const user = await userModel.findById(userId);
                user?.chats.push(chat._id.toString());
                await redis.set(userId, JSON.stringify(user));
                await user?.save();

                const newGroup: any = {
                  user: userCheck,
                  createdAt: new Date().toISOString(),
                  updatedAt: new Date().toISOString(),
                };

                chat.group.push(newGroup);

                await chat.save();

                res.status(201).json({
                  error: true,
                  message: "Thêm người dùng thành công!",
                  chat,
                });
              }
            } else {
              res.status(406).json({
                error: true,
                message: "Người dùng đã có trong nhóm trò chuyện!",
              });
            }
          } else {
            res.status(406).json({
              error: true,
              message: "Người dùng không tồn tại!",
            });
          }
        }  else {
          const image = data.image;

          if (image) {
            const myCloud = await cloudinary.v2.uploader.upload(image, {
              folder: "chat",
            });
            data.image = myCloud.secure_url;
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
            error: false,
            message: "......",
            chat,
          });
        }
      } 
      // if(chat?.chatAdmin == true && req.user?.role == "admin") {
      //   const image = data.image;

      //     if (image) {
      //       const myCloud = await cloudinary.v2.uploader.upload(image, {
      //         folder: "chat",
      //       });
      //       data.image = myCloud.secure_url;
      //     }

      //     const newMessage: any = {
      //       user: req.user?._id,
      //       message: data.message,
      //       image: data.image,
      //       createdAt: new Date().toISOString(),
      //       updatedAt: new Date().toISOString(),
      //     };

      //     chat.message.push(newMessage);

      //     await chat.save();

      //     res.status(201).json({
      //       error: false,
      //       message: "......",
      //       chat,
      //     });
      // } 
      else {
        res.status(201).json({
          error: true,
          message: "Bạn không thuộc nhóm chat!",
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
export const replyChatAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = req.params.id;
      const data = req.body;
      const chat = await ChatModel.findById(chatId);
      
      if(chat?.chatAdmin == true && req.user?.role == "admin") {
        const image = data.image;

          if (image) {
            const myCloud = await cloudinary.v2.uploader.upload(image, {
              folder: "chat",
            });
            data.image = myCloud.secure_url;
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
            error: false,
            message: "......",
            chat,
          });
      } 
      
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// get all chat
export const getAllChatUser = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userChats = req.user?.chats || [];

      const chatIds = userChats.map((chat: any) => chat._id);
      const chatsFromModel = await ChatModel.find({ _id: { $in: chatIds } });

      res.status(200).json({
        success: true,
        data: chatsFromModel,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 400));
    }
  }
);
// admin and user
export const getAllChatAdmin = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const chatAdmin = true;
    try {
      const userCheck = await ChatModel.find({ chatAdmin });
      res.status(200).json({
        success: true,
        data: userCheck,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

// get chat
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

// edit image group chat
export const editImage = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// edit name group chat
export const nameGroup = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = req.params.id;
      const newNameG = req.body.nameGroup;

      await ChatModel.findByIdAndUpdate(chatId, { nameGroup: newNameG });

      res.status(200).json({
        success: true,
        message: "Đổi tên nhóm thành công",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const outGroup = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const chatId = req.params.id.toString();
      const idUser = req.user?._id.toString();

      const user = await userModel.findById(idUser);

      if (user) {
        user.chats = user.chats.filter((chat: any) => chat._id != chatId);
        // console.log(user.chats);
        const chat = await ChatModel.findById(chatId);

        if (chat) {
          chat.group = chat.group.filter(
            (group: any) => group.user._id.toString() !== idUser
          );
          await chat.save();
        }

        await redis.set(idUser, JSON.stringify(user));
        await user.save();

        await user.save();

        return res.status(200).json({
          success: true,
          message: "Rời nhóm chat thành công!",
        });
      }

      res.status(402).json({
        success: false,
        message: "Rời nhóm chat thất bại!",
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
