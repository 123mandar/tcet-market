import { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component to wrap around the application
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  useEffect(() => {
    if (auth?.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    }
  }, [auth.token]);

  // Check localStorage for auth data
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      setAuth({
        user: parsedData.user,
        token: parsedData.token,
      });
    }
  }, []);

  // Save the auth data to localStorage whenever it's updated
  useEffect(() => {
    if (auth?.user && auth?.token) {
      localStorage.setItem("auth", JSON.stringify(auth)); // Save to localStorage
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
