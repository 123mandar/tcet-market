import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import CurvedBackground from "../components/Layout/CurvedBackground";
import Spinners from "../components/Layout/Spinners";
import { FaEnvelope, FaSearch, FaWhatsapp } from "react-icons/fa";

const RentProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
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
      <div className="container-fluid py-4">
        <div className="row align-items-start">
          {/* Sidebar */}
          <div className="col-md-3">
            <div className="card shadow-sm p-3">
              {/* Search Bar */}
              <h5 className="fw-bold mb-3">Search</h5>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="btn btn-outline-secondary">
                  <FaSearch />
                </button>
              </div>

              {/* Category Filter */}
              <h5 className="fw-bold mb-3">Categories</h5>

              <select
                className="form-select scrollable-container mb-3"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
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

                        <b
                          className="text-muted"
                          style={{ fontSize: "0.85rem" }}
                        >
                          {product.category}
                        </b>
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

                        {/* Seller Details */}
                        {/* Seller Name */}
                        {product.sellerId && product.sellerId.name && (
                          <p
                            className="fw-bold"
                            style={{ fontSize: "0.85rem", color: "#6c757d" }}
                          >
                            Owner: {product.sellerId.name}
                          </p>
                        )}

                        {/* Seller Email */}
                        {product.sellerId && product.sellerId.email && (
                          <p
                            className="fw-bold"
                            style={{ fontSize: "0.85rem", color: "#6c757d" }}
                          >
                            Mail: {product.sellerId.email}
                          </p>
                        )}

                        {/* Contact Information */}
                        {product.sellerId && (
                          <p
                            className="fw-bold"
                            style={{ fontSize: "0.85rem", color: "#6c757d" }}
                          >
                            Contact:{" "}
                            {product.sellerId.phone != null
                              ? product.sellerId.phone
                              : product.sellerId.email || "NA"}
                          </p>
                        )}

                        <div className="d-flex justify-content-between mt-auto">
                          {product.sellerId && product.sellerId.phone ? (
                            <button
                              className="btn btn-secondary w-100"
                              onClick={() => {
                                const message = `Hi, I'm interested in borrowing the ${product.name}.`;
                                const ownerPhoneNumber = product.sellerId.phone; // Dynamically use the seller's phone number
                                const encodedMessage =
                                  encodeURIComponent(message); // Ensure the message is properly URL encoded
                                const whatsappUrl = `https://wa.me/${ownerPhoneNumber}?text=${encodedMessage}`;
                                window.open(whatsappUrl, "_blank");
                              }}
                            >
                              <FaWhatsapp className="me-2" />
                              Contact Owner
                            </button>
                          ) : product.sellerId && product.sellerId.email ? (
                            <a
                              href={`mailto:${product.sellerId.email}?subject=Inquiry%20about%20${product.name}&body=Hi%2C%20I'm%20interested%20in%20borrowing%20${product.name}.`}
                              className="btn btn-secondary w-100"
                            >
                              <FaEnvelope className="me-2" />
                              Contact Owner
                            </a>
                          ) : (
                            <p
                              className="fw-bold"
                              style={{ fontSize: "0.85rem", color: "#6c757d" }}
                            >
                              No contact information available
                            </p>
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
    </Layout>
  );
};

export default RentProductPage;
