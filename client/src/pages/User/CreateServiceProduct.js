import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/authContext";

const CreateServiceProduct = () => {
  const [auth] = useAuth(); // Fetch logged-in user's information
  const predefinedCategories = [
    { id: "1", name: "Tutoring" },
    { id: "2", name: "Event Management" },
    { id: "3", name: "Photography" },
    { id: "4", name: "Graphic Design" },
    { id: "5", name: "Technical Support" },
    { id: "6", name: "Fitness Coaching" },
    { id: "7", name: "Music Lessons" },
    { id: "8", name: "Content Writing" },
    { id: "9", name: "Other" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [serviceName, setServiceName] = useState("");
  const [serviceDescription, setServiceDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [servicePhoto, setServicePhoto] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", serviceName);
      formData.append("description", serviceDescription);
      formData.append("pricePerDay", pricePerDay);
      formData.append("category", selectedCategory);
      if (servicePhoto) formData.append("photo", servicePhoto);
      formData.append("sellerId", auth.user._id); // Add sellerId from logged-in user

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/service/create-service`,
        formData
      );

      if (data?.success) {
        toast.success("Service created successfully!");
        setTimeout(() => navigate("/dashboard/user/manage-services"), 1500);

        // Reset form fields
        setServiceName("");
        setServiceDescription("");
        setPricePerDay("");
        setServicePhoto(null);
        setSelectedCategory("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating service");
    }
  };

  return (
    <Layout title="User Dashboard | Create Service">
      <div className="container py-4">
        <div
          className="row"
          style={{ alignItems: "flex-start", marginTop: "0px" }}
        >
          <div className="col-md-3 mb-4">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div
                className="card-header text-black"
                style={{ backgroundColor: "#dda92f" }}
              >
                <h3>Create Service</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Service Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Service Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={serviceName}
                      onChange={(e) => setServiceName(e.target.value)}
                      placeholder="Enter service name"
                      required
                    />
                  </div>
                  {/* Select Category */}
                  <div className="mb-3">
                    <label htmlFor="category" className="form-label">
                      Select Category
                    </label>
                    <select
                      id="category"
                      className="form-select"
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      required
                    >
                      <option value="">Select Category</option>
                      {predefinedCategories.map((c) => (
                        <option key={c.id} value={c.name}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/* Service Description */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Service Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="4"
                      value={serviceDescription}
                      onChange={(e) => setServiceDescription(e.target.value)}
                      placeholder="Enter service description"
                      required
                    ></textarea>
                  </div>
                  {/* Price Per Day */}
                  <div className="mb-3">
                    <label htmlFor="pricePerDay" className="form-label">
                      Price Per Day (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="pricePerDay"
                      value={pricePerDay}
                      onChange={(e) => setPricePerDay(e.target.value)}
                      placeholder="Enter price per day"
                      required
                    />
                  </div>
                  {/* Service Photo */}
                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                      Upload Your Profile Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="photo"
                      onChange={(e) => setServicePhoto(e.target.files[0])}
                    />
                    <small className="text-muted">
                      Image size must be less than 1MB.
                    </small>
                    {servicePhoto && (
                      <div className="mt-3">
                        <img
                          src={URL.createObjectURL(servicePhoto)}
                          alt="Service Preview"
                          className="img-thumbnail shadow"
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-secondary">
                      Create Service
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateServiceProduct;
