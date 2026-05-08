import { Schema, model } from "mongoose";

const enrollmentSchema = new Schema(
  {
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
      index: true,
    },
    sessionId: {
      type: Schema.Types.ObjectId,
      ref: "Session",
      required: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default:"active"
    },
    
  },
  { timestamps: true },
);

export const Enrollment = model("Enrollment", enrollmentSchema);
