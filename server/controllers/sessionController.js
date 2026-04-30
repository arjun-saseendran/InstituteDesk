import { Session } from "../models/sessionModel.js";

// create session
export const createSession = async (req, res) => {
  try {
    // data from request body
    const { title, startTime, endTime } = req.body;

    // verify input
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ msg: "all fields required" });
    }
    // create new session object
    const newSession = new Session({
      title,
      startTime,
      endTime,
    });

    // save session object to database
    await newSession.save();

    // success response to client
    res
      .status(201)
      .json({ msg: "session created successfully", data: newSession });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "internal sever error" });
  }
};

// update session
export const updateSession = async (req, res) => {
  try {
    //get data from req body
    const { title, startTime, endTime } = req.body;

    // validate data
    if (!title || !startTime || !endTime) {
      return res.status(400).json({ err: "some field missing" });
    }

    // get session id
    const sessionId = req.params.id;

    // update session data
    const updatedSessionData = await Session.findByIdAndUpdate(
      sessionId,
      { title, startTime, endTime },
      { new: true },
    );

    // success response to client
    res
      .status(200)
      .json({
        msg: "session data updated successfully",
        data: updatedSessionData,
      });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "internal server error" });
  }
};

// get all sessions
export const getSessions = async (req, res) => {
  try {
    // get all sessions
    const sessions = await Session.find();

    // success response to client
    res
      .status(200)
      .json({ msg: "sessions data fetched successfully", data: sessions });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "failed to fetch sessions data" });
  }
};

// get single session
export const getSession = async (req, res) => {
  try {
    // get session id
    const sessionId = req.params.id;

    // get session data
    const sessionData = await Session.findById(sessionId);

    // success response to client
    res
      .status(200)
      .json({ msg: "session data fetched successfully", data: sessionData });
  } catch (error) {
    // error response to client
    return res.status(500).json({ err: "internal server error" });
  }
};

// delete session
export const deleteSession = async (req, res)=> {
  try {
    // get session id
    const sessionId = req.params.id

    // get session
    const deleteSession = Session.findByIdAndDelete(sessionId)

    // success response to client
    res.status(200).json({msg:`session with id: ${sessionId} deleted successfully`})
  } catch (error) {
    // error response to client
    return res.status(500).json({err:"internal server error"})
  }
}
