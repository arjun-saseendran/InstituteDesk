import { Router } from "express";
import { sessionRouter } from "./sessionRoute.js";
import { classRouter } from "./classRoute.js";

// config router
export const v1Router = Router();

v1Router.use("/session", sessionRouter);
v1Router.use("/class", classRouter);
