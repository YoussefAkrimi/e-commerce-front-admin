import axios from "./axiosContext";

// Function to fetch categories
const getAllCategories = async () => {
  try {
    const response = await axios.get("/categories");
    return response.data.data; // Assuming the categories are in the 'data' field
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error; // Re-throw the error to handle it in the component
  }
};
const addCategory = async (data, token) => {
  try {
    const addCategory = await axios.post("/categories", data ,{headers:{Authorization:`Bearer ${token}`}});
    return addCategory.data;
  } catch (error) {
    console.error("error adding category", error);
    throw error;
  }
};
const deleteCategory = async (id, token) => {
  try {
    const response = await axios.delete(`/categories/${id}` ,{headers:{Authorization:`Bearer ${token}`}});
    return response.data.data;
  } catch (error) {
    console.error("error deleting category:", error);
    throw error;
  }
};

const getCategoryById = async (id, token) => {
  try {
    const response = await axios.get(`/categories/${id}`,{headers:{Authorization:`Bearer ${token}`}});
    return response.data.data;
  } catch (error) {
    console.error("Error fetching category", error);
    throw error;
  }
};
const updateCategory = async (FormData, id, token) => {
  try {
    const response = await axios.put(`/categories/${id}`, FormData,{headers:{Authorization:`Bearer ${token}`}});
    console.log("Response from API:", response); // Log the response for debugging
    return response.data.data;
  } catch (error) {
    console.error("error updating category:", error);
    throw error;
  }
};
export default {
  getAllCategories,
  addCategory,
  deleteCategory,
  updateCategory,
  getCategoryById,
};
