import Product from "../models/Product";

export const fetchProducts = async (): Promise<Product[]> => {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  if (!response) {
    throw new Error("Failed to fetch products");
  }

  return data.products;
};
