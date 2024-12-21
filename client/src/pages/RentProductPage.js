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
        <div className="row">
          {/* Sidebar for Filters */}
          <div className="col-12 col-md-3 mb-4">
            <div className="card shadow-sm p-3">
              {/* Search Bar */}
              <h5 className="fw-bold mb-3">Search</h5>
              <div className="input-group mb-4">
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
              <div className="mb-3">
                <select
                  className="form-select"
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

              {/* Reset Button */}
              <button
                className="btn btn-secondary w-100 mt-3"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Product List */}
          <div className="col-12 col-md-9">
            {filteredProducts.length > 0 ? (
              <div className="row row-cols-1 row-cols-md-3 g-4">
                {filteredProducts.map((product) => (
                  <div className="col" key={product._id}>
                    <div className="card h-100 shadow-sm">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/api/v1/rent-product/get-rent-product-photo/${product._id}`}
                        className="card-img-top"
                        alt={product.name}
                        style={{
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "5px",
                        }}
                      />
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title">{product.name}</h5>
                        <p className="card-text text-muted">
                          {product.category}
                        </p>
                        <p className="card-text">{product.description}</p>
                        <p className="text-success fw-bold">
                          ₹{product.pricePerDay}/Day
                        </p>
                        <p
                          className={`fw-bold ${
                            product.isSold ? "text-danger" : "text-success"
                          }`}
                        >
                          {product.isSold ? "Sold" : "Available"}
                        </p>

                        {/* Seller Information */}
                        {product.sellerId && product.sellerId.name && (
                          <p className="card-text text-muted">
                            Owner: {product.sellerId.name}
                          </p>
                        )}
                        {product.sellerId && product.sellerId.phone && (
                          <button
                            className="btn btn-outline-success w-100 mb-2"
                            onClick={() => {
                              const message = `Hi, I'm interested in borrowing the ${product.name}.`;
                              const ownerPhoneNumber = product.sellerId.phone;
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
                        {product.sellerId && product.sellerId.email && (
                          <a
                            href={`mailto:${product.sellerId.email}?subject=Inquiry%20about%20${product.name}&body=Hi%2C%20I'm%20interested%20in%20borrowing%20${product.name}.`}
                            className="btn btn-outline-primary w-100"
                          >
                            <FaEnvelope className="me-2" />
                            Contact via Email
                          </a>
                        )}
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
