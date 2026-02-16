import jwt from "jsonwebtoken";
import User from "../../user/user.model.js";

// checking for if user?
export const isUser = async (req, res, next) => {
  // extract token from req.headers
  const { authorization } = req.headers;

  const splittedArray = authorization?.split(" ");
  const token = splittedArray?.length === 2 ? splittedArray[1] : null;
  next();

  // if no token, throw unauthorized error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized..." });
  }

  let payload;
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    // decrypt token
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    // if decryption fails, throw error
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // find user using email from payload

  const user = await User.findOne({ email: payload.email });
  // if not user, then throw error

  if (!user) {
    return res.status(401).send({ message: "Unauthorized..." });
  }
};
// ----------------------------------------
// role checking for admin
export const isAdmin = async (req, res, next) => {
  // extract token from req.headers
  const { authorization } = req.headers;

  const splittedArray = authorization?.split(" ");
  const token = splittedArray?.length === 2 ? splittedArray[1] : null;
  next();

  // if no token, throw unauthorized error
  if (!token) {
    return res.status(401).send({ message: "Unauthorized..." });
  }
  // verify token
  let payload;
  try {
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    // decrypt token
    payload = jwt.verify(token, secretKey);
  } catch (error) {
    // if decryption fails, throw error
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // find user using email from payload

  const user = await User.findOne({ email: payload.email });
  // if not user, then throw error

  if (!user) {
    return res.status(401).send({ message: "Unauthorized..." });
  }

  // if not admin, then throw error
  if (user.role !== "admin") {
    return res.status(401).send({ message: "Unauthorized" });
  }

  // add user._id as loggedInUserId
  req.loggedInUserId = user._id;

  // call next function
  next();
};

// ---------------------------
//! role checking for normal user
export const isNormalUser = async (req, res, next) => {
  try {
    // extract token from req.headers
    const { authorization } = req.headers;

    const splittedArray = authorization?.split(" ");
    const token = splittedArray?.length === 2 ? splittedArray[1] : null;

    // if no token, throw unauthorized error
    if (!token) {
      throw new Error();
    }
    // verify token
    let payload;
    try {
      const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
      // decrypt token
      payload = jwt.verify(token, secretKey);
    } catch (error) {
      // if decryption fails, throw error
      throw new Error();
    }

    // find user using email from payload

    const user = await User.findOne({ email: payload.email });
    // if not user, then throw error

    if (!user) {
      throw new Error();
    }

    // check role for normal user
    if (user.role !== "user") {
      throw new Error();
    }
    // add user._id as loggedInUserId
    req.loggedInUserId = user._id;

    // call next function
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unauthorized..." });
  }
};
