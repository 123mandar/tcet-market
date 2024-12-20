import { React, useState } from "react";
import Layout from "../../components/Layout/Layout";
import "../../assets/css/AuthPage.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/authContext";
import tcet_logo from "../../assets/img/tcetshieldlogo-removebg-preview.png";

const RegisterPage = () => {
  // State hooks for form data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  // ==================== Handle User Registration ====================
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Send registration request to backend
      const res = await axios.post(
        "https://tcet-market.onrender.com/api/v1/auth/register",
        {
          name,
          email,
          password,
          phone,
        }
      );

      if (res && res.data.success) {
        // Registration successful, show success message
        toast.success(res.data.message);

        // Redirect to login page after a brief delay
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        // Show error if registration fails
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error); // Log the error for debugging
      toast.error("Email is already registered in our database!");
    }
  };

  // ==================== Handle Google Login ====================
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential; // Extract token from response

      // Send the Google token to backend for verification
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/google-login`,
        { token }
      );

      if (response.data.success) {
        // If Google login is successful
        toast.success("Login successfull!");
        setAuth({
          ...auth,
          user: response.data.user,
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        // Redirect to homepage after a brief delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // If Google login fails
        toast.error("Login failed");
      }
    } catch (error) {
      console.log("Google login error:", error); // Log the error for debugging
      toast.error("Google login failed, please try again");
    }
  };

  return (
    <>
      <Layout title={"Register | TCET Marketplace"}>
        <div className="login-container">
          <header className="login-header">
            <img
              src={tcet_logo}
              alt="TCET Marketplace Logo"
              className="login-logo"
            />
            <h1 className="login-title">Register to TCET Marketplace</h1>
          </header>
          <div className="register">
            <form className="register-form" onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="mb-3">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Phone Input */}
              <div className="mb-3">
                <label htmlFor="exampleInputPhone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-secondary w-1">
                Register
              </button>

              {/* Google OAuth */}
              <div className="d-flex justify-content-center mb-3 mt-3">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={handleGoogleLogin} // Google login success handler
                    onError={() => {
                      console.log("Login Failed"); // Error logging for Google login
                    }}
                  />
                </GoogleOAuthProvider>
              </div>
              <div className="d-flex justify-content-center mb-3">
                <a href="/login" className="login-link">
                  Already Registered User? Click here to login
                </a>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default RegisterPage;
