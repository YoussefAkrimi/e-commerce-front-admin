import React, { useEffect, useState } from "react";
import category from "../../../service/category";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const { id } = useParams(); // Get category ID from URL params
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  // Fetch the existing category data when component mounts
  useEffect(() => {
    const getCategoryById = async () => {
      const token = JSON.parse(localStorage.getItem("User")).refreshToken;

      try {
        const response = await category.getCategoryById(id, token); // Call the service to get category data
        console.log("Fetched category data:", response); // Log the fetched data

        setData({
          name: response.name,
          description: response.description,
          image: response.image, // Set the image if necessary
        });
      } catch (error) {
        console.error("Error fetching category!");
      }
    };
    getCategoryById();
  }, [id]);

  // Handle text inputs
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  // Handle image input
  const onChangeImage = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };
  // Form submission handler
  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Prepare FormData
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    if (data.image) formData.append("image", data.image); // Only append if image is selected
    console.log("Form data before submission:", formData); // Log FormData for debugging

    const token = JSON.parse(localStorage.getItem("User")).refreshToken;

    // Call the updateCategory function
    category
      .updateCategory(formData, id, token)
      .then((res) => {
        console.log("Category updated:", res.data);
        Swal.fire({
          icon: "success",
          title: "Category Updated!",
          text: `Category "${data.name}" has been updated successfully.`,
        });
        /* setData({});
        e.target.reset(); // Clear the form */ //these are no longer needed because the user will be redirected to another page, so it will be cleared auto
        navigate("/categoryList"); // Redirect to category list after update
      })
      .catch((error) => {
        console.error(
          "Error updating category:",
          error.response ? error.response.data : error.message
        );
      });
  };
  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name{" "}
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            value={data.name} // Pre-fill with existing category name
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            description{" "}
          </label>
          <input
            name="description"
            type="text"
            className="form-control"
            id="description"
            value={data.description}
            onChange={onChangeHandler}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            upload image{" "}
          </label>
          <input
            name="image"
            type="file"
            className="form-control"
            id="image"
            onChange={onChangeImage}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update Category
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/categoryList")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateCategory;
