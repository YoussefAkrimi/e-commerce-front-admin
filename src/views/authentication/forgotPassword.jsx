import React, { useState } from "react";
import axios from "../../service/axiosContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // This log should appear in the console when the form is submitted.

    try {
      const response = await axios.post("/user/forgot-password", { email });
      alert(response.data.message);
      // Optionally, you can redirect after success
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
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
                    <img
                      src="/assets/images/logos/fashion-logo.jpg"
                      alt="logo"
                      style={{ maxWidth: "100px", height: "auto" }}
                    />{" "}
                  </a>
                  <p className="text-center">Your Social Campaigns</p>

                  <h2 className="text-center mb-4">Forgot Password</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Enter Your Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-8 fs-4 mb-4"
                    >
                      Send Reset Link
                    </button>
                  </form>

                  <div className="d-flex align-items-center justify-content-center">
                    <p className="fs-4 mb-0 fw-bold">Or</p>
                    <Link to="/login" className="text-primary fw-bold ms-2">
                      Login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
