import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = asyncHandler(async (req, res) => {
  try {
    const { userName, name, email, password } = req.body;

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res
        .status(409)
        .json({ message: "User is already exist", success: false });
    }

    const newUser = new User({ userName, name, email, password });

    newUser.password = await bcrypt.hash(password, 10);

    await newUser.save();

    res.status(201).json({
      message: "User Registered Successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  try {
    console.log("1");
    const { userName, password } = req.body;

    const existedUser = await User.findOne({ userName });

    if (!existedUser) {
      return res
        .status(403)
        .json({ message: "Invalid credentials", success: false });
    }

    console.log("2");
    const isPasswordCurrect = await bcrypt.compare(
      password,
      existedUser.password
    );

    console.log("isPasswordCurrect", isPasswordCurrect);
    if (!isPasswordCurrect) {
      return res
        .status(403)
        .json({ message: "Invalid credentials", success: false });
    }

    console.log("3");
    const jwtToken = jwt.sign(
      {
        email: existedUser.email,
        _id: existedUser._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "12h" }
    );

    const userObject = existedUser.toObject();
    const { password: _, ...userWithoutSensitiveFields } = userObject;

    res.status(200).json({
      message: "Login Successfull.",
      success: true,
      JWT_Token: jwtToken,
      user: userWithoutSensitiveFields,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export { registerUser, loginUser };
