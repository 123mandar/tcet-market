import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { Link } from "react-router-dom";
import "../assets/css/RentProductPage.css"; // Create a separate CSS file for styling
import CurvedBackground from "../components/Layout/CurvedBackground";

const RentProductPage = () => {
  const [rentProducts, setRentProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Predefined Categories
  const categories = [
    { name: "Books", value: "Books" },
    { name: "Electronics", value: "Electronics" },
    { name: "Sports Equipment", value: "Sports Equipment" },
    { name: "Furniture", value: "Furniture" },
    { name: "Transport", value: "Transport" },
    { name: "Fashion", value: "Fashion" },
  ];

  const fetchRentProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/api/v1/rent-product/get-rent-products"
      );
      if (data.success) {
        setRentProducts(data.rentProducts);
        setFilteredProducts(data.rentProducts); // Set all products initially
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

  // Filter Products based on category and search query
  useEffect(() => {
    let filtered = [...rentProducts];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery, rentProducts]);

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
        <CurvedBackground />
        {/* Filters Section */}
        <div className="filters">
          <input
            type="text"
            className="Search-Bar"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            className="category-filter"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* No products message */}
        {filteredProducts.length === 0 ? (
          <p className="no-products">No products available for rent.</p>
        ) : (
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product._id}>
                <Link to={`/product/${product.slug}`} className="product-link">
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
                  <h2 className="product-name">{product.name}</h2>
                  <h3 className="product-category">{product.category}</h3>
                  <p className="product-description">{product.description}</p>
                  <p className="product-price">₹{product.pricePerDay}/day</p>
                  <button className=" btn w-50 rent-btn ">Rent Now</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default RentProductPage;
