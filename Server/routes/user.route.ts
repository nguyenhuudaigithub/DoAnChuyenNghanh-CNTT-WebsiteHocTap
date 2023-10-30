import express from "express"; 
import { activateUser, registrantionUser } from "../controllers/user.controller";
const userRouter = express.Router();

userRouter.post('/registration', registrantionUser);

userRouter.post('/activation-user', activateUser);

export default userRouter;