import { Router } from "express";
import { createEnrollment } from "../../controllers/enrollmentController.js";

// config router
export const enrollmentRouter = Router();

// create new enrollment
enrollmentRouter.post("/create", createEnrollment);
