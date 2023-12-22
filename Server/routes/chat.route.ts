import express from "express";
import { replyChat, newChat, getAllChat, getSingleChat } from "../controllers/chat.controller";
import { isAutheticated } from "../middleware/auth";

const chatRouter = express.Router();

chatRouter.post("/create-chat", isAutheticated, newChat);

chatRouter.put("/chat/:id", isAutheticated, replyChat);

chatRouter.post("/get-all-chat", isAutheticated, getAllChat);

chatRouter.get("/chat/:id", isAutheticated, getSingleChat);

export default chatRouter;
