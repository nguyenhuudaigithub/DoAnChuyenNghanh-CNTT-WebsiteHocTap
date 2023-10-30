import express from "express"; 
import { registrantionUser } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.post('/registration', registrantionUser);

export default userRouter;