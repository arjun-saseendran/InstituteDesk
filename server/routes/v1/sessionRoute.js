import { Router } from "express";
import {
  createSession,
  deleteSession,
  getSession,
  getSessions,
  updateSession,
} from "../../controllers/sessionController.js";

// config router
export const sessionRouter = Router();

// create new session
sessionRouter.post("/", createSession);

// update session
sessionRouter.put("/:id", updateSession);

// get sessions
sessionRouter.get("/", getSessions);

// get session
sessionRouter.get("/:id", getSession);

// delete session
sessionRouter.delete("/:id", deleteSession);
