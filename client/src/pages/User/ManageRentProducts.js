import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { AiFillDelete } from "react-icons/ai"; // Import delete icon
import toast from "react-hot-toast";

const ManageRentProducts = () => {
  const [rentProducts, setRentProducts] = useState([]);

  // Fetch rent products associated with the logged-in seller
  const fetchSellerRentProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rent-product/seller-rent-products`
      );

      if (data.success) {
        setRentProducts(data.rentProducts); // Ensure the key matches 'rentProducts'
      } else {
        console.error(data.message || "Failed to fetch rent products");
      }
    } catch (error) {
      console.error("Error fetching rent products:", error.message);
    }
  };

  // Delete rent product function
  const deleteRentProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this rent product?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/rent-product/delete-rent-product/${productId}`
      );

      if (data.success) {
        toast.success("Rent product deleted successfully");
        // Remove the deleted rent product from the state
        setRentProducts(
          rentProducts.filter((product) => product._id !== productId)
        );
      } else {
        alert(data.message || "Failed to delete rent product");
      }
    } catch (error) {
      console.error("Error deleting rent product:", error.message);
      alert("An error occurred while deleting the rent product");
    }
  };

  useEffect(() => {
    fetchSellerRentProducts();
  }, []);

  return (
    <Layout title="User Dashboard | Manage Rent Products">
      <div className="container py-4">
        <div
          className="row"
          style={{ alignItems: "flex-start", marginTop: "0px" }}
        >
          {/* User Menu Section */}
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>

          {/* Rent Products Management Section */}
          <div className="col-md-9">
            <div className="card shadow-sm">
              <div
                className="card-header text-black"
                style={{ backgroundColor: "#dda92f" }}
              >
                <h3>Manage Your Rent Products</h3>
              </div>
              <div className="card-body">
                {rentProducts.length > 0 ? (
                  <div className="row">
                    {rentProducts.map((product) => {
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
                              <p>Price Per Day: ₹{product.pricePerDay}</p>
                              <p>Category: {product.category || "N/A"}</p>
                              <p>
                                Status:{" "}
                                {product.isRented ? "Rented" : "Available"}
                              </p>
                              {/* Delete Button */}
                              <button
                                className="btn btn-danger "
                                onClick={() => deleteRentProduct(product._id)}
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
                  <p>No rent products found!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageRentProducts;
