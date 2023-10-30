import express from "express"; 
import { activateUser, loginUser, logoutUser, registrantionUser } from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
const userRouter = express.Router();

userRouter.post('/registration', registrantionUser);

userRouter.post('/activation-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', isAutheticated, logoutUser);

export default userRouter;