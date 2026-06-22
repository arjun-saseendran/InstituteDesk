import { Router } from "express";
import {
  createStudent,
  deleteStudent,
  getStudents,
  getStudent,
  updateStudent,
} from "../../controllers/studentController.js";
import { adminAuth } from "../../middlewares/adminAuth.js";

export const studentRouter = Router();

// create student route
studentRouter.post("/create", adminAuth, createStudent);

// update student route
studentRouter.put("/update/:id", adminAuth, updateStudent);

// get all students route
studentRouter.get("/students", adminAuth, getStudents);

// get student route
studentRouter.get("/:id", adminAuth, getStudent);

// delete student route
studentRouter.delete("/delete", adminAuth, deleteStudent);
