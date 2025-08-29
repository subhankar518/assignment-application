import { GET_ALL_PRODUCT_URL } from "../constants/apiEndPoints.js";

export const getAllProducts = async (page, limit) => {
  const url = `${GET_ALL_PRODUCT_URL}?page=${page}&limit=${limit}`;
  const headers = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  const response = await fetch(url, headers);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return await response.json();
};
