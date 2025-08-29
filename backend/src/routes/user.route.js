import { Router } from "express";
import {
  registerValidation,
  loginValidation,
} from "../middlewares/authValidation.middleware.js";
import { registerUser, loginUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.route("/register").post(registerValidation, registerUser);
userRouter.route("/login").post(loginValidation, loginUser);

export default userRouter;
