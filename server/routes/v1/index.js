import { Router } from "express";
import { sessionRouter } from "./sessionRoute.js";
import { classRouter } from "./classRoute.js";
import {userRouter} from "./userRoute.js"
import { enrollmentRouter } from "./enrollmentRoute.js";

// config router
export const v1Router = Router();

v1Router.use("/session", sessionRouter);
v1Router.use("/class", classRouter);
v1Router.use("/user", userRouter)
v1Router.use("/enrollment", enrollmentRouter)
