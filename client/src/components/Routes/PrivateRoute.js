import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinners from "../Layout/Spinners";

const PrivateRoute = () => {
  const [ok, setOk] = useState(false);
  const [auth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/user-auth", {
          headers: { Authorization: `Bearer ${auth.token}` }, // Explicitly include token
        });
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(
          "Error during authentication check:",
          error.response?.data || error.message
        );
        setOk(false); // Set to false in case of any error
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  // Render the Outlet component if the user is authenticated, otherwise show a spinner
  return ok ? <Outlet /> : <Spinners />;
};

export default PrivateRoute;
