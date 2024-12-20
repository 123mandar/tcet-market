import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext"; // Import useCart to access cart state
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaShoppingCart,
  FaUser,
  FaHandHolding,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa"; // Icons for nav items
import "../../assets/css/Headers.css";
import tcet_logo from "../../assets/img/tcetshieldlogo-removebg-preview.png";

const Headers = () => {
  const [auth, setAuth] = useAuth();
  const { cart, clearCart } = useCart(); // Access the cart and clearCart function from the context
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth state
    setAuth({
      ...auth,
      user: null,
      token: "",
    });

    // Remove auth data from local storage
    localStorage.removeItem("auth");

    // Clear cart and navigate with delay
    clearCart(); // Ensure clearCart runs before the timeout

    // Set a timeout to delay navigation
    setTimeout(() => {
      navigate("/login");
    }, 1000); // 2-second delay

    toast.success("Logged out successfully!"); // Show toast before navigating
  };

  // Get the total number of items in the cart
  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0); // Sum all the item quantities
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container-fluid">
        {/* Logo and Branding */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={tcet_logo}
            alt="TCET Marketplace Logo"
            className="logo-img"
          />
          <div className="logo-name">
            <h5 className="mb-0">Thakur College Marketplace</h5>
          </div>
        </Link>

        {/* Navbar Toggle for Mobile */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Navigation Links with Icons */}
            <li className="nav-item">
              <NavLink to="/" className="nav-link d-flex align-items-center">
                <FaHome className="me-2" /> Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/about"
                className="nav-link d-flex align-items-center"
              >
                <FaInfoCircle className="me-2" /> About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/rent"
                className="nav-link d-flex align-items-center"
              >
                <FaHandHolding className="me-2" /> Borrow
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/cart"
                className="nav-link d-flex align-items-center position-relative"
              >
                <FaShoppingCart className="me-2" />
                Cart
                {/* Conditionally display the badge only if there are items in the cart */}
                {getCartItemCount() > 0 && (
                  <span
                    className="badge position-absolute"
                    style={{
                      top: "-5px",
                      right: "-5px",
                      backgroundColor: "#dda92f",
                    }}
                  >
                    {getCartItemCount()}
                  </span>
                )}
              </NavLink>
            </li>

            {/* Authenticated User Section */}
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className="nav-link d-flex align-items-center"
                  >
                    <FaUser className="me-2" /> Register
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className="nav-link d-flex align-items-center"
                  >
                    <FaUser className="me-2" /> Login
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle d-flex align-items-center"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUser className="me-2" />
                  {auth.user.name}
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth.user.role === "admin" ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      <FaTachometerAlt className="me-2" />
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" />
                    Logout
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-link d-flex align-items-center"
              >
                <FaEnvelope className="me-2" /> Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Headers;
