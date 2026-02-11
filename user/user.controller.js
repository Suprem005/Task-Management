import express from "express";
import User from "./user.model.js";
import bcrypt from "bcrypt";
import {
  loginUserValidationSchema,
  userValidationSchema,
} from "./user.validation.js";
import validateReqBody from "../modules/middleware/authentication.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// register user
router.post(
  "/user/register",
  validateReqBody(userValidationSchema),
  async (req, res) => {
    // extract user
    const newUser = req.body;
    // find user using email
    const user = await User.findOne({ email: newUser.email });
    // if user found throw user exists error
    if (user) {
      return res.status(409).send({ message: "Email already exists." });
    }
    // hash password
    const plainPassword = newUser.password;
    const saltRound = 10;
    const hashPassword = await bcrypt.hash(plainPassword, saltRound);

    newUser.password = hashPassword;
    // insert users

    await User.create(newUser);
    // send res

    return res
      .status(201)
      .send({ message: "User is registered successfully..." });
  },
);

// login user
router.post(
  "/user/login",
  validateReqBody(loginUserValidationSchema),
  async (req, res) => {
    // extract login credentials from req.body

    const loginCredentials = req.body;
    // find user email

    const user = await User.findOne({ email: loginCredentials.email });
    // if not user, throw error
    if (!user) {
      return res.status(404).send({ message: "Invalid credentials..." });
    }
    // compare password using bcrypt
    const plainPassword = loginCredentials.password;
    const hashedPassword = user.password;

    const isPasswordMatch = await bcrypt.compare(plainPassword, hashedPassword);
    // if password not matched, throw error
    if (!isPasswordMatch) {
      return res.status(404).send({ message: "Invalid credentials..." });
    }
    // generate access token
    const payload = { email: user.email };
    const secretKey = process.env.ACCESS_TOKEN_SECRET_KEY;
    const token = jwt.sign(payload, secretKey);

    // send res
    return res.status(200).send({
      message: "Login successful...",
      userDetails: user,
      accessToken: token,
    });
  },
);

export default router;
