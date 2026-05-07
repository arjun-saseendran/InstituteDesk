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
sessionRouter.post("/session", createSession);

// update session
sessionRouter.put("/session/:id", updateSession);

// get sessions
sessionRouter.get("/sessions", getSessions);

// get session
sessionRouter.get("/session/:id", getSession);

// delete session
sessionRouter.delete("/session/:id", deleteSession);
