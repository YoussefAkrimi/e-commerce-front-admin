/* Login.jsx with styling : 
 */
import React, { useState } from "react";
import axios from "../../service/axiosContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./login.css"; // Import the login.css file

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false); // This state tracks whether the login request is in progress. It helps to show a "Loading..." button text to inform the user that the login is happening.

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the default form submission behavior
    setLoading(true); // Start loading (disable the button and show loading message)

    try {
      const response = await axios.post("/user/login", { email, password });

      // Assuming the response includes a success message and a token
      if (response.data.success) {
        localStorage.setItem("authToken", response.data.token);
        navigate("/"); // Redirect to a protected page
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      // Assuming your backend sends errors in error.response.data
      setError(error.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <form className="login" onSubmit={handleSubmit}>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input
                type="text"
                className="login__input"
                placeholder="User name / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input
                type="password"
                className="login__input"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button className="button login__submit" disabled={loading}>
              <span className="button__text">
                {loading ? "Logging In..." : "Log In Now"}
              </span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            {error && <div className="error-message">{error}</div>}
          </form>
          <div className="social-login">
            <h3>log in via</h3>
            <div className="social-icons">
              <a href="#" className="social-login__icon fab fa-instagram"></a>
              <a href="#" className="social-login__icon fab fa-facebook"></a>
              <a href="#" className="social-login__icon fab fa-twitter"></a>
            </div>
          </div>
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>
      </div>
    </div>
  );
};



export default Login;


//Login.css : 
/* In your login.css file */
/*@import url('https://fonts.googleapis.com/css?family=Raleway:400,700');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Raleway, sans-serif;
}

body {
  background: linear-gradient(90deg, #C7C5F4, #776BCC);
}

.container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

.screen {
  background: linear-gradient(90deg, #5D54A4, #7C78B8);
  position: relative;
  height: 600px;
  width: 360px;
  box-shadow: 0px 0px 24px #5C5696;
}

.screen__content {
  z-index: 1;
  position: relative;
  height: 100%;
}

.screen__background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
  -webkit-clip-path: inset(0 0 0 0);
  clip-path: inset(0 0 0 0);
}

.screen__background__shape {
  transform: rotate(45deg);
  position: absolute;
}

.screen__background__shape1 {
  height: 520px;
  width: 520px;
  background: #FFF;
  top: -50px;
  right: 120px;
  border-radius: 0 72px 0 0;
}

.screen__background__shape2 {
  height: 220px;
  width: 220px;
  background: #6C63AC;
  top: -172px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape3 {
  height: 540px;
  width: 190px;
  background: linear-gradient(270deg, #5D54A4, #6A679E);
  top: -24px;
  right: 0;
  border-radius: 32px;
}

.screen__background__shape4 {
  height: 400px;
  width: 200px;
  background: #7E7BB9;
  top: 420px;
  right: 50px;
  border-radius: 60px;
}

.login {
  width: 320px;
  padding: 30px;
  padding-top: 156px;
}

.login__field {
  padding: 20px 0px;
  position: relative;
}

.login__icon {
  position: absolute;
  top: 30px;
  color: #7875B5;
}

.login__input {
  border: none;
  border-bottom: 2px solid #D1D1D4;
  background: none;
  padding: 10px;
  padding-left: 24px;
  font-weight: 700;
  width: 75%;
  transition: .2s;
}

.login__input:active,
.login__input:focus,
.login__input:hover {
  outline: none;
  border-bottom-color: #6A679E;
}

.login__submit {
  background: #fff;
  font-size: 14px;
  margin-top: 30px;
  padding: 16px 20px;
  border-radius: 26px;
  border: 1px solid #D4D3E8;
  text-transform: uppercase;
  font-weight: 700;
  display: flex;
  align-items: center;
  width: 100%;
  color: #4C489D;
  box-shadow: 0px 2px 2px #5C5696;
  cursor: pointer;
  transition: .2s;
}

.login__submit:active,
.login__submit:focus,
.login__submit:hover {
  border-color: #6A679E;
  outline: none;
}

.button__icon {
  font-size: 24px;
  margin-left: auto;
  color: #7875B5;
}

.social-login {
  position: absolute;
  height: 140px;
  width: 160px;
  text-align: center;
  bottom: 0px;
  right: 0px;
  color: #fff;
}

.social-icons {
  display: flex;
  align-items: center;
  justify-content: center;
}

.social-login__icon {
  padding: 20px 10px;
  color: #fff;
  text-decoration: none;
  text-shadow: 0px 0px 8px #7875B5;
}

.social-login__icon:hover {
  transform: scale(1.5);
}*/


/* to make card next to each other : 
row-cols-1 row-cols-md-3: This makes the grid responsive. On small screens, the cards will take up the full width (1 card per row). On medium and larger screens, the cards will be displayed 3 per row.
g-4: Adds spacing (gutter) between the grid items.
col: Ensures each product card is treated as a column in the grid.*/




/* <div>
      <div className="col-lg-8">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Products List</h5>
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
                    <th scope="col" className="ps-0 text-center">
                      Price
                    </th>
                    <th scope="col" className="text-center">
                      Quantity
                    </th>
                    <th scope="col" className="text-center">
                      Reference
                    </th>
                    <th scope="col" className="text-center">
                      Subcategory
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
                  {ProductsList.map((product, index) => (
                    <tr key={product._id}>
                      <th scope="row" className="ps-0 fw-medium">
                        <span className="table-link1 text-truncate d-block text-center">
                          {index + 1}
                        </span>
                      </th>
                      <td className="text-center fw-medium">{product.name}</td>
                      <td className="text-center fw-medium">
                        {product.description}
                      </td>
                      <td className="text-center fw-medium">{product.price}</td>
                      <td className="text-center fw-medium">{product.qte}</td>
                      <td className="text-center fw-medium">{product.ref}</td>
                      <td className="text-center fw-medium">
                        {product.subcategory?.name}
                      </td>
                      <td className="text-center fw-medium">
                        {/* Display product image(s) */
                        /*{product.galleries && product.galleries[0]?.image && (
                          <img
                            src={`http://localhost:3000/storage/${product.galleries[0]?.image}`}
                            alt={product.name}
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                        )}
                      </td>
                      {/* the code above only displays the first image, to display all image : 
                      {product.galleries && product.galleries.map((gallery, index) => (
  <img
    key={index}
    src={`http://localhost:3000/storage/${gallery.image}`}
    alt={`${product.name} image ${index + 1}`}
    style={{
      width: "50px",
      height: "50px",
      objectFit: "cover",
      marginRight: "5px", // Optional: adds space between images
    }}
  />
))}

                      *//*
                      <td className="text-center fw-medium d-flex justify-content-center gap-3">
                        <button
                          onClick={() => deleteProduct(product._id)}
                          type="submit"
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => navigateToUpdate(product._id)}
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
    </div> */