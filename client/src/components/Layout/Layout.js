import React, { useState, useEffect } from "react";
import Headers from "./Headers";
import Footers from "./Footers";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import { FaArrowUp } from "react-icons/fa"; // Import an arrow icon for the button

const Layout = ({ children, title, description, keywords, author }) => {
  const [showScroll, setShowScroll] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div>
      <Helmet>
        <div>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />
          <meta name="keywords" content={keywords} />
          <meta name="author" content={author} />
        </div>
        <title>{title}</title>
      </Helmet>
      <Headers />
      <main style={{ minHeight: "80vh" }}>{children}</main>
      <Toaster />
      <Footers />

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#dda92f", // Customize according to your design
            color: "#fff",
            border: "none",
            padding: "10px 15px",
            cursor: "pointer",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <FaArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default Layout;
