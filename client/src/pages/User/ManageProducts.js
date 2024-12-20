import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { AiFillDelete } from "react-icons/ai"; // Import delete icon
import toast from "react-hot-toast";
const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  // Fetch products associated with the logged-in seller
  const fetchSellerProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/product/seller-products`
      );

      if (data.success) {
        setProducts(data.product); // Correctly set the 'product' data from the response
      } else {
        console.error(data.message || "Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  };

  // Delete product function
  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/product/delete-product/${productId}`
      );

      if (data.success) {
        toast.success("Product deleted successfully");
        // Remove the deleted product from the state
        setProducts(products.filter((product) => product._id !== productId));
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error.message);
      alert("An error occurred while deleting the product");
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  return (
    <Layout title="User Dashboard | Manage Products">
      <div className="container py-4">
        <div
          className="row"
          style={{ alignItems: "flex-start", marginTop: "0px" }}
        >
          {/* User Menu Section */}
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>

          {/* Products Management Section */}
          <div className="col-md-9">
            <div className="card shadow-sm">
              <div
                className="card-header text-black"
                style={{ backgroundColor: "#dda92f" }}
              >
                <h3>Manage Your Products</h3>
              </div>
              <div className="card-body">
                {products.length > 0 ? (
                  <div className="row">
                    {products.map((product) => {
                      return (
                        <div key={product._id} className="col-md-4 mb-3">
                          <div className="card">
                            <div className="card-body">
                              {product.photo && (
                                <img
                                  src={product.photo}
                                  alt={product.name}
                                  style={{ width: "100%", height: "auto" }}
                                />
                              )}
                              <h5>{product.name}</h5>
                              <p>Price: ₹{product.price}</p>
                              <p>Quantity: {product.quantity}</p>
                              <p>
                                Category: {product.category?.name || "N/A"}
                              </p>{" "}
                              {/* Ensure category name is accessed */}
                              <p>
                                Shipping:{" "}
                                {product.shipping
                                  ? "Available"
                                  : "Not Available"}
                              </p>
                              <p>
                                Status: {product.isSold ? "Sold" : "Available"}
                              </p>
                              {/* Delete Button */}
                              <button
                                className="btn btn-danger "
                                onClick={() => deleteProduct(product._id)}
                              >
                                <AiFillDelete />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No products found!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
