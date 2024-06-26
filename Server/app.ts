require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";
import courseRouter from "./routes/course.route";
import orderRouter from "./routes/order.route";
import notificationRouter from "./routes/notification.route";
import analyticsRouter from "./routes/analytics.route";
import layoutRouter from "./routes/layout.route";
import examRouter from "./routes/exam.route";
import chatRouter from "./routes/chat.route";
import blogRouter from "./routes/blog.route";
import { rateLimit } from "express-rate-limit";

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());
app.use(compression());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    // origin: process.env.ORIGIN,
  })
);

//api request limit
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

// routes

app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);
app.use("/api/v1", orderRouter);
app.use("/api/v1", notificationRouter);
app.use("/api/v1", analyticsRouter);
app.use("/api/v1", layoutRouter);
app.use("/api/v1", examRouter);
app.use("/api/v1", chatRouter);
app.use("/api/v1", blogRouter);

app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Route ${req.originalUrl} khong tim thay`) as any;
  err.statusCode = 404;
  next(err);
});

// middleware calls
app.use(limiter);

app.use(ErrorMiddleware);
