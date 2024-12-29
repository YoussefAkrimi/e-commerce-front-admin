import React, { useState, useEffect } from "react";
import subCategory from "../../../service/subCategory";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const SubCategoryList = () => {
  const [subcategories, setSubcategories] = useState([]);
  const navigate = useNavigate();

  const getAllSubCategories = async () => {
    try {
/*       const token =JSON.parse(localStorage.getItem("User")).refreshToken ;
 */
      const data = await subCategory.getAllSubCategories();
      setSubcategories(data); // Updates the state with the fetched data
      console.log(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error); // Logs any errors during the API call.
    }
  };
  useEffect(() => {
    getAllSubCategories();
  }, []);

  const deleteSubCategory = async (id, name) => {
    const token =JSON.parse(localStorage.getItem("User")).refreshToken ;

    const response = await subCategory.deleteSubcategory(id, token);
    Swal.fire({
      title: "Done!",
      text:  `You deleted the subcategory "${name}"!`,
      icon: "success",
    });
    getAllSubCategories();
    console.log(response);
  };
  const navigateToUpdate = (id) => {
    navigate(`/updateSubCategory/${id}`);
  };
  return (
    <div>
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Subcategory List</h5>
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
                    <th scope="col" className="text-center">
                      Description
                    </th>
                    <th scope="col" className="text-center">
                      Categories
                    </th>
                    <th scope="col" className="ps-0 text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="table-group-divider">
                  {subcategories?.map((subCategory, index) => (
                    <tr key={subCategory._id}>
                      {/* Assigns a unique key to each row using the _id of the subcategory (from the backend). */}

                      <th scope="row" className="ps-0 fw-medium ">
                        <span className="table-link1 text-truncate d-block text-center">
                          {index + 1}
                        </span>
                      </th>
                      <td className="text-center ">{subCategory.name}</td>
                      <td className="text-center ">
                        {subCategory.description}
                      </td>
                      <td className="text-center">
                        {subCategory.category?.name}
                      </td>
                      <td className="text-center fw-medium d-flex justify-content-center gap-3">
                        <button
                          onClick={() => deleteSubCategory(subCategory._id, subCategory.name)}
                          type="submit"
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => navigateToUpdate(subCategory._id)}
                          type="submit"
                          className="btn btn-primary btn-sm"
                        >
                          Update
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryList;
