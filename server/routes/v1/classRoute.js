import { Router } from "express";
import { createClass, deleteClass, getClass, getClasses, UpdateClass } from "../../controllers/classController.js";



// config router
export const classRouter = Router();

// create class
classRouter.post("/class", createClass)

// get all classes
classRouter.get("/classes", getClasses)

// get single class
classRouter.get("/class/:id", getClass)

// update class
classRouter.put("/class/:id", UpdateClass)

// delete class
classRouter.delete("/class/:id", deleteClass)
