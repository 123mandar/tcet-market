import { React, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import "../../assets/css/AuthPage.css";
import toast from "react-hot-toast";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/authContext";
import tcet_logo from "./../../assets/img/tcetshieldlogo-removebg-preview.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth, setAuth] = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      // Make a POST request to register the user
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
        {
          email,
          password,
        }
      );
      // If the registration is successful
      if (res && res.data.success) {
        toast.success(res.data.message); // Show success message
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        setTimeout(() => {
          navigate("/");
        }, 2000);
        // Delays the redirect so user can see the success message
      } else {
        toast.error(res.data.message); // Show error message if registration fails from controller
      }
    } catch (error) {
      console.log(error); // Log the error for debugging
      toast.error("Wrong password or user doesn't exist !"); // Show general error message if something unexpected happens
    }
  };

  // ==================== Handle Google Login ====================
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential; // Extract token from response

      // Send the Google token to backend for verification
      const response = await axios.post("/api/v1/auth/google-login", { token });

      if (response.data.success) {
        // If Google login is successful
        toast.success("Login successful!");

        // Update the auth state and redirect
        setAuth({
          ...auth,
          user: response.data.user, // Use 'response' instead of 'res'
          token: response.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(response.data));
        // Redirect to homepage after a brief delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        // If Google login fails
        toast.error("Login failed !");
      }
    } catch (error) {
      console.log("Google login error:", error); // Log the error for debugging
      toast.error("Google login failed, please try again");
    }
  };

  return (
    <Layout title={"Login | TCET Marketplace"}>
      <div className="login-container">
        <header className="login-header">
          <img
            src={tcet_logo} // replace with your logo path
            alt="TCET Marketplace Logo"
            className="login-logo"
          />
          <h1 className="login-title">Login to TCET Marketplace</h1>
        </header>

        <div className="register">
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
                id="exampleInputEmail1"
                required="True"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                id="exampleInputPassword1"
                required="True"
              />
            </div>

            <button type="submit" className="btn btn-secondary w-100">
              Login
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
              <a href="/register" className="login-link">
                Don't have an account? Sign up now!
              </a>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
