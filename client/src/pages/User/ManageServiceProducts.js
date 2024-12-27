import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { AiFillDelete } from "react-icons/ai"; // Import delete icon
import toast from "react-hot-toast";

const ManageServiceProduct = () => {
  const [services, setServices] = useState([]);

  // Fetch services associated with the logged-in seller
  const fetchSellerServices = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/service/seller-services`
      );

      if (data.success) {
        setServices(data.services); // Ensure the key matches 'services'
      } else {
        console.error(data.message || "Failed to fetch services");
      }
    } catch (error) {
      console.error("Error fetching services:", error.message);
    }
  };

  // Delete service function
  const deleteService = async (serviceId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this service?"
    );
    if (!confirmDelete) return;

    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/service/delete-service/${serviceId}`
      );

      if (data.success) {
        toast.success("Service deleted successfully");
        // Remove the deleted service from the state
        setServices(services.filter((service) => service._id !== serviceId));
      } else {
        alert(data.message || "Failed to delete service");
      }
    } catch (error) {
      console.error("Error deleting service:", error.message);
      alert("An error occurred while deleting the service");
    }
  };

  useEffect(() => {
    fetchSellerServices();
  }, []);

  return (
    <Layout title="User Dashboard | Manage Services">
      <div className="container py-4">
        <div
          className="row"
          style={{ alignItems: "flex-start", marginTop: "0px" }}
        >
          {/* User Menu Section */}
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>

          {/* Services Management Section */}
          <div className="col-md-9">
            <div className="card shadow-sm">
              <div
                className="card-header text-black"
                style={{ backgroundColor: "#dda92f" }}
              >
                <h3>Manage Your Services</h3>
              </div>
              <div className="card-body">
                {services.length > 0 ? (
                  <div className="row">
                    {services.map((service) => {
                      return (
                        <div key={service._id} className="col-md-4 mb-3">
                          <div className="card">
                            <div className="card-body">
                              {service.photo && (
                                <img
                                  src={service.photo}
                                  alt={service.name}
                                  style={{ width: "100%", height: "auto" }}
                                />
                              )}
                              <h5>{service.name}</h5>
                              <p>Price Per Day: ₹{service.pricePerDay}</p>
                              <p>Category: {service.category || "N/A"}</p>
                              <p>
                                Status:{" "}
                                {service.isRented ? "Rented" : "Available"}
                              </p>
                              {/* Delete Button */}
                              <button
                                className="btn btn-danger"
                                onClick={() => deleteService(service._id)}
                              >
                                <AiFillDelete />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p>No services found!</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ManageServiceProduct;
