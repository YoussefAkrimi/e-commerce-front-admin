import React, { useEffect, useState } from "react";
import category from "../../../service/category";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate(); // To navigate after successful update

  // Function to get the token
  const getToken = () => JSON.parse(localStorage.getItem("User"))?.refreshToken;

  const getAllCategories = async () => {
    const token = getToken();
    if (token) {
      const data = await category.getAllCategories(token);
      setCategories(data);
      console.log(data);
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  const deleteCategory = async (id, name) => {
    const token = getToken();
    if (token) {
      const response = await category.deleteCategory(id, token);
      Swal.fire({
        title: "Done!",
        text: `You deleted this category "${name}"!`,
        icon: "success",
      });
      getAllCategories();
      console.log(response);
    }
  };
  const navigateToUpdate = (id) => {
    navigate(`/updateCategory/${id}`); // Navigate to the update page with category ID
  };

  return (
    <div>
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Category List</h5>
            <div className="table-responsive">
              <table className="table text-nowrap align-middle mb-0">
                <thead>
                  <tr className="border-2 border-bottom border-primary border-0">
                    <th scope="col" className="ps-0 text-center">
                      Number
                    </th>

                    <th scope="col" className="ps-0 text-center">
                      Name
                    </th>
                    <th scope="col" className="ps-0 text-center">
                      Description
                    </th>
                    <th scope="col" className="text-center">
                      Images
                    </th>
                    <th scope="col" className="ps-0 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {categories.map((category, index) => {
                    return (
                      <tr>
                        <th scope="row" className="ps-0 fw-medium">
                          <span className="table-link1 text-truncate d-block text-center">
                            {index + 1}
                          </span>
                        </th>
                        <td className="text-center fw-medium">
                          {category.name}
                        </td>
                        <td className="text-center fw-medium">
                          {category.description}
                        </td>
                        <td className="text-center fw-medium">
                          <img
                            src={`http://localhost:3000/storage/${category.image}`} // Adjust the path if necessary
                            alt={category.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        </td>
                        <td className="text-center fw-medium d-flex justify-content-center gap-3">
                          <button
                            onClick={() =>
                              deleteCategory(category._id, category.name)
                            }
                            type="submit"
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => {
                              navigateToUpdate(category._id); // Navigate to update page
                            }}
                            type="submit"
                            className="btn btn-primary btn-sm"
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
