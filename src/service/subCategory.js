import axios from "./axiosContext";

const addSubcategory = async (data, token) => {
  try {
    const newSub = await axios.post("/subCategories", data, {headers:{Authorization:`Bearer ${token}`}});
    console.log("Response from backend:", newSub.data); // Debugging

    return newSub.data;
  } catch (error) {
    console.error(
      "Error adding subcategory:",
      error.newSub?.data || error.message
    );
    throw error;
  }
};
// Fetch all subcategories
const getAllSubCategories = async () => {
  try {
    const response = await axios.get("/subCategories");
    return response.data.data;
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    throw error;
  }
};
const deleteSubcategory = async (id, token) => {
  try {
    const response = await axios.delete(`/subCategories/${id}`,{headers:{Authorization:`Bearer ${token}`}});
    return response.data.data;
  } catch (error) {
    console.error("error deleting subcategory:", error);
    throw error;
  }
};
const findSubCategoryById = async (id, token) => {
  try {
    const response = await axios.get(`/subCategories/${id}`,{headers:{Authorization:`Bearer ${token}`}});
    return response.data.data;
  } catch (error) {
    console.error("Error fetching subcategory", error);
    throw error;
  }
};
const updateSubCategory = async (id, data, token) => {
  try {
    const response = await axios.put(`/subCategories/${id}`, data, {headers:{Authorization:`Bearer ${token}`}});
    return response.data;
  } catch (error) {
    console.error("Error updating subcategory:", error);
    throw error;
  }
};
export default {
  getAllSubCategories,
  addSubcategory,
  deleteSubcategory,
  findSubCategoryById,
  updateSubCategory,
};
