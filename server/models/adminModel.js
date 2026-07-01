import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
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

    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model("Admin", adminSchema);
