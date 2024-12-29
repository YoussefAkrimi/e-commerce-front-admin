import React, { useEffect, useState } from "react";
import products from "../../../service/products";
import subCategory from "../../../service/subCategory";
import Swal from "sweetalert2";
const Products = () => {
  const [data, setData] = useState({});
  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]:
        name === "price" || name === "ref" || name === "qte"
          ? parseFloat(value)
          : value,
    });
  };
  const [gal, setGalleries] = useState({});
  const onChangeImage = (e) => {
    setGalleries(e.target.files);
    console.log("Selected files:", e.target.files); // This logs the selected files
  };
  const token = JSON.parse(localStorage.getItem("User")).refreshToken;
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("name", data.name);
    formdata.append("description", data.description);
    formdata.append("subcategory", data.subcategory);
    formdata.append("price", Number(data.price));
    for (let i = 0; i <= gal.length; i++) {
      formdata.append("image", gal[i]);
    }
    formdata.append("ref", Number(data.ref));
    formdata.append("qte", Number(data.qte));
    products
      .addProduct(formdata, token)
      .then((res) => {
        console.log(res.data);
        setData({}); // Reset form state
        e.target.reset(); // Reset form inputs
        // Display a success alert after the product is created
        Swal.fire({
          title: "Success!",
          text: `Product "${data.name}" has been added successfully.`,
          icon: "success",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [subcategories, setSubcategories] = useState([]);
  const getAllSubCategories = async () => {
    try {
      const response = await subCategory.getAllSubCategories();
      setSubcategories(response); // Updates the state with the fetched data
      console.log(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error); // Logs any errors during the API call.
    }
  };
  useEffect(() => {
    getAllSubCategories();
  }, []);
  return (
    <div>
      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-semibold mb-4">Add Product</h5>
            <div className="card">
              <div className="card-body">
                <form onSubmit={onSubmitHandler}>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Product name
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
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Product referance
                    </label>
                    <input
                      name="ref"
                      onChange={onChangeHandler}
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Product price
                    </label>
                    <input
                      name="price"
                      onChange={onChangeHandler}
                      type="number"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Product quantity
                    </label>
                    <input
                      name="qte"
                      onChange={onChangeHandler}
                      type="number"
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
                      Product description
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
                      Product images
                    </label>
                    <input
                      name="galleries"
                      onChange={onChangeImage}
                      type="file"
                      multiple
                      className="form-control"
                      id="exampleInputPassword1"
                    />
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Choose subcategory
                      </label>
                      <br />
                      <select
                        name="subcategory"
                        onChange={onChangeHandler}
                        id=""
                        className="form-select"
                        required
                      >
                        <option value="" disabled selected>
                          subCategory List
                        </option>
                        {subcategories?.map((item) => {
                          return <option value={item._id}>{item.name}</option>;
                        })}
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Add Product
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
export default Products;
