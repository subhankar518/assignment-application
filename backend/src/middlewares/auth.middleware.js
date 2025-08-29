import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    const authToken = req.headers["authorization"];

    if (authToken && authToken.startsWith("Bearer ")) {
      authToken = authToken.split(" ")[1];
    }

    if (!authToken) {
      return res.status(403).json({ message: "Unauthorized Request" });
    }

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET);
    const currentUser = await User.findById(decodedData?._id).select(
      "-password"
    );
    if (!currentUser) {
      return res.status(403).json({ message: "Unauthorized Request" });
    }
    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized Request" });
  }
});
