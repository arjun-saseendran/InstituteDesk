import { Router } from "express";
import { createSession } from "../../controllers/sessionController.js";



// config router
export const sessionRouter = Router()

// create new session
sessionRouter.post("/",createSession)