import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";

const registerValidation = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string().trim().lowercase().required().messages({
      "string.empty": "Username is required",
    }),
    name: Joi.string().trim().min(3).max(100).required().messages({
      "string.min": "Name must be at least 3 characters long",
      "string.max": "Name must be at most 100 characters long",
      "string.empty": "Name is required",
    }),
    email: Joi.string().trim().lowercase().email().required().messages({
      "string.email": "Invalid email format",
      "string.empty": "Email is required",
    }),
    password: Joi.string().min(5).max(100).required().messages({
      "string.min": "Password must be at least 5 characters long",
      "string.max": "Password must be at most 100 characters long",
      "string.empty": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
});

const loginValidation = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    userName: Joi.string().trim().lowercase().required().messages({
      "string.empty": "Username is required",
    }),
    password: Joi.string().min(5).max(100).required().messages({
      "string.min": "Password must be at least 5 characters long",
      "string.max": "Password must be at most 100 characters long",
      "string.empty": "Password is required",
    }),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: "Bad request",
      errors: error.details.map((err) => err.message),
    });
  }
  next();
});

export { registerValidation, loginValidation };
