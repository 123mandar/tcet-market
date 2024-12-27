import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Spinners from "../components/Layout/Spinners";
import CurvedBackground from "../components/Layout/CurvedBackground";
import { FaMailBulk, FaSearch, FaWhatsapp } from "react-icons/fa";

const ServiceProductPage = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = [
    { name: "Tutoring", value: "Tutoring" },
    { name: "Event Management", value: "Event Management" },
    { name: "Photography", value: "Photography" },
    { name: "Graphic Design", value: "Graphic Design" },
    { name: "Technical Support", value: "Technical Support" },
    { name: "Fitness Coaching", value: "Fitness Coaching" },
    { name: "Music Lessons", value: "Music Lessons" },
    { name: "Content Writing", value: "Content Writing" },
    { name: "Other", value: "Other" },
  ];

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  const fetchServices = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/service/get-services`
      );
      if (data.success) {
        setServices(data.services);
        setFilteredServices(data.services);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services based on category and search query
  useEffect(() => {
    let filtered = [...services];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Apply search query filter
    if (searchQuery.trim()) {
      filtered = filtered.filter((service) =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredServices(filtered);
  }, [selectedCategory, searchQuery, services]);

  if (loading) {
    return (
      <div className="loading">
        <Spinners />
      </div>
    );
  }

  return (
    <Layout
      title="Hire a Service"
      description="Browse a variety of services available for hire"
    >
      <CurvedBackground />
      <div>
        <div className="container-fluid py-4">
          <div className="row align-items-start ">
            {/* Sidebar for Filters */}
            <div className="col-md-3">
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
                    style={{ width: "100%" }}
                    placeholder="Search services..."
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

            {/* Service List */}
            <div className="col-md-9">
              {filteredServices.length > 0 ? (
                <div
                  className="row scrollable-container"
                  style={{ maxHeight: "80vh", overflowY: "auto" }}
                >
                  {filteredServices.map((service) => (
                    <div className="col-md-4 mb-4" key={service._id}>
                      <div className="card h-100 shadow-sm">
                        <div className="card-body d-flex flex-column">
                          {/* Service Profile Image */}
                          <div className="d-flex align-items-center mb-3">
                            <img
                              src={`${process.env.REACT_APP_API_URL}/api/v1/service/get-service-photo/${service._id}`}
                              alt="Profile"
                              className="img-fluid"
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                            />
                            <div className="ms-3">
                              <h5
                                className="card-title mt-2"
                                style={{
                                  fontWeight: "bold",
                                  color: "black",
                                  fontSize: "20px",
                                }}
                              >
                                {service.name}
                              </h5>
                              <p
                                className="text-muted"
                                style={{ fontSize: "0.85rem" }}
                              >
                                {service.sellerId?.name}
                              </p>
                            </div>
                          </div>

                          {service.category && (
                            <b
                              className="text-muted"
                              style={{ fontSize: "0.85rem" }}
                            >
                              {service.category}
                            </b>
                          )}
                          <p
                            className="card-text text-muted"
                            style={{ fontSize: "0.9rem" }}
                          >
                            {service.description}
                          </p>
                          <p className="text-success fw-bold">
                            ₹{service.pricePerDay}/Hour
                          </p>

                          {/* Seller Contact */}
                          {service.sellerId && service.sellerId.phone && (
                            <p
                              className="fw-bold"
                              style={{ fontSize: "0.85rem", color: "#6c757d" }}
                            >
                              Contact: {service.sellerId.phone}
                            </p>
                          )}

                          <div className="d-flex justify-content-between mt-auto">
                            {service.sellerId && service.sellerId.phone && (
                              <button
                                className="btn btn-outline-success w-100 mb-2"
                                onClick={() => {
                                  const message = `Hi, I'm interested in hiring the ${service.name} service.`;
                                  const ownerPhoneNumber =
                                    service.sellerId.phone;
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
                            {service.sellerId && service.sellerId.email && (
                              <a
                                href={`mailto:${service.sellerId.email}?subject=Inquiry%20about%20${service.name}&body=Hi%2C%20I'm%20interested%20in%20hiring%20${service.name}.`}
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
                <h4 className="text-center">No services found</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServiceProductPage;
