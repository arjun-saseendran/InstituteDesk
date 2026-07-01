import { Student } from "../models/studentModel.js";

// Create a new student
export const createStudent = async (req, res) => {
  try {
    // get data from boady
    const {
      name,
      address,
      mobile,
      email,
      educationQualification,
      age,
      DateOfBirth,
      nameOfFather,
      nameOfGuardian,
      relationWithGuardian,
      occupationOfGuardian,
      toWhichClass,
      previousExperience,
      remark,
      termsandconditions,
      dateofAdmission,
      admissionNo,
    } = req.body;

    // validate student input
    if (
      !name ||
      !address ||
      !mobile ||
      !email ||
      !educationQualification ||
      !age ||
      !DateOfBirth ||
      !nameOfFather ||
      !nameOfGuardian ||
      !relationWithGuardian ||
      !occupationOfGuardian ||
      !toWhichClass ||
      !previousExperience ||
      !remark ||
      !termsandconditions ||
      !dateofAdmission ||
      !admissionNo
    ) {
      return res.status(400).json({ message: "All fields required" });
    }

    // check if student already exist
    const existingStudent = await Student.findOne({ email });

    if (existingStudent) {
      return res
        .status(400)
        .json({ message: "Student with this email already exists" });
    }

    // create new admin
    const studentData = new Admin({
      name,
      address,
      mobile,
      email,
      educationQualification,
      age,
      DateOfBirth,
      nameOfFather,
      nameOfGuardian,
      relationWithGuardian,
      occupationOfGuardian,
      toWhichClass,
      previousExperience,
      remark,
      termsandconditions,
      dateofAdmission,
      admissionNo,
    });

    // save student to database
    const saveStudent = await studentData.save();

    // respond with success message and admin data
    res.status(201).json({
      message: "Student created successfully",
      student: saveStudent,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updateStudent = async (req, res) => {
  try {
    // get student id from params and data from body
    const studentId = req.params.id;

    const {
      name,
      address,
      mobile,
      email,
      educationQualification,
      age,
      DateOfBirth,
      nameOfFather,
      nameOfGuardian,
      relationWithGuardian,
      occupationOfGuardian,
      toWhichClass,
      previousExperience,
      remark,
      termsandconditions,
      dateofAdmission,
      admissionNo,
    } = req.body;

    // find student by id
    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // update student data
    student.address = address;
    student.mobile = mobile;
    student.email = email;
    student.educationQualification = educationQualification;
    student.age = age;
    student.DateOfBirth = DateOfBirth;
    student.nameOfFather = nameOfFather;
    student.nameOfGuardian = nameOfGuardian;
    student.relationWithGuardian = relationWithGuardian;
    student.occupationOfGuardian = occupationOfGuardian;
    student.toWhichClass = toWhichClass;
    student.previousExperience = previousExperience;
    student.remark = remark;
    student.termsandconditions = termsandconditions;
    student.dateofAdmission = dateofAdmission;
    student.admissionNo = admissionNo;

    // save updated student to database
    const updatedStudent = await student.save();

   // respond with success message and updated student data
    res.status(200).json({
      message: "Student updated successfully",
      student: updatedStudent,
    });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get all students
export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();

    // respond with success message and students data
    res.status(200).json({ message: "Students retrieved successfully", students });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// get student
export const getStudent = async (req, res) => {
  try {
    const id = req.params.id;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // response with success message and admin data
    res.status(200).json({ message: "Student retrieved succesdfully", student });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.body;

    // find student by id and delete
    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(400).json({ message: "Student not found" });
    }
    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
