import React, { useState } from "react";
import axios from "../../service/axiosContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [fullName, setFullName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("/user/register", {
        fullName,
        password,
        phone,
        email,
      });

      if (response.data.success) {
        // On successful registration, navigate to login or homepage
        navigate("/login");
      } else {
        setError("Registration failed, please try again");
      }
    } catch (error) {
      console.error("Registration eroor", error);
      setError(
        error.response?.data?.message || "An error occured during registration"
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Phone
          </label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="form-control"
            required
          />
        </div>
       
       {error && <div className="text-danger mb-3">{error}</div>}
       <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? "Registering..." :  "Register"}
       </button>
        
      </form>
    </div>
  );
};

export default Register;
