import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import CurvedBackground from "../components/Layout/CurvedBackground";
import Spinners from "../components/Layout/Spinners";
import { useNavigate } from "react-router-dom";
import { FaHandHolding, FaSearch } from "react-icons/fa";

const RentProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [loadingProducts] = useState(false);
  const navigate = useNavigate();
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
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        "/api/v1/rent-product/get-rent-products"
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

              {/* Price Filter */}
              <div className="row g-2 mb-3">
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min"
                  />
                </div>
                <div className="col">
                  <input
                    type="number"
                    className="form-control"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max"
                  />
                </div>
              </div>
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
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.name}</h5>
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

                        {/* Seller Name */}
                        {product.sellerId && product.sellerId.name && (
                          <p
                            className="fw-bold"
                            style={{ fontSize: "0.85rem", color: "#6c757d" }}
                          >
                            Owner: {product.sellerId.name}
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
                          <button
                            className="btn btn-secondary w-50"
                            onClick={() => navigate(`/product/${product.slug}`)}
                          >
                            <FaHandHolding className="me-2" />
                            Borrow Item
                          </button>
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
