import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

import userRouter from "./routes/user.route.js";
import productRouter from "./routes/product.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

export { app };
