import { Router } from "express";
import { classRouter } from "./classRoute.js";
import {adminRouter} from "./adminRoute.js"
import { enrollmentRouter } from "./enrollmentRoute.js";

// config router
export const v1Router = Router();

v1Router.use("/class", classRouter);
v1Router.use("/admin", adminRouter)
v1Router.use("/enrollment", enrollmentRouter)
