import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import subCategory from "../../../service/subCategory";
import category from "../../../service/category";
import Swal from "sweetalert2";


const UpdateSubCategory = () => {
  const { id } = useParams(); // Extract the subcategory ID from the URL
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    description: "",
    category: "",
  }); // State to hold the subcategory data

  const [categories, setCategories] = useState([]); // State to hold categories for the dropdown
  const token = JSON.parse(localStorage.getItem("User")).refreshToken;

  // Fetch subcategory details
  useEffect(() => {
    const fetchSubCategory = async () => {
      try {
        const response = await subCategory.findSubCategoryById(id, token);
        setData({
          name: response.name,
          description: response.description,
          category: response.category._id, // Set category to its ID
        });
      } catch (error) {
        console.error("Error fetching subcategory details:", error);
      }
    };
    const fetchCategories = async () => {
      try {
        const categoriesData = await category.getAllCategories(token);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchSubCategory();
    fetchCategories();
  }, [id]);

  // Handle input changes
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updating subcategory with data:", data); // Debugging

    try {
      await subCategory.updateSubCategory(id, data, token); // Update subcategory
      Swal.fire({
        icon: "success",
        title: "Subategory Updated!",
        text: `Subategory "${data.name}" has been updated successfully.`,
      });
      navigate("/subcategoryList"); // Redirect to the subcategory list page
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };
  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Update Subcategory</h5>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Subcategory Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
                      value={data.name}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Subcategory Description
                    </label>
                    <input
                      name="description"
                      className="form-control"
                      id="description"
                      value={data.description}
                      onChange={onChangeHandler}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Choose Category
                    </label>
                    <select
                      name="category"
                      onChange={onChangeHandler}
                      className="form-select"
                      value={data.category}
                      required
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories?.map((item) => (
                        <option key={item._id} value={item._id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Update Subcategory
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={() => navigate("/subcategoryList")}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateSubCategory;
