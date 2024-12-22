import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import CurvedBackground from "../components/Layout/CurvedBackground";
import { Link } from "react-router-dom";
import "../assets/css/HirePage.css";

const HirePage = () => {
  const categories = [
    {
      name: "Tutoring",
      image:
        "https://plus.unsplash.com/premium_photo-1683121997715-4393a4aa9e99?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Find tutors for  subjects and competitive exams.",
      link: "/hire/tutoring",
    },
    {
      name: "Event Management",
      image:
        "https://images.unsplash.com/photo-1670420421505-804c23232098?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8RXZlbnQlMjBNYW5hZ2VtZW50fGVufDB8fDB8fHww",
      description: "Hire event planners for college fests or private events.",
      link: "/hire/event-management",
    },
    {
      name: "Photography",
      image:
        "https://plus.unsplash.com/premium_photo-1674389991678-0836ca77c7f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Hire photographers for events, portfolios, or projects.",
      link: "/hire/photography",
    },
    {
      name: "Graphic Design",
      image:
        "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Hire designers for posters, logos, and presentations.",
      link: "/hire/graphic-design",
    },
    {
      name: "Technical Support",
      image:
        "https://plus.unsplash.com/premium_photo-1683134018612-560033455e43?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Get help with coding, troubleshooting, and IT tasks.",
      link: "/hire/technical-support",
    },
    {
      name: "Fitness Coaching",
      image:
        "https://plus.unsplash.com/premium_photo-1661580282598-6883482b4c8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Hire fitness trainers for personal or group sessions.",
      link: "/hire/fitness-coaching",
    },
    {
      name: "Music Lessons",
      image:
        "https://images.unsplash.com/photo-1471478331149-c72f17e33c73?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Learn musical instruments or vocals from peers.",
      link: "/hire/music-lessons",
    },
    {
      name: "Content Writing",
      image:
        "https://plus.unsplash.com/premium_photo-1666299356749-5f7422b52e87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Hire writers for blogs, reports, or creative projects.",
      link: "/hire/content-writing",
    },
  ];

  return (
    <Layout title="Hire Services | TCET Marketplace">
      <CurvedBackground />
      <div className="hire-container">
        <div className="hire-grid">
          {categories.map((category, index) => (
            <div key={index} className="hire-card">
              <img
                src={category.image}
                alt={category.name}
                className="hire-card-img"
              />
              <div className="hire-card-content">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
                <Link to={category.link} className="hirePage-btn">
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

export default HirePage;
