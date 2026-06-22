import { Schema, model } from "mongoose";

const adminSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlenght: 3,
      maxlenght: 50,
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
      minlenght: 6,
    },
    isActive: {
      type: Boolean,
      default: null,
    },
    role: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const Admin = model("Admin", adminSchema);
