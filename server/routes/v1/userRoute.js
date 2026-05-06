import { Router } from "express";
import { createUser, deleteUser, getAllUsers, getUserbyId, loginUser, logoutUser, updateUser, verifyUser } from "../../controllers/userController.js";
import { userAuth } from "../../middlewares/userAuth.js";


export const userRouter = Router();

// create user route
userRouter.post("/create", createUser)

// update user route

userRouter.put("/update/:userid" ,userAuth, updateUser)

// get all user route

userRouter.get("/list", userAuth, getAllUsers)

// get user by id route

// user profile route
userRouter.get("/by/:id",userAuth, getUserbyId)
// user login route
userRouter.post('/login', loginUser)
// user logout route
userRouter.post('/logout', logoutUser)

// delete user route
userRouter.delete("/delete",userAuth, deleteUser)

// veryfy user route

userRouter.get("/verify", verifyUser)







