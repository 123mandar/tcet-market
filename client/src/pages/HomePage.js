import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { FaCreditCard, FaSearch } from "react-icons/fa";
import "../assets/css/ScrollBar.css";
import { useNavigate } from "react-router-dom";
import Spinners from "../components/Layout/Spinners";
import CurvedBackground from "../components/Layout/CurvedBackground";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // State to toggle the filter
  const navigate = useNavigate();

  // Fetch all categories
  useEffect(() => {
    const fetchCategories = async () => {
      setLoadingCategories(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
        );
        if (data.success) setCategories(data.getCategory);
      } catch {
        toast.error("Error fetching categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingProducts(true);
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/product/get-product`
        );
        if (data.success) {
          setProducts(data.getProduct);
          setFilteredProducts(data.getProduct);
        }
      } catch {
        toast.error("Error fetching products");
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) =>
          product.category && product.category._id === selectedCategory
      );
    }

    // Apply price filter
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);

    if (!isNaN(min) || !isNaN(max)) {
      filtered = filtered.filter((product) => {
        const price = product.price;
        // Apply min and max price filter
        const isMinPriceValid = !isNaN(min) ? price >= min : true;
        const isMaxPriceValid = !isNaN(max) ? price <= max : true;
        return isMinPriceValid && isMaxPriceValid;
      });
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, minPrice, maxPrice, searchQuery, products]);

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setSearchQuery("");
  };

  return (
    <Layout title="TCET Marketplace">
      <CurvedBackground />
      <div className="container-fluid py-4">
        <div className="row align-items-start ">
          {/* Sidebar (Filter Section) */}
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
              {loadingCategories ? (
                <Spinners />
              ) : (
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
              )}

              {/* Price Filter */}
              <h5 className="fw-bold mb-3">Filter by Price</h5>
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
                        src={`${process.env.REACT_APP_API_URL}/api/v1/product/get-product-photo/${product._id}`}
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
                        <p className="text-success fw-bold">₹{product.price}</p>

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
                            Sold by: {product.sellerId.name}
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
                            <FaCreditCard className="me-2" />
                            BUY NOW
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

export default HomePage;
