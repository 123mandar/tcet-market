import React, { useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/authContext";

const CreateRentProduct = () => {
  const [auth] = useAuth(); // Fetch logged-in user's information
  const predefinedCategories = [
    { id: "1", name: "Books" },
    { id: "2", name: "Electronics" },
    { id: "3", name: "Sports Equipment" },
    { id: "4", name: "Furniture" },
    { id: "5", name: "Transport" },
    { id: "6", name: "Fashion" },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [pricePerDay, setPricePerDay] = useState("");
  const [productPhoto, setProductPhoto] = useState(null);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("pricePerDay", pricePerDay);
      formData.append("category", selectedCategory);
      if (productPhoto) formData.append("photo", productPhoto);
      formData.append("sellerId", auth.user._id); // Add sellerId from logged-in user

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/rent-product/create-rent-product`,
        formData
      );

      if (data?.success) {
        toast.success("Rent Product created successfully!");
        setTimeout(
          () => navigate("/dashboard/user/manage-rented-products"),
          1500
        );

        // Reset form fields
        setProductName("");
        setProductDescription("");
        setPricePerDay("");
        setProductPhoto(null);
        setSelectedCategory("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating rent product");
    }
  };

  return (
    <Layout title="User Dashboard | Create Rent Product">
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
                <h3>Rent Product</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Product Name */}
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Product Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                      placeholder="Enter product name"
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
                  {/* Product Description */}
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                      Product Description
                    </label>
                    <textarea
                      className="form-control"
                      id="description"
                      rows="4"
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                      placeholder="Enter product description"
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
                  {/* Product Photo */}
                  <div className="mb-3">
                    <label htmlFor="photo" className="form-label">
                      Upload Product Photo
                    </label>
                    <input
                      type="file"
                      className="form-control"
                      id="photo"
                      onChange={(e) => setProductPhoto(e.target.files[0])}
                    />
                    <small className="text-muted">
                      Image size must be less than 1MB.
                    </small>
                    {productPhoto && (
                      <div className="mt-3">
                        <img
                          src={URL.createObjectURL(productPhoto)}
                          alt="Product Preview"
                          className="img-thumbnail shadow"
                          style={{ maxHeight: "200px" }}
                        />
                      </div>
                    )}
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-secondary">
                      Create Rent Product
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

export default CreateRentProduct;
