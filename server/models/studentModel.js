import { Schema, model } from "mongoose";

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
    },
    educationQualification: {
      type: String,
    },
    age: {
      type: Number,
    },
    DateOfBirth: {
      type: Date,
    },
    nameOfather: {
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
    termsandconditions: {
      type: Boolean,
      required: true,
    },
    dateofAdmission: {
      type: Date,
      required: true,
    },
    admissionNo: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export const Student = model("Student", studentSchema);
