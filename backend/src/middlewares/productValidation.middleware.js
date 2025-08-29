import Joi from "joi";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addProductValidation = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().trim().required().messages({
      "string.empty": "Product name is required",
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": "Description is required",
    }),
    price: Joi.number().min(0).required().messages({
      "number.base": "Price must be a number",
      "number.min": "Price must be greater than or equal to 0",
      "any.required": "Price is required",
    }),
    stock: Joi.number().min(0).required().messages({
      "number.base": "Stock must be a number",
      "number.min": "Stock must be greater than or equal to 0",
      "any.required": "Stock is required",
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
