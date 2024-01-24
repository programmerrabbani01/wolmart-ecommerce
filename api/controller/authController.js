import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { jwtToken } from "../utils/jwt.js";
import { createActiveMail } from "../utils/createActiveMail.js";

/**
 * @desc user login
 * @route POST /api/v1/auth/login
 * @access PUBLIC
 */
const userLogin = asyncHandler(async (req, res) => {
  // get data
  const { email, password } = req.body;

  //   validation

  if (!email || !password)
    return res.status(400).json({ message: "All Fields Are Required" });

  // find login user by email

  const loginUser = await User.findOne({ email }).populate("role");

  //   user not found

  if (!loginUser)
    return res.status(400).json({ message: " Wrong Email Address " });

  // password check

  const passwordCheck = await bcrypt.compare(password, loginUser.password);

  // password matching

  if (!passwordCheck)
    return res.status(400).json({ message: " Wrong Password " });

  // create access token

  const accessToken = jwt.sign(
    { email: loginUser.email },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  // create refresh token

  // const refreshToken = jwt.sign(
  //   { email: loginUser.email },
  //   process.env.REFRESH_TOKEN_SECRET,
  //   {
  //     expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN,
  //   }
  // );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({
    accessToken,
    // refreshToken,
    user: loginUser,
    message: "User Login successful 🥳",
  });
});

/**
 * @desc user logOut
 * @route POST /api/v1/auth/logoOut
 * @access PUBLIC
 */
const userLoOut = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

/**
 * @desc user registration
 * @route POST /api/v1/auth/register
 * @access PUBLIC
 */
const userRegistration = asyncHandler(async (req, res) => {
  // get data
  const { name, email, password } = req.body;

  // check validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email existence
  const userEmailCheck = await User.findOne({ email });

  if (userEmailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // password hash
  const hashPass = await bcrypt.hash(password, 10);

  // create new user
  const user = await User.create({
    name,
    email,
    password: hashPass,
  });

  // email validation

  //active link token
  const token = jwtToken({ email: user?.email }, 1000 * 60 * 60 * 12);

  const activeLink = `${process.env.MAIL_URL}/login/${token}`;

  createActiveMail({ to: user.email, name: user.name, token: activeLink });

  res.status(200).json({
    user,
    message: "User Created successful",
  });
});

/**
 * @desc user loggedIn
 * @route GET /api/v1/auth/me
 * @access PUBLIC
 */
const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

/**
 * @desc user Account Activision
 * @route GET /api/v1/auth/active/:token
 * @access PUBLIC
 */
const userAccountActivision = asyncHandler(async (req, res) => {
  const { token } = req.params;

  const activeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!activeToken) {
    return res.status(400).json({ message: "Invalid Active link" });
  }

  const activeUser = await User.findOne({ email: activeToken.email });

  if (activeUser[0].active) {
    return res.status(400).json({ message: "your account already active. 😊" });
  } else {
    await User.findByIdAndUpdate(activeUser[0]._id, {
      active: true,
    });
    return res
      .status(200)
      .json({ message: "your account Activision successful. 😊" });
  }
});

// export

export {
  userLogin,
  userLoOut,
  userRegistration,
  loggedInUser,
  userAccountActivision,
};
