import { Schema, model } from "mongoose";

const sessionSchema = new Schema(
  {
    title: String,
    required: true,
    miniLength: 3,
    maxLength: 30,
  },
  {
    startTime: String,
    required: true,
  },
  {
    endTime: String,
    required: true,
  },
  { timestamp: true },
);

export const Session = model("Session", sessionSchema);
