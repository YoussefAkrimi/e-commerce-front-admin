import React from "react";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("User"));

  // Check if user data is available
  if (!user ) {
    return <div>You need to be logged in to view this page.</div>;
  }

  const userFullName = user.data.fullName || "Not available";
  const userEmail = user.data.email || "Not available";
  const userPhone = user.data.phone || "Not available";

  return (
    <div className="container profile-container">
      <h2 className="profile-header">My Profile</h2>
      <div className="card profile-card">
        <div className="card-body">
          {/* Full Name */}
          <div className="form-row mb-4">
            <label className="col-form-label col-lg-4">Full Name</label>
            <div className="col-lg-8">
              <span className="text-muted">{userFullName}</span>
            </div>
          </div>

          {/* Email */}
          <div className="form-row mb-4">
            <label className="col-form-label col-lg-4">Email</label>
            <div className="col-lg-8">
              <span className="text-muted">{userEmail}</span>
            </div>
          </div>

          {/* Phone */}
          <div className="form-row mb-4">
            <label className="col-form-label col-lg-4">Phone</label>
            <div className="col-lg-8">
              <span className="text-muted">{userPhone}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
