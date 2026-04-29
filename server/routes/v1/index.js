import { Router } from "express";
import { sessionRouter } from "./sessionRoute.js";


// config router
export const v1Router = Router()

v1Router.use("/session", sessionRouter)