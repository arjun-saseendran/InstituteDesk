// create session
export const createSession = async (req, res) => {
  try {
    // get data from reauest body
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
  } catch (error) {
    return res.status(500).json({ err: "internal sever error" });
  }
};
