import { Product } from "../models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    const existingProduct = await Product.findOne({ name: name.trim() });
    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Product with this name already exists" });
    }

    const newProduct = await Product.create({
      name: name.trim(),
      description: description.trim(),
      price,
      stock,
    });

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export const getAllProducts = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(limit) || limit < 1) limit = 10;

  const skip = (page - 1) * limit;

  const products = await Product.find()
    .sort({ createdAt: -1 }) // latest first
    .skip(skip)
    .limit(limit);

  const totalProducts = await Product.countDocuments();
  const totalPages = Math.ceil(totalProducts / limit);

  res.status(200).json({
    message: "Products fetched successfully",
    page,
    limit,
    totalPages,
    totalProducts,
    products,
  });
});

export const searchProduct = asyncHandler(async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    //case-insensitive
    const products = await Product.find({
      name: { $regex: keyword, $options: "i" },
    });

    res.status(200).json({
      message: "Search results",
      results: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});

export const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
});
