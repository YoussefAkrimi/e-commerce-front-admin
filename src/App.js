import logo from "./logo.svg";
import "./App.css";
import { Children, Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./views/home/home";
import Layout from "./views/home/layout";
import Login from "./views/authentication/login";
import Register from "./views/authentication/register";
import Category from "./views/home/category/category";
import CategoryList from "./views/home/category/categoryList";
import UpdateCategory from "./views/home/category/updateCategory";
import SubCategory from "./views/home/subcategories/subCategory";
import SubCategoryList from "./views/home/subcategories/subCategoryList";
import UpdateSubCategory from "./views/home/subcategories/updateSubCategory";
import Products from "./views/home/products/product";
import ProductsList from "./views/home/products/productsList";
import UpdateProduct from "./views/home/products/updateProduct";
import ForgotPassword from "./views/authentication/forgotPassword";
import ResetPassword from "./views/authentication/resetPassword";
import Profile from "./views/profile/Profile";

/* class App extends Component {
  render() {
    return (
      <div>
        <h1>hello world</h1>
      </div>
    );
  }
} */

/* function App() {
  const [name, setName] = useState("joseph");
  const changeName = () => {
    setName("joseph ekrimi");
  };
  return (
    <div>
      <h1>my name is {name}</h1>
      <button onClick={changeName}>Click me</button>
    </div>
  );
} */

function App() {
  const PrivateRoute = ({ children }) => {
    const user = localStorage.getItem("User");

    const userRole = JSON.parse(user)
    if (!user || userRole.data.itemtype !== 'Admin') {
      return <Navigate to={"/login"} />;
    }
    return children;

    
  };

  /* const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(`you have clicked the button ${count} times`);
  });
  return (
    <div>
      <button onClick={() => setCount(count + 1)}> click me</button>
    </div>
  ); */
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        >
          <Route path="/" element={<Layout />} />
          <Route path="/addCategory" element={<Category />} />
          <Route path="/categoryList" element={<CategoryList />} />
          <Route path="/updateCategory/:id" element={<UpdateCategory />} />
          <Route path="/addSubCategory" element={<SubCategory />} />
          <Route path="/subCategoryList" element={<SubCategoryList />} />
          <Route
            path="/updateSubCategory/:id"
            element={<UpdateSubCategory />}
          />
          <Route path="/addProduct" element={<Products />} />
          <Route path="/productsList" element={<ProductsList />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />
          <Route path="/Profile" element={<Profile/>}/>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}
export default App;
