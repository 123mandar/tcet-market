import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Spinners.css";

const Spinners = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevalue) => --prevalue);
    }, 1000);

    if (count === 0) {
      clearInterval(interval);
      navigate("/login");
    }

    return () => clearInterval(interval);
  }, [count, navigate]);

  return (
    <div className="spinner-container">
      <div role="status">
        <span class="loader"></span>
      </div>
    </div>
  );
};

export default Spinners;
