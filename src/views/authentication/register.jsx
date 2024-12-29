import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../../service/auth";
import Swal from "sweetalert2";

const Register = () => {
  const [data, setData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });
  const navigate = useNavigate();

  const onChangeHandler = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await auth.Register(data);
      Swal.fire({
        title: "Good job!",
        text: "You clicked the button!",
        icon: "success",
      });
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error("cant create account", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message ||
          "Unable to create account. Please try again.",
        icon: "error",
      });
    }
  };
  return (
    <div
      className="page-wrapper"
      id="main-wrapper"
      data-layout="vertical"
      data-navbarbg="skin6"
      data-sidebartype="full"
      data-sidebar-position="fixed"
      data-header-position="fixed"
    >
      <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center w-100">
          <div className="row justify-content-center w-100">
            <div className="col-md-8 col-lg-4 col-xxl-3">
              <div className="card mb-0">
                <div className="card-body">
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                   <img src="/assets/images/logos/fashion-logo.jpg" alt="logo" style={{ maxWidth: "100px", height: "auto" }} />
                  </a>
                  <p className="text-center">Create a New Account</p>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">
                        Full Name
                      </label>
                      <input
                        name="fullName"
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={data.fullName}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        id="email"
                        value={data.email}
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="password" className="form-label">
                        Password
                      </label>
                      <input
                        name="password"
                        type="password"
                        value={data.password}
                        className="form-control"
                        id="password"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="form-label">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        type="tel"
                        value={data.phone}
                        className="form-control"
                        id="phone"
                        onChange={onChangeHandler}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-8 fs-4 mb-4"
                    >
                      Sign Up
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">
                        Already have an Account?
                      </p>
                      <Link to="/login" className="text-primary fw-bold ms-2">
                        Sign In
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
