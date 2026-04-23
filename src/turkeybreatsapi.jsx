import axios from "axios";

export const Turkeybreast = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data; // Return full product list (usually 20 items)
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};
