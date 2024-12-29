import React, { useState, useEffect } from "react"; // Importing React and hooks
import axios from "../service/axiosContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  /* const [categories, setCategories] = useState([]);

  // Fetch categories from the backend
  useEffect(() => {
    const getAllCategories = async () => {
      try {
        const response = await axios.get("/categories"); // Adjust the endpoint accordingly
        console.log("Categories fetched:", response.data); // Log the data

        setCategories(response.data.data); // Assuming the data is an array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    getAllCategories();
  }, []); */

  return (
    <aside className="left-sidebar">
      {/* Sidebar scroll*/}
      <div>
        <div className="brand-logo d-flex align-items-center justify-content-between">
          <a href="./index.html" className="text-nowrap logo-img">
          <img
        src="/assets/images/logos/fashion-logo.jpg"
        alt="logo"
        style={{ maxWidth: "80px", height: "auto" }}
      />
          </a>
          <div
            className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
            id="sidebarCollapse"
          >
            <i className="ti ti-x fs-8" />
          </div>
        </div>
        {/* Sidebar navigation*/}
        <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
          <ul id="sidebarnav">
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-6" />
              <span className="hide-menu">Home</span>
            </li>
            <li className="sidebar-item">
              <Link className="sidebar-link" to="/" aria-expanded="false">
                <span>
                  <iconify-icon
                    icon="solar:home-smile-bold-duotone"
                    className="fs-6"
                  />
                </span>
                <span className="hide-menu">Dashboard</span>
              </Link>
            </li>
            {/* Categories navigation */}
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-6" />
              <span className="hide-menu">Categories</span>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/addCategory"
                aria-expanded="false"
              >
                <span>
                  <iconify-icon
                    icon="solar:layers-minimalistic-bold-duotone"
                    className="fs-6"
                  />
                </span>
                <span className="hide-menu">Add category</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/categoryList"
                aria-expanded="false"
              >
                <span>
                  <iconify-icon
                    icon="solar:danger-circle-bold-duotone"
                    className="fs-6"
                  />
                </span>
                <span className="hide-menu">Category list</span>
              </Link>
            </li>
            {/* Subcategories navigation */}
            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-6" />
              <span className="hide-menu">Subcategories</span>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/addSubCategory" // Static link for adding subcategories
                aria-expanded="false"
              >
                <span>
                  <iconify-icon
                    icon="solar:layers-minimalistic-bold-duotone"
                    className="fs-6"
                  />
                </span>
                <span className="hide-menu">Add Subcategory</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/subCategoryList" // Static link for subcategory list
                aria-expanded="false"
              >
                <span>
                  <i className="ti ti-list fs-6"></i>
                </span>
                <span className="hide-menu">Subcategory List</span>
              </Link>
            </li>

            {/* products navigation */}

            <li className="nav-small-cap">
              <i className="ti ti-dots nav-small-cap-icon fs-6" />
              <span className="hide-menu">Products</span>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/addProduct"
                aria-expanded="false"
              >
                <span>
                  <iconify-icon
                    icon="solar:layers-minimalistic-bold-duotone"
                    className="fs-6"
                  />
                </span>
                <span className="hide-menu">Add product</span>
              </Link>
            </li>
            <li className="sidebar-item">
              <Link
                className="sidebar-link"
                to="/productsList"
                aria-expanded="false"
              >
                <span>
                  <iconify-icon
                    icon="solar:danger-circle-bold-duotone"
                    className="fs-6"
                  />
                </span>
                <span className="hide-menu">Products list</span>
              </Link>
            </li>
            
            
          </ul>
        </nav>
        {/* End Sidebar navigation */}
      </div>
      {/* End Sidebar scroll*/}
    </aside>
  );
};

export default Sidebar;
