import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/authContext";

const CreateProduct = () => {
  const [auth] = useAuth(); // Fetch logged-in user's information
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [productName, setProductName] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productQuantity, setProductQuantity] = useState("");
  const [shipping, setShipping] = useState(false);
  const [productPhoto, setProductPhoto] = useState(null);
  const navigate = useNavigate();

  // Fetch categories from the API
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategory(data.getCategory);
      }
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("category", selectedCategory);
      formData.append("quantity", productQuantity);
      formData.append("shipping", shipping);
      if (productPhoto) formData.append("photo", productPhoto);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/product/create-product`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Include user's token
          },
        }
      );

      if (data?.success) {
        toast.success("Product created successfully!");
        setTimeout(() => navigate("/"), 1500);

        // Reset form fields
        setProductName("");
        setProductDescription("");
        setProductPrice("");
        setProductQuantity("");
        setShipping(false);
        setProductPhoto(null);
        setSelectedCategory("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error creating product");
    }
  };

  return (
    <Layout title="User Dashboard | Create Product">
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
                <h3>Sell Product</h3>
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
                      {category.length > 0 ? (
                        category.map((c) => (
                          <option key={c._id} value={c._id}>
                            {c.name}
                          </option>
                        ))
                      ) : (
                        <option disabled>Loading categories...</option>
                      )}
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
                  {/* Product Price */}
                  <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                      Product Price (₹)
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="price"
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                      placeholder="Enter price"
                      required
                    />
                  </div>
                  {/* Product Quantity */}
                  <div className="mb-3">
                    <label htmlFor="quantity" className="form-label">
                      Product Quantity
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="quantity"
                      value={productQuantity}
                      onChange={(e) => setProductQuantity(e.target.value)}
                      placeholder="Enter quantity"
                      required
                    />
                  </div>
                  {/* Shipping */}
                  <div className="mb-3">
                    <label htmlFor="shipping" className="form-label">
                      Shipping Available
                    </label>
                    <select
                      id="shipping"
                      className="form-select"
                      value={shipping}
                      onChange={(e) => setShipping(e.target.value === "true")}
                      required
                    >
                      <option value={false}>No</option>
                      <option value={true}>Yes</option>
                    </select>
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
                      Create Product
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

export default CreateProduct;
