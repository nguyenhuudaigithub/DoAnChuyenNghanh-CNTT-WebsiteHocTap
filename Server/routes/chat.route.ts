import express from "express";
import {
  replyChat,
  newChat,
  getSingleChat,
  editImage,
  nameGroup,
  outGroup,
  getAllChatUser,
  getAllChatAdmin,
  replyChatAdmin,
} from "../controllers/chat.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";

const chatRouter = express.Router();

chatRouter.post("/create-chat", isAutheticated, newChat);

chatRouter.put("/chat/:id", isAutheticated, replyChat);

chatRouter.put("/chat-admin/:id", isAutheticated,authorizeRoles("admin"), replyChatAdmin);

chatRouter.get("/get-all-chat-user", isAutheticated, getAllChatUser);

chatRouter.get(
  "/get-all-chat-admin",
  isAutheticated,
  authorizeRoles("admin"),
  getAllChatAdmin
);

chatRouter.get("/chat/:id", isAutheticated, getSingleChat);

chatRouter.put("/edit-image/:id", isAutheticated, editImage);

chatRouter.put("/edit-name-group/:id", isAutheticated, nameGroup);

chatRouter.post("/out-group/:id", isAutheticated, outGroup);

export default chatRouter;
