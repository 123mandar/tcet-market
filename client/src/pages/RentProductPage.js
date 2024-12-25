import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinners from "../components/Layout/Spinners";
import CurvedBackground from "../components/Layout/CurvedBackground";
import { FaMailBulk, FaSearch, FaWhatsapp } from "react-icons/fa";

const RentProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle the filter
  const [loadingProducts] = useState(false);

  const categories = [
    { name: "Books", value: "Books" },
    { name: "Electronics", value: "Electronics" },
    { name: "Sports Equipment", value: "Sports Equipment" },
    { name: "Furniture", value: "Furniture" },
    { name: "Transport", value: "Transport" },
    { name: "Fashion", value: "Fashion" },
  ];

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/rent-product/get-rent-products`
      );
      if (data.success) {
        setProducts(data.rentProducts);
        setFilteredProducts(data.rentProducts);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter Products based on category and search query
  useEffect(() => {
    let filtered = [...products];

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
  }, [selectedCategory, searchQuery, products]);

  if (loading) {
    return (
      <div className="loading">
        <Spinners />
      </div>
    );
  }

  return (
    <Layout
      title="Rent Products"
      description="Explore a variety of products available for rent"
    >
      <CurvedBackground />
      <div>
        <div className="container-fluid py-4">
          <div className="row align-items-start ">
            {/* Sidebar for Filters */}
            <div className="col-md-3 ">
              <button
                className="btn btn-primary d-block d-md-none mb-3 w-100"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                {isFilterOpen ? "Hide Filters" : "Show Filters"}
              </button>

              {/* Filter section is always visible on large screens */}
              <div
                className={`card shadow-sm p-3 ${
                  isFilterOpen ? "d-block" : "d-none"
                } d-md-block`}
              >
                {/* Search Bar */}
                <h5 className="fw-bold mb-3">Search</h5>
                <div className="d-flex mb-3">
                  <input
                    type="text"
                    className="form-control me-2"
                    style={{ width: "100%" }} // Adjust width as needed
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />

                  <button
                    className="btn btn-outline-secondary"
                    style={{ width: "20%" }}
                  >
                    <FaSearch />
                  </button>
                </div>

                {/* Category Filter */}
                <h5 className="fw-bold mb-3">Categories</h5>
                <select
                  className="form-select mb-3"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  style={{ height: "40px", fontSize: "1rem", padding: "5px" }}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {/* Reset Filters Button */}
                <button
                  className="btn btn-secondary w-100"
                  onClick={resetFilters}
                >
                  Reset Filters
                </button>
              </div>
            </div>

            {/* Product List */}
            <div className="col-md-9">
              {loadingProducts ? (
                <Spinners />
              ) : filteredProducts.length > 0 ? (
                <div
                  className="row scrollable-container"
                  style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                  {filteredProducts.map((product) => (
                    <div className="col-md-4 mb-4" key={product._id}>
                      <div className="card h-100 shadow-sm">
                        <img
                          src={`${process.env.REACT_APP_API_URL}/api/v1/rent-product/get-rent-product-photo/${product._id}`}
                          className="card-img-top"
                          alt={product.name}
                          style={{
                            maxHeight: "200px",
                            objectFit: "cover",
                            padding: "10px",
                            borderRadius: "5px",
                          }}
                        />
                        <div className="card-body d-flex flex-column">
                          <h1
                            className="card-title"
                            style={{
                              fontWeight: "bold",
                              color: "black",
                              fontSize: "20px",
                            }}
                          >
                            {product.name}
                          </h1>
                          {product.category && (
                            <b
                              className="text-muted"
                              style={{ fontSize: "0.85rem" }}
                            >
                              {product.category.name}
                            </b>
                          )}
                          <p
                            className="card-text text-muted"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {product.description}
                          </p>
                          <p className="text-success fw-bold">
                            ₹{product.pricePerDay}/Day
                          </p>

                          {/* Sold status */}
                          <p
                            className={`fw-bold ${
                              product.isSold ? "text-danger" : "text-success"
                            }`}
                            style={{ fontSize: "0.9rem" }}
                          >
                            {product.isSold ? "Sold" : "Available"}
                          </p>

                          {/* Seller Name */}
                          {product.sellerId && product.sellerId.name && (
                            <p
                              className="fw-bold"
                              style={{ fontSize: "0.85rem", color: "#6c757d" }}
                            >
                              Owner : {product.sellerId.name}
                            </p>
                          )}
                          {product.sellerId && product.sellerId.phone && (
                            <p
                              className="fw-bold"
                              style={{ fontSize: "0.85rem", color: "#6c757d" }}
                            >
                              Contact: {product.sellerId.phone}
                            </p>
                          )}

                          <div className="d-flex justify-content-between mt-auto">
                            {product.sellerId && product.sellerId.phone && (
                              <button
                                className="btn btn-outline-success w-100 mb-2"
                                onClick={() => {
                                  const message = `Hi, I'm interested in borrowing the ${product.name}.`;
                                  const ownerPhoneNumber =
                                    product.sellerId.phone;
                                  const encodedMessage =
                                    encodeURIComponent(message);
                                  const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${encodedMessage}`;
                                  window.open(whatsappUrl, "_blank");
                                }}
                              >
                                <FaWhatsapp className="me-2" />
                                Contact via WhatsApp
                              </button>
                            )}
                          </div>
                          <div className="d-flex justify-content-between mt-auto">
                            {product.sellerId && product.sellerId.email && (
                              <a
                                href={`mailto:${product.sellerId.email}?subject=Inquiry%20about%20${product.name}&body=Hi%2C%20I'm%20interested%20in%20borrowing%20${product.name}.`}
                                className="btn btn-outline-primary w-100"
                              >
                                <FaMailBulk className="me-2" />
                                Contact via Email
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <h4 className="text-center">No products found</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RentProductPage;
