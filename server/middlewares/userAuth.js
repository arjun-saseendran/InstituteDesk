import jwt from "jsonwebtoken";

export const userAuth = (req, res, next) => {
  try {
    // access token from cookies
    const { token } = req.cookies;
    //   console.log("tokken", token);

    // validate user
    if (!token) {
      return res.status(401).json({ message: "Please login" });
    }
    // decode token

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // validate token
    if (!decode) {
      return res.status(401).json({ message: "User not regsterd" });
    }
    if (decode) req.user = decode;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong please try again" });
  }
};
