/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/cartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaInfoCircle,
  FaEnvelope,
  FaShoppingCart,
  FaUser,
  FaHandHolding,
  FaTachometerAlt,
  FaSignOutAlt,
  FaBars,
  FaUserTie,
  FaCommentDots,
  FaCalendarAlt,
  FaToolbox,
  FaShareAlt,
  FaCartArrowDown,
  FaBell,
} from "react-icons/fa";
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

  const getCartItemCount = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar navbar-expand-lg bg-light shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={tcet_logo}
            alt="TCET Marketplace Logo"
            className="logo-img"
          />
        </Link>

        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FaBars />
        </button>

        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaToolbox className="me-2" /> Services
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/" className="dropdown-item">
                    <FaCartArrowDown className="me-2" /> Buy
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/rent" className="dropdown-item">
                    <FaHandHolding className="me-2" /> Borrow
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/service" className="dropdown-item">
                    <FaUserTie className="me-2" /> Hire
                  </NavLink>
                </li>
              </ul>
            </li>

            {/* About & Support Dropdown */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaInfoCircle className="me-2" /> About & Support
              </a>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/about" className="dropdown-item">
                    <FaInfoCircle className="me-2" /> About Us
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/contact" className="dropdown-item">
                    <FaEnvelope className="me-2" /> Contact Us
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle d-flex align-items-center"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <FaShareAlt className="me-2" />
                Connect Zone
              </a>
              <ul className="dropdown-menu">
                <li className="nav-item">
                  <NavLink to="/chat" className="dropdown-item">
                    <FaCommentDots className="me-2" /> Community Hub
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/events" className="dropdown-item">
                    <FaCalendarAlt className="me-2" /> Upcoming Events
                  </NavLink>
                </li>
              </ul>
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
                      <FaTachometerAlt className="me-2" /> Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/cart" className="dropdown-item">
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
                  <li className="dropdown-item" onClick={handleLogout}>
                    <FaBell className="me-2" /> Notification
                  </li>
                  <li className="dropdown-item" onClick={handleLogout}>
                    <FaSignOutAlt className="me-2" /> Logout
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Headers;
