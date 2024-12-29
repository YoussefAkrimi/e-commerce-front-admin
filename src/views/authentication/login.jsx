import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import auth from "../../service/auth";
import Swal from "sweetalert2";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  /*   const [loading, setLoading] = useState(false); // This state tracks whether the login request is in progress. It helps to show a "Loading..." button text to inform the user that the login is happening.
   */

  const onChangeHandler = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    /*     setLoading(true); // Start loading (disable the button and show loading message)
     */
    try {
      const response = await auth.Login(data);

      console.log(response);
      navigate("/");
      localStorage.setItem("User", JSON.stringify(response.data));
    } catch (error) {
      console.error("Login Error:", error);
      Swal.fire({
        title: "Error",
        text:
          error.response?.data?.message || "Unable to login. Please try again.",
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
            <div className="col-md-8 col-lg-4 col-xxl-3  ">
              <div className="card mb-0">
                <div className="card-body">
                  <a
                    href="./index.html"
                    className="text-nowrap logo-img text-center d-block py-3 w-100"
                  >
                    <img
                      src="/assets/images/logos/fashion-logo.jpg"
                      alt="logo"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />
                  </a>
                  <p className="text-center">Your Social Campaigns</p>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Username
                      </label>
                      <input
                        name="email"
                        onChange={onChangeHandler}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <input
                        name="password"
                        onChange={onChangeHandler}
                        type="password"
                        className="form-control"
                        id="exampleInputPassword1"
                      />
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-4">
                      <div className="form-check">
                        <input
                          className="form-check-input primary"
                          type="checkbox"
                          defaultValue
                          id="flexCheckChecked"
                          defaultChecked
                        />
                        <label
                          className="form-check-label text-dark"
                          htmlFor="flexCheckChecked"
                        >
                          Remember this Device
                        </label>
                      </div>
                      <Link
                        to="/forgotPassword"
                        className="text-primary fw-bold"
                      >
                        Forgot Password ?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-8 fs-4 mb-4"
                    >
                      Sign In
                    </button>
                    <div className="d-flex align-items-center justify-content-center">
                      <p className="fs-4 mb-0 fw-bold">New to SeoDash?</p>
                      <Link
                        to="/register"
                        className="text-primary fw-bold ms-2"
                      >
                        Create an account
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

export default Login;
