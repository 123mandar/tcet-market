import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import CurvedBackground from "../components/Layout/CurvedBackground";
import { Link } from "react-router-dom";
import "../assets/css/RentPage.css"; // External CSS file for styling

const RentPage = () => {
  const categories = [
    {
      name: "Books",
      image:
        "https://images.unsplash.com/photo-1604866830893-c13cafa515d5?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Rent textbooks and study guides.",
      link: "/rent/products",
    },
    {
      name: "Electronics",
      image:
        "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Rent laptops, tablets, and more.",
      link: "/rent/products",
    },
    {
      name: "Sports Equipment",
      image:
        "https://plus.unsplash.com/premium_photo-1714573122708-d1b42332e0a5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8U3BvcnRzJTIwRXF1aXBtZW50fGVufDB8fDB8fHww",
      description: "Rent sports gear for activities.",
      link: "/rent/products",
    },
    {
      name: "Furniture",
      image:
        "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=600",
      description: "Rent furniture for your room or apartment.",
      link: "/rent/products",
    },
    {
      name: "Transport",
      image:
        "https://images.unsplash.com/photo-1519750078696-b5051c379982?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8VHJhbnNwb3J0fGVufDB8fDB8fHww",
      description: "Rent bikes, scooters, and more.",
      link: "/rent/products",
    },
    {
      name: "Fashion",
      image:
        "https://plus.unsplash.com/premium_photo-1664202526559-e21e9c0fb46a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8RmFzaGlvbnxlbnwwfHwwfHx8MA%3D%3D",
      description: "Rent formal wear and accessories.",
      link: "/rent/products",
    },
  ];

  return (
    <Layout title="Rental Services | TCET Marketplace">
      <CurvedBackground />
      <div className="rent-container">
        <div className="rent-grid">
          {categories.map((category, index) => (
            <div key={index} className="rent-card">
              <img
                src={category.image}
                alt={category.name}
                className="rent-card-img"
              />
              <div className="rent-card-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <Link to={category.link} className="rent-btn">
                  <FaInfoCircle className="icon" />
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default RentPage;
