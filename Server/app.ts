// require("dotenv").config();
// import express, { NextFunction, Request, Response } from "express";
// export const app = express();
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import {ErrorMiddleware} from "./middleware/error";
// import userRouter from "./routes/user.route";
// app.use(express.json({ limit: "50mb" }));

// app.use(cookieParser());

// app.use(
//   cors({
//     // origin: ["http://localhost:3000"],
//     // credentials: true,
//     origin: process.env.ORIGIN,
//   })
// );

// // routes

// app.use(
//   "/api/v1",
//   userRouter
// //   orderRouter,
// //   courseRouter,
// //   notificationRoute,
// //   analyticsRouter,
// //   layoutRouter
// );
// // app.use('/api/v1', courseRouter);

// app.get("/test", (req: Request, res: Response, next: NextFunction) => {
//   res.status(200).json({
//     success: true,
//     message: "API is working",
//   });
// });

// app.all("*", (req: Request, res: Response, next: NextFunction) => {
//   const err = new Error(`Route ${req.originalUrl} khong tim thay`) as any;
//   err.statusCode = 404;
//   next(err);
// });

// app.use(ErrorMiddleware);

require("dotenv").config();
import express, { NextFunction, Request, Response } from "express";
export const app = express();
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error";
import userRouter from "./routes/user.route";

app.use(express.json({ limit: "50mb" }));

app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    // origin: process.env.ORIGIN,
  })
);

// routes

app.use("/api/v1", userRouter,);
// app.use('/api/v1', courseRouter);

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

app.use(ErrorMiddleware);
