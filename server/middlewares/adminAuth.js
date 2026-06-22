import jwt from "jsonwebtoken";

export const adminAuth = (req, res, next) => {
  try {
    // access token from cookies
    const { token } = req.cookies;

    // validate admin
    if (!token) {
      return res.status(401).json({ message: "Please login" });
    }
   
    // decode token
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    // validate token
    if (!decode) {
      return res.status(401).json({ message: "Admin not regsterd" });
    }
    if (decode) req.admin = decode;

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "something went wrong please try again" });
  }
};
