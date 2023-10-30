import express from "express"; 
import { activateUser, getUserInfo, loginUser, logoutUser, registrantionUser, socialAuth, updateAccessToken } from "../controllers/user.controller";
import { authorizeRoles, isAutheticated } from "../middleware/auth";
import { refreshTokenOptions } from "../utils/jwt";
const userRouter = express.Router();

userRouter.post('/registration', registrantionUser);

userRouter.post('/activation-user', activateUser);

userRouter.post('/login', loginUser);

userRouter.get('/logout', isAutheticated, logoutUser);

userRouter.get('/refreshtoken', updateAccessToken);

userRouter.get('/me', isAutheticated, getUserInfo);

userRouter.post('/  ', socialAuth);


export default userRouter;