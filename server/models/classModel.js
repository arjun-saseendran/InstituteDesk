import { Schema, model } from "mongoose";

const classSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    category: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
      index: true
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true
    },
  },
  { timestamps: true },
);

export const Class = model("Class", classSchema)