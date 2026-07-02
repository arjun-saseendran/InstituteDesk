import { Enrollment } from "../models/enrollmentModel.js";


// create enrollment
export const createEnrollment = async (req, res) => {
  try {
    // data from request body
    const { studentId, classId } = req.body;

    // validate data
    if (!studentId || !classId) {
      return res.status(400).json({ err: "all fields required" });
    }

    // create new enrollment object
    const newEnrollment = new Enrollment({
      studentId,
      classId,
      });

    // save enrollment to database
    await newEnrollment.save();

    // success response to client
    res.status(201).json({ msg: "enrollment created successfully", data: newEnrollment });
  } catch (error) {
    // send error response to client
    return res.status(500).json({ err: "failed to create enrollment" });
  }
};