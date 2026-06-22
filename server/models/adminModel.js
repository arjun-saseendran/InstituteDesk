import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    address: {
      type: String,
    },
    mobile: {
      type: String,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "admin"
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model("Admin", adminSchema);
