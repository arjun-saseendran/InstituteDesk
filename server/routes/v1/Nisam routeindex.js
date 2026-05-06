import { Router } from "express";
import { userRouter } from "./userRoute.js";


// config router
export const 

v1Router = Router()

v1Router.use("/user",userRouter)