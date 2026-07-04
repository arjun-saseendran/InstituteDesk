import { Router } from "express";
import { createAdmin, deleteAdmin, getAdmins, getAdmin, loginAdmin, logoutAdmin, updateAdmin, adminForgotPassword, adminResetPassword, verifyAdmin } from "../../controllers/adminController.js";
import { adminAuth } from "../../middlewares/adminAuth.js";



export const adminRouter = Router();

// create admin route
adminRouter.post("/create", createAdmin)

// update admin route
adminRouter.put("/update/:id" ,adminAuth, updateAdmin)

// get all admin route
adminRouter.get("/admins", adminAuth, getAdmins)

// get admin route
adminRouter.get("/:id",adminAuth, getAdmin)

// admin login route
adminRouter.post('/login', loginAdmin)

// admin logout route
adminRouter.post('/logout', logoutAdmin)

// delete admin route
adminRouter.delete("/delete", adminAuth, deleteAdmin)

// verify admin route
adminRouter.get("/verify", verifyAdmin)

// forgot password
adminRouter.post("/forgot-password", adminForgotPassword)

// reset password
adminRouter.post("/reset-password",adminResetPassword)







