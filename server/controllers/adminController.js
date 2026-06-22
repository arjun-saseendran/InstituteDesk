import { Admin } from "../models/adminModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/token.js";

// Create a new Admin

export const createAdmin = async (req, res) => {
  try {
    // get data from boady
    const { name, address, mobile, email, password, isActive } = req.body;
    
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
      address,
      mobile,
      email,
      password: hashedPassword,
      isActive,
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
    const adminId = req.params.id;

    const { name, address, mobile, email, password, isActive } = req.body;

    //  validate fieleds
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "Name, email and password are required" });
    }

    // find admin by id
    const admin = await Admin.findById(id);

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // update admin data

    admin.name = name;
    admin.address = address;
    admin.mobile = mobile;
    admin.email = email;

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin.password = hashedPassword;
    admin.isActive = isActive;
    

    // save updated admin to database
    const updatedAdmin = await admin.save();

    const { password: _, ...adminWithoutPassword } = updatedAdmin.toObject();
    // respond with success message and updated admin data
    res.status(200).json({
      message: "Admin updated successfully",
      user: adminWithoutPassword,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all admins

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");

    // respond with success message and admin data
    res.status(200).json({ message: "Admins retrieved successfully", admins });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get admin by id
export const getAdminbyId = async (req, res) => {
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

    // admin status check
    if (!admin.isActive) {
      return res.status(403).json({
        message: "Admin account is inactive. Please contact administrator.",
      });
    }

    // generate token
    const token = generateToken(user, user.roll, res);

    // respond with success message and token
    res.cookie("token", token);

    const { password: _, ...adminWithoutPassword } = admin.toObject();

    // response with success message and token
    res
      .status(200)
      .json({ message: "Login successful", token, user: adminWithoutPassword });
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

// user verify middleware

export const verifyAdmin = async (req, res) => {
  try {
    // get token from cookie
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // send response
    res.status(200).json({ message: "Admin is authenticated" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
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
