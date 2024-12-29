import React, { useState } from "react";
import "./Profile.css"; // Custom CSS for additional styling

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });
  const [userData, setUserData] = useState({
    fullName: user?.data?.fullName || "",
    email: user?.data?.email || "",
    phone: user?.data?.phone || "",
    newPassword: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  // Check if user data is available
  if (!user || !user.data) {
    return (
      <div className="alert alert-danger">
        You need to be logged in to view this page.
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const toggleEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handlePasswordChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      newPassword: e.target.value,
    }));
  };

  const handleConfirmPasswordChange = (e) => {
    setUserData((prevData) => ({
      ...prevData,
      confirmPassword: e.target.value,
    }));
  };

  const handleCancelEdit = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: false,
    }));
    // Revert data to original (stored in localStorage or initial state)
    setUserData((prevData) => ({
      ...prevData,
      [field]: user?.data[field] || "",
    }));
    setError(""); // Reset error state
  };

  const handleSavePassword = () => {
    if (userData.newPassword !== userData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    // Handle password update logic here
    setError(""); // Reset error state if password is successfully updated
  };

  return (
    <div className="container profile-container">
      <h2 className="profile-header">Admin Profile</h2>
      <div className="card profile-card">
        <div className="card-body">
          {/* Full Name */}
          <div className="form-row mb-4">
            <label className="col-form-label col-lg-4">Full Name</label>
            <div className="col-lg-8">
              {isEditing.name ? (
                <input
                  type="text"
                  name="fullName"
                  value={userData.fullName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <span className="text-muted">{userData.fullName}</span>
              )}
              <button
                className="btn btn-outline-primary small-btn"
                onClick={() => toggleEdit("name")}
              >
                {isEditing.name ? "Save" : "Edit"}
              </button>
              {isEditing.name && (
                <button
                  className="btn btn-outline-secondary small-btn ml-2"
                  onClick={() => handleCancelEdit("name")}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Email */}
          <div className="form-row mb-4">
            <label className="col-form-label col-lg-4">Email</label>
            <div className="col-lg-8">
              {isEditing.email ? (
                <input
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <span className="text-muted">{userData.email}</span>
              )}
              <button
                className="btn btn-outline-primary small-btn"
                onClick={() => toggleEdit("email")}
              >
                {isEditing.email ? "Save" : "Edit"}
              </button>
              {isEditing.email && (
                <button
                  className="btn btn-outline-secondary small-btn ml-2"
                  onClick={() => handleCancelEdit("email")}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Phone */}
          <div className="form-row mb-4">
            <label className="col-form-label col-lg-4">Phone</label>
            <div className="col-lg-8">
              {isEditing.phone ? (
                <input
                  type="text"
                  name="phone"
                  value={userData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                />
              ) : (
                <span className="text-muted">{userData.phone}</span>
              )}
              <button
                className="btn btn-outline-primary small-btn"
                onClick={() => toggleEdit("phone")}
              >
                {isEditing.phone ? "Save" : "Edit"}
              </button>
              {isEditing.phone && (
                <button
                  className="btn btn-outline-secondary small-btn ml-2"
                  onClick={() => handleCancelEdit("phone")}
                >
                  Cancel
                </button>
              )}
            </div>
          </div>

          {/* Password */}
          <div className="form-row mb-4">
            <label className="col-form-label col-lg-4">Password</label>
            <div className="col-lg-8">
              {isEditing.password ? (
                <div>
                  <input
                    type="password"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handlePasswordChange}
                    className="form-control mb-2"
                    placeholder="Enter new password"
                  />
                  <input
                    type="password"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="form-control"
                    placeholder="Confirm new password"
                  />
                </div>
              ) : (
                <span className="text-muted">********</span>
              )}
              <button
                className="btn btn-outline-primary small-btn"
                onClick={() => toggleEdit("password")}
              >
                {isEditing.password ? "Save" : "Edit"}
              </button>
              {isEditing.password && (
                <button
                  className="btn btn-outline-secondary small-btn ml-2"
                  onClick={() => handleCancelEdit("password")}
                >
                  Cancel
                </button>
              )}
              {isEditing.password && error && (
                <div className="text-danger mt-2">{error}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
