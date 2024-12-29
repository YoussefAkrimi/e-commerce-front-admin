import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import product from "../../../service/products";
import subCategory from "../../../service/subCategory";
import Swal from "sweetalert2";


const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [productData, setProductData] = useState({
    name: "",
    ref: "",
    price: "",
    description: "",
    qte: "",
    galleries: [],
    subcategory: "",
  });

  const [subcategories, setSubcategories] = useState([]);
  const [error, setError] = useState("");
  const token = JSON.parse(localStorage.getItem("User")).refreshToken;

  useEffect(() => {
    const getProductDetails = async () => {
      try {
        const data = await product.getProductById(id, token);
        setProductData({
          name: data.name || "",
          ref: data.ref || "",
          price: data.price || "",
          description: data.description || "",
          qte: data.qte || "",
          galleries: Array.isArray(data.galleries) ? data.galleries : [],
          subcategory: data.subcategory?._id || "",
        });
      } catch (error) {
        setError("Error fetching product details.");
        console.error("Error fetching product details:", error);
      }
    };
    const fetchSubCategories = async () => {
      try {
        const data = await subCategory.getAllSubCategories(token);
        setSubcategories(data);
      } catch (error) {
        setError("Error fetching subcategories.");
        console.error("Error fetching subcategories:", error);
      }
    };
    getProductDetails();
    fetchSubCategories();
  }, [id]);

  // Handle input changes

  const onChangeHandler = async (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle file uploads for galleries

  const [gal, setGal] = useState({});
  const handleFileChange = (e) => {
    setGal(e.target.files);
    /* const files = Array.from(e.target.files);
    // Log the files added to galleries
    console.log("Selected Files for Galleries:", files);
    setProductData((prevData) => ({
      ...prevData,
      galleries: [...prevData.galleries, ...files],
    })); */
  };

  // Handle form submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log("Form Submitted"); // This line checks if the handler is triggered

    const formData = new FormData();
    formData.append("name", productData.name);
    formData.append("description", productData.description);
    formData.append("ref", productData.ref);
    formData.append("price", productData.price);
    formData.append("qte", productData.qte);
    formData.append("subcategory", productData.subcategory);

    for (let i = 0; i <= gal.length; i++) {
      formData.append("image", gal[i]);
    }

    // Log FormData contents
    /* for (let pair of formData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    } */

    // Log selected subcategory
    console.log("Selected subcategory:", productData.subcategory);

    try {
      const response = await product.updateProduct(id, formData, token); // Send FormData
      console.log("Backend response:", response);
      Swal.fire({
        icon: 'success',
        title: 'Product Updated Successfully',
        text: `Product "${productData.name}" has been updated successfully.`,
        confirmButtonText: 'OK',
      });
      // Reset the form state after successful product creation
      setProductData({
        name: "",
        ref: "",
        price: "",
        description: "",
        qte: "",
        galleries: [],
        subcategory: "", // Reset subcategory value to empty string or null
      });

      setProductData((prevData) => ({
        ...prevData,
        galleries: response.data.data.galleries, // Update galleries with response data
      }));
      navigate("/productsList");
    } catch (error) {
      console.error("Error updating product", error);
      Swal.fire({
        icon: 'error',
        title: 'Failed to Update Product',
        text: 'There was an error while updating your product. Please try again.',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={onSubmitHandler} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Product Name{" "}
          </label>
          <input
            name="name"
            type="text"
            className="form-control"
            id="name"
            value={productData.name} // Pre-fill with existing category name
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
            value={productData.description}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Price{" "}
          </label>
          <input
            name="price"
            type="number"
            className="form-control"
            id="price"
            value={productData.price}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            referance{" "}
          </label>
          <input
            name="ref"
            type="number"
            className="form-control"
            id="referance"
            value={productData.ref}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Quantity{" "}
          </label>
          <input
            name="qte"
            type="number"
            className="form-control"
            id="quantity"
            value={productData.qte}
            onChange={onChangeHandler}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="galleries" className="form-label">
            Product Galleries (Images)
          </label>
          <input
            name="galleries"
            type="file"
            className="form-control"
            id="galleries"
            onChange={handleFileChange}
            multiple // Allow multiple file uploads
          />
        </div>

        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Choose Subacategory
          </label>
          <select
            name="subcategory"
            onChange={onChangeHandler}
            className="form-select"
            value={productData.subcategory}
            required
          >
            <option value="" disabled>
              Select a subcategory
            </option>
            {subcategories?.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update product
        </button>
        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/productsList")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
