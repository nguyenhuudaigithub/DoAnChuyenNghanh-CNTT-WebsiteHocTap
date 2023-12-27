import express from "express";
import {
  replyChat,
  newChat,
  getAllChat,
  getSingleChat,
  editImage,
  nameGroup,
  outGroup,
} from "../controllers/chat.controller";
import { isAutheticated } from "../middleware/auth";

const chatRouter = express.Router();

chatRouter.post("/create-chat", isAutheticated, newChat);

chatRouter.put("/chat/:id", isAutheticated, replyChat);

chatRouter.post("/get-all-chat", isAutheticated, getAllChat);

chatRouter.get("/chat/:id", isAutheticated, getSingleChat);

chatRouter.put("/edit-image/:id", isAutheticated, editImage);

chatRouter.put("/edit-name-group/:id", isAutheticated, nameGroup);

chatRouter.post("/out-group/:id", isAutheticated, outGroup);

export default chatRouter;
