import { Router } from "express";
import { createClass, deleteClass, getClass, getClasses, UpdateClass } from "../../controllers/classController.js";



// config router
export const classRouter = Router();

// create class
classRouter.post("/create", createClass)

// get all classes
classRouter.get("/classes", getClasses)

// get single class
classRouter.get("/:id", getClass)

// update class
classRouter.put("/update/:id", UpdateClass)

// delete class
classRouter.delete("/delete/:id", deleteClass)
