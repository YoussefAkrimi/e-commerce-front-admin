import React, { useState } from "react";
import axios from "../../service/axiosContext";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams(); // Retrieve the token from URL
  console.log("Received token:", token); // Log the token to the console

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted"); // This log should appear in the console when the form is submitted.

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    // Log the data being sent to ensure everything is correct
    console.log("Sending request with data:", { token, newPassword: password });
    try {
      const response = await axios.post(`/user/reset-password/${token}`, {
        newPassword: password,
      });

      alert("Password successfully reset! you can now log in");
      navigate("/login");
    } catch (error) {
      // Log the full error to understand what's going wrong
      console.error("Error during password reset:", error);
      if (error.response) {
        // If the error response is available
        alert(error.response.data.message || "Error resetting password");
        console.error("Error response:", error.response);
      } else {
        alert("Error resetting password");
        console.error("Error:", error);
      }
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
                    />
                  </a>
                  <p className="text-center">Your Social Campaigns</p>

                  <h2 className="text-center mb-4">reset Password</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        enter new password{" "}
                      </label>

                      <input
                        type="password"
                        id="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <label htmlFor="newpassword" className="form-label">
                        confirm new password{" "}
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        className="form-control"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary w-100 py-8 fs-4 mb-4"
                    >
                      Reset password
                    </button>
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

export default ResetPassword;
