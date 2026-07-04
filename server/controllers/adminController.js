import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";
import nodemailer from "nodemailer";

// Config nodemailer
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Create a new Admin
export const createAdmin = async (req, res) => {
  try {
    // get data from boady
    const { name, mobile, email, password } = req.body;

    // validate admin input
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    // check if admin already exist

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin with this email already exists" });
    }
    // hash paddword
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    // create new admin
    const adminData = new Admin({
      name,
      mobile,
      email,
      password: hashedPassword,
    });

    // save admin to database
    const saveAdmin = await adminData.save();
    const { password: _, ...adminWithoutPassword } = saveAdmin.toObject();

    // respond with success message and admin data
    res.status(201).json({
      message: "Admin created successfully",
      user: adminWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateAdmin = async (req, res) => {
  try {
    // get admin id from params and data from body
    const id = req.params.id;

    const { name, mobile, email } = req.body;

    // find admin by id
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // update admin data
    admin.name = name;
    admin.mobile = mobile;
    admin.email = email;

    // save updated admin to database
    const updatedAdmin = await admin.save();

    // response to client
    res.status(200).json({
      message: "Admin updated successfully",
      data: updatedAdmin,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all admins

export const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");

    // respond with success message and admin data
    res.status(200).json({ message: "Admins retrieved successfully", admins });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get admin by id
export const getAdmin = async (req, res) => {
  try {
    const id = req.params.id;

    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // response with success message and admin data
    res.status(200).json({ message: "Admin retrieved succesdfully", admin });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const loginAdmin = async (req, res) => {
  try {
    // get data from  body
    const { email, password } = req.body;

    // validate admin input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // check if admin exist
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // generate token
    const token = generateToken(admin, admin.role, res);

    // respond with success message and token
    res.cookie("token", token);

    const { password: _, ...adminWithoutPassword } = admin.toObject();

    // response with success message and token
    res
      .status(200)
      .json({ message: "Login successful", data: adminWithoutPassword });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logoutAdmin = async (req, res) => {
  try {
    // clear the token cookie
    res.clearCookie("token");

    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// check admin
export const verifyAdmin = async (req, res) => {
  console.log("start");
  try {
    // get id
    const id = req.admin?.id;

    if (!id) {
      return res.status(400).json({ message: "Invalid token payload" });
    }

    // get admin details
    const admin = await Admin.findById(id).select("-password");

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin account no longer exists" });
    }
    
    // Send response to frontend
    res.status(200).json({ message: "Authorized admin" });
  } catch (error) {
    // Handle catch error

    res
      .status(500)
      .json({ message: error.message || "Internal server error!" });
  }
};

// delete admin
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.body;

    // find admin by id and delete
    const admin = await Admin.findByIdAndDelete(id);

    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }

    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

/// Forgot password
export const adminForgotPassword = async (req, res) => {
  // Get admin email from body
  const { email } = req.body;
  try {
    // Find admin found
    const admin = await Admin.findOne({ email, role: "admin" });

    // Handle admin not found
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Create reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Assign to database variable
    admin.resetToken = resetToken;

    // Set token expires
    admin.resetTokenExpires = Date.now() + 10 * 60 * 1000;

    // Save to database
    await admin.save();

    // Set rest link
    const resetLink = `${process.env.CORS}/admin/reset-password/${resetToken}`;

    // Setup mail
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password reset request",
      text: `Click the link to reset your password: ${resetLink}`,
    });

    // Send response to frontend
    res.status(200).json({ message: "Reset email send!" });
  } catch (error) {
    // Handle catch error
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Reset password
export const adminResetPassword = async (req, res) => {
  // Get data from request body
  const { password } = req.body;

  // Get token from url
  const { token } = req.params;

  try {
    // Find the admin
    const admin = await Admin.findOne({
      resetToken: token,
      role: "admin",
      resetTokenExpires: { $gt: Date.now() },
    });

    // Handle admin not found
    if (!token) {
      return res
        .status(400)
        .json({ message: "Invalid token or token expired!" });
    }

    // Hashing password
    admin.password = await passwordHandler(password, undefined, res);

    // Clear tokens
    admin.resetToken = null;
    admin.resetTokenExpires = null;

    // Save admin data
    await admin.save();

    // Send response to frontend
    res.status(200).json({ message: "Password reset successful!" });
  } catch (error) {
    // Handle catch error
    res.status(500).json({ message: "Internal server error" });
  }
};
