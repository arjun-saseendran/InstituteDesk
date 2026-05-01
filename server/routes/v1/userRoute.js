import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserbyId, loginUser, logoutUser, updateUser, verifyUser } from "../../controllers/userController.js";


export const userRouter = Router();

// create user route
userRouter.post("/create", createUser)

// update user route

userRouter.put("/update/:userid" , updateUser)

// get all user route

userRouter.get("/list", getAllUsers)

// get user by id route

// user profile route
userRouter.get("/by/:id", getUserbyId)
// user login route
userRouter.post('/login', loginUser)
// user logout route
userRouter.post('/logout', logoutUser)

// delete user route
userRouter.delete("/delete", deleteUser)

// veryfy user route

userRouter.get("/verify", verifyUser)







