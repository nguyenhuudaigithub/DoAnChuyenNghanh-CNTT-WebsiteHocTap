import { Request, Response, NextFunction } from "express";
import { CatchAsyncError } from "./catchAsyncErrors";
import ErrorHandler from "../utils/ErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redis } from "../utils/redis";
import { updateAccessToken } from "../controllers/user.controller";

export { CatchAsyncError } from "./catchAsyncErrors";
 
export const isAutheticated = CatchAsyncError(
  async (req: Request, res: Response, next: NextFunction) => {
    const access_token = req.cookies.access_token as string;
 
    if (!access_token) {
      return next(
        new ErrorHandler("Vui lòng đăng nhập để thực hiện yêu cầu !", 400)
      );
    }

    const decoded = jwt.decode(
      access_token
    ) as JwtPayload;

    if (!decoded) {
      return next(new ErrorHandler("Mã truy cập không hợp lê !", 400));
    }

    // kiểm tra xem token hết hạn chưa
    if (decoded.exp && decoded.exp <= Date.now() / 1000) {
      try {
        await updateAccessToken(req, res, next);
      } catch (error) {
        return next(error);
      }
    } else {
      const user = await redis.get(decoded.id);

      if (!user) {
        return next(new ErrorHandler("Vui lòng đăng nhập để truy cập", 400));
      }

      req.user = JSON.parse(user);

      next();
    }
  }
);

export const authorizeRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Chức vụ ${req.user?.role} không được cấp quyền truy cập vào đây !`,
          403
        )
      );
    }
    next();
  };
};
