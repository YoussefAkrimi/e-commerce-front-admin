import React, { useEffect, useState } from "react";
import product from "../../../service/products";
import { useNavigate } from "react-router-dom";
import Slider from "../../../components/slider";
import Swal from "sweetalert2";


const ProductsList = () => {
  const [ProductsList, setProductsList] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
/*       const token =JSON.parse(localStorage.getItem("User")).refreshToken ;
 */
      const data = await product.getAllProducts();
      console.log(data); // Check the data structure here
      setProductsList(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);
  const deleteProduct = async (id, name) => {
    try {
      const token =JSON.parse(localStorage.getItem("User")).refreshToken ;

      // Call the product service to delete the product
      const response = await product.deleteProduct(id, token);
      console.log(response);
      
      Swal.fire({
        title: "Done!",
        text: `You deleted this product "${name}"!`,
        icon: "success",
      });    
      getAllProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete the product.");
    }
  };

  const navigateToUpdate = (id) => {
    navigate(`/updateProduct/${id}`);
  };
  return (
    <div>
      <div className="row">
        {ProductsList.map((item) => {
          return (
            <div className="col-lg-4">
              <div className="card ">
                {item.galleries.length > 0 ? (
                  <Slider img={item.galleries} />
                ) : (
                  <div
                    style={{ height: "200px", backgroundColor: "#f5f5f5" }}
                  />
                )}

                <div className="card-body">
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Description: {item.description}</p>
                  <p className="card-text">Price: ${item.price}</p>
                  <p className="card-text">Reference: {item.ref}</p>
                  <p className="card-text">Quantity: {item.qte}</p>
                  <p className="card-text">
                    Subcategory: {item.subcategory?.name || "No subcategory"}
                  </p>
                  {/* buttons for update and delete */}
                  <button
                    onClick={() => navigateToUpdate(item._id)}
                    className="btn btn-warning me-2"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteProduct(item._id)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsList;
