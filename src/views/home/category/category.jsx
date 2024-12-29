import React, { useState } from "react";
import category from "../../../service/category";
import Swal from "sweetalert2";

const Category = () => {
  const [data, setData] = useState({});

  const onChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const onChangeImage = (e) => {
    setData({ ...data, image: e.target.files[0] });
  };
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("User")).refreshToken;

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);
    category
      .addCategory(formData, token)
      .then((res) => {
        console.log(res.data);
        // reset the form fields
        setData({});
        e.target.reset(); // Clear the actual form fields
        Swal.fire({
          icon: "success",
          title: "Category Added!",
          text: `Category "${data.name}" has been added successfully.`,
        });
      })

      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Add Categories</h5>
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Category name
                    </label>
                    <input
                      name="name"
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Category description
                    </label>
                    <input
                      name="description"
                      onChange={onChangeHandler}
                      type="text"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Category image
                    </label>
                    <input
                      name="image"
                      onChange={onChangeImage}
                      type="file"
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">
                    Add Category
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

export default Category;
