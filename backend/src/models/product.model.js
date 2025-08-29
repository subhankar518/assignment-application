import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price must be greater than or equal to 0"],
    },
    stock: {
      type: Number,
      required: true,
      min: [0, "Stock must be greater than or equal to 0"],
    },
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);
