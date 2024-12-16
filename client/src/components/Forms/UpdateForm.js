import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateForm = ({ productData, refreshProducts }) => {
  const [category, setCategory] = useState([]); // List of categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [productName, setProductName] = useState(""); // Product name
  const [productDescription, setProductDescription] = useState(""); // Product description
  const [productPrice, setProductPrice] = useState(""); // Product price
  const [productQuantity, setProductQuantity] = useState(""); // Product quantity
  const [shipping, setShipping] = useState(false); // Shipping availability
  const [productPhoto, setProductPhoto] = useState(null); // Product photo

  // Update local state when productData changes
  useEffect(() => {
    if (productData) {
      setSelectedCategory(productData.category?._id || "");
      setProductName(productData.name || "");
      setProductDescription(productData.description || "");
      setProductPrice(productData.price || "");
      setProductQuantity(productData.quantity || "");
      setShipping(productData.shipping || false);
    }
  }, [productData]);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/v1/category/get-category");
        if (data.success) {
          setCategory(data.getCategory);
        } else {
          toast.error("Failed to load categories");
        }
      } catch {
        toast.error("Error fetching categories");
      }
    };

    fetchCategories();
  }, []);

  // Handle product update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", productDescription);
      formData.append("price", productPrice);
      formData.append("quantity", productQuantity);
      formData.append("category", selectedCategory);
      formData.append("shipping", shipping);
      if (productPhoto) formData.append("photo", productPhoto);

      const { data } = await axios.put(
        `/api/v1/product/update-product/${productData._id}`,
        formData
      );

      if (data.success) {
        toast.success("Product updated successfully");
        refreshProducts(); // Refresh product list
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch {
      toast.error("Something went wrong while updating the product");
    }
  };

  return (
    <>
      {/* Trigger Modal */}
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target={`#updateProductModal-${productData._id}`}
      >
        Edit
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={`updateProductModal-${productData._id}`}
        tabIndex="-1"
        aria-labelledby={`updateProductModalLabel-${productData._id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#dda92f" }}
            >
              <h5
                className="modal-title"
                id={`updateProductModalLabel-${productData._id}`}
              >
                Update Product
              </h5>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
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

                {/* Category */}
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
                    {category.map((c) => (
                      <option key={c._id} value={c._id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
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

                {/* Price */}
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

                {/* Quantity */}
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
                    <option value="false">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>

                {/* Photo */}
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

                {/* Actions */}
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-secondary me-2"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-secondary">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
