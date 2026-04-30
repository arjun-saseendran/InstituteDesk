import { Class } from "../models/classModel.js";

// create class
export const createClass = async (req, res) => {
  try {
    // data from request body
    const { title, category, price, sessionId } = req.body;

    // validate data
    if (!title || !category || !price || !sessionId) {
      return res.status(400).json({ err: "all fields required" });
    }

    // create new class object
    const newClass = new Class({
      title,
      category,
      price,
      sessionId,
    });

    // save class to database
    await newClass.save();

    // success response to client
    res.status(201).json({ msg: "class created successfully", data: newClass });
  } catch (error) {
    // send error response to client
    return res.status(500).json({ err: "failed to create class" });
  }
};

// get all classes
export const getClasses = async (req, res) => {
  try {
    // get classes data
    const classes = await Class.find();

    // success response to client
    res
      .status(200)
      .json({ msg: "classes data fetched successfully", data: classes });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "failed get classes data" });
  }
};

// get single class
export const getClass = async (req, res) => {
  try {
    // get class id
    const classId = req.params.id;

    // find class
    const singleClass = await Class.findById(classId);

    // success response to client
    res
      .status(200)
      .json({ msg: "class data fetched successfully", data: singleClass });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "failed to get class data" });
  }
};

// delete class
export const deleteClass = async (req, res) => {
  try {
    // get class id
    const classId = req.params.id;

    // find class and delete
    const deleteClass = await Class.findByIdAndDelete(classId);

    // success response to client
    res.status(200).json({ msg: `deleted class with id ${classId}` });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "failed to delete class" });
  }
};

// update class
export const UpdateClass = async (req, res) => {
  try {
    // data from req.body
    const { title, category, price, sessionId } = req.body;

    // validate data
    if (!title || !category || !price || !sessionId) {
      // error response to client
      return res.status(400).json({ err: "some field missing" });
    }

    // get class id
    const classId = req.params.id;

    // update data
    const updatedClass = await Class.findByIdAndUpdate(
      classId,
      {
        title,
        category,
        price,
        sessionId,
      },
      { new: true },
    );

    // success response to client
    res
      .status(200)
      .json({ msg: "class data updated successfully", data: updatedClass });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "failed to update class data" });
  }
};
