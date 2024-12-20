import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/RentProductPage.css"; // Create a separate CSS file for styling

const RentProducts = () => {
  const [rentProducts, setRentProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRentProducts = async () => {
    try {
      const { data } = await axios.get(
        "/api/v1/rent-product/get-rent-products"
      );
      if (data.success) {
        setRentProducts(data.rentProducts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching rent products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRentProducts();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Layout
      title="Rent Products"
      description="Explore a variety of products available for rent"
      keywords="rent, borrow, products"
      author="Your Website"
    >
      <div className="rent-products-container">
        <h1 className="page-title">Available Products for Rent</h1>

        {rentProducts.length === 0 ? (
          <p className="no-products">No products available for rent.</p>
        ) : (
          <div className="products-grid">
            {rentProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <Link to={`/product/${product.slug}`} className="product-link">
                  {product.photo ? (
                    <img
                      src={`/api/v1/rent-product/get-rent-product-photo/${product._id}`}
                      className="card-img-top"
                      alt={product.name}
                      style={{
                        maxHeight: "200px",
                        objectFit: "cover",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    />
                  ) : (
                    <div className="placeholder-photo">No Image</div>
                  )}
                  <h2 className="product-name">{product.name}</h2>
                  <h2 className="product-name">{product.category}</h2>
                  <p className="product-description">
                    {product.description.substring(0, 100)}...
                  </p>
                  <p className="product-price">₹{product.pricePerDay}/day</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RentProducts;
