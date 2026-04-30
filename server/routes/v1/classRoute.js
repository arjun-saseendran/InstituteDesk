import { Router } from "express";
import { createClass, deleteClass, getClass, getClasses, UpdateClass } from "../../controllers/classController.js";



// config router
export const classRouter = Router();

// create class
classRouter.post("/", createClass)

// get all classes
classRouter.get("/", getClasses)

// get single class
classRouter.get("/:id", getClass)

// update class
classRouter.put("/:id", UpdateClass)

// delete class
classRouter.delete("/:id", deleteClass)
