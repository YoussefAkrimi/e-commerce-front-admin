import React, { useEffect, useState } from "react";
import subCategory from "../../../service/subCategory";
import category from "../../../service/category";
import Swal from 'sweetalert2';

const SubCategory = () => {
  const [data, setData] = useState({});
  
  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior (page reload).
    const token = JSON.parse(localStorage.getItem("User")).refreshToken;

    try {
      const response = await subCategory.addSubcategory(data, token); // Sends the data to the backend using `addSubcategory`.
      console.log("Subcategory added:", response.data); // Logs the response from the server.
      setData({});
      e.target.reset();
      Swal.fire({
        icon: 'success',
        title: 'Subcategory Added!',
        text: `Subategory "${data.name}" has been added successfully.`,
      });
      // Optionally, you can reset the form or show a success message
    } catch (error) {
      console.error("Error adding subcategory:", error); // Logs any errors during the API call.
    }
  };
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("User")).refreshToken;

    const getAllCategories = async () => {
      const data = await category.getAllCategories(token);
      setCategories(data);
      console.log(data);
    };
    getAllCategories();
  }, []);

  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Add Subcategory</h5>
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* The form uses the onSubmit event to call handleSubmit when the form is submitted. */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Subcategory Name
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="form-control"
                      id="name"
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
                      onChange={onChangeHandler}
                      required
                    />
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Choose Catgeory
                      </label>
                      <br />
                      <select
                        name="category"
                        onChange={onChangeHandler}
                        id=""
                        className="form-select"
                        required
                      >
                        <option value="" selected disabled>
                          Categories List
                        </option>
                        {categories?.map((item) => {
                          return <option value={item._id}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Subcategory
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

export default SubCategory;
