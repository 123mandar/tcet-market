import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
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
  FaBars, // Added for custom navbar toggler
} from "react-icons/fa"; // Icons for nav items
import "../../assets/css/Headers.css";
import tcet_logo from "../../assets/img/tcetshieldlogo-removebg-preview.png";

const Headers = () => {
  const [auth, setAuth] = useAuth();
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    clearCart();
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    toast.success("Logged out successfully!");
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={tcet_logo}
            alt="TCET Marketplace Logo"
            className="logo-img"
          />
          <div className="logo-name">
            <h5 className="mb-0">TCET Marketplace</h5>
          </div>
        </Link>

        {/* Custom Navbar Toggler Button */}
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars /> {/* Use custom icon for toggler */}
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
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
