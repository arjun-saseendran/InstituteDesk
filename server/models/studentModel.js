import { Schema, model } from "mongoose";
import { Counter } from "./counterModel.js";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 50,
    },
    address: {
      type: String,
      required: true,
      minlength: 5,
    },
    mobile: {
      type: String,
      required: true,
      unique: true,
      minlength: 10,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
    },
    role: {
      type: String,
      default: "student",
    },
    educationQualification: {
      type: String,
    },
    age: {
      type: Number,
    },
    dateOfBirth: {
      type: Date,
    },
    nameOfFather: {
      type: String,
      required: true,
      minlenght: 3,
    },
    nameOfGuardian: {
      type: String,
      required: true,
      minlenght: 3,
    },
    relationWithGuardian: {
      type: String,
    },
    occupationOfGuardian: {
      type: String,
    },
    toWhichClass: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      require: true,
      index: true,
    },
    previousExperience: {
      type: String,
      enum: ["YES", "NO"],
    },
    remark: {
      type: String,
    },
    termsAndConditions: {
      type: Boolean,
      required: true,
    },
    dateofAdmission: {
      type: Date,
      required: true,
    },
    admissionNo: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

studentSchema.pre("save", async function () {
  const student = this;

  if (student.isNew && !student.admissionNo) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { id: "student_admission_no" },
        { $inc: { seq: 1 } },
        { returnDocument: "after", upsert: true },
      );

      const currentYear = new Date().getFullYear();
      const paddedSequence = String(counter.seq).padStart(4, "0");
      student.admissionNo = `ADM-${currentYear}-${paddedSequence}`;
    } catch (error) {
      console.error("CRITICAL ERROR IN PRE-SAVE HOOK:", error.message);
      throw error;
    }
  }
});

export const Student = model("Student", studentSchema);
