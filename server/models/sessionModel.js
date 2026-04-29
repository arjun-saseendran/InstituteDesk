import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },

    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Session = model("Session", sessionSchema);
