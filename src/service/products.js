import axios from "./axiosContext";

const addProduct = async (data, token) => {
  try {
    const addProduct = await axios.post("/product",data,{headers:{Authorization:`Bearer ${token}`}});
    return addProduct.data;
  } catch (error) {
    console.error("error adding products", error);
    throw error.response.data.message; // Return error message to the caller
  }
};
const getAllProducts = async () => {
  try {
    const response = await axios.get("/product");
    console.log("API response:", response); // Log the API response
    return response.data.data;
  } catch (error) {
    console.error("error fetching all products", error);
  }
};
const getProductById = async (id, token) => {
  try {
    const response = await axios.get(`/product/${id}`,{headers:{Authorization:`Bearer ${token}`}});
    return response.data.data;
  } catch (error) {
    console.error("error fetching prodcut by id", error);
  }
};
const deleteProduct = async (id, token) => {
  try {
    const response = await axios.delete(`/product/${id}`,{headers:{Authorization:`Bearer ${token}`}});
    return response.data.data;
  } catch (error) {
    console.error("error deleting product", error);
    throw new Error("Failed to delete product");

  }
};
const updateProduct = async (id, data, token) => {
  try {
    const response = await axios.put(`/product/${id}`, data,{headers:{Authorization:`Bearer ${token}`}});
    return response.data.data;
  } catch (error) {
    console.error("error updating product", error);
    throw new Error("Failed to update product");

  }
};
export default {
  addProduct,
  getAllProducts,
  getProductById,
  deleteProduct,
  updateProduct,
};
