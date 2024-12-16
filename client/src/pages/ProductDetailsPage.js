import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaEnvelope } from "react-icons/fa";
import Layout from "../components/Layout/Layout";
import Spinners from "../components/Layout/Spinners"; // Import the Spinners component
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { slug } = useParams(); // Extract 'slug' from URL params
  const navigate = useNavigate(); // For navigation
  const [product, setProduct] = useState(null); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [quantity, setQuantity] = useState(1); // Quantity state
  const { addToCart } = useCart();

  // Fetch product data
  const fetchProduct = async (slug) => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product/${slug}`);
      if (data.success) {
        setProduct(data.singleProduct);
      } else {
        console.error("Failed to fetch product");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle adding product to the cart
  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    toast.success(`${product.name} added to cart`);
    setTimeout(() => {
      navigate("/cart");
    }, 1000); // Navigate to the Cart page
  };

  useEffect(() => {
    if (slug) {
      fetchProduct(slug); // Fetch product when 'slug' changes
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <Spinners /> {/* Show the loading spinner */}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5 text-center">
        <h2>Product not found!</h2>
        <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>
          Go to Home
        </button>
      </div>
    );
  }

  const totalPrice = product.price * quantity; // Multiply price with quantity

  return (
    <Layout title={"TCET Marketplace | Buy Product"}>
      <div className="container py-5">
        <div className="card p-4 shadow-sm">
          <div className="row g-4">
            {/* Product Image */}
            <div className="col-md-6 text-center">
              <img
                src={`/api/v1/product/get-product-photo/${product._id}`}
                className="card-img-top"
                alt={product.name}
                style={{
                  maxHeight: "300px",
                  objectFit: "cover",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              />
            </div>

            {/* Product Details */}
            <div className="col-md-6">
              <h1 className="mb-3">{product.name}</h1>

              {product.category && (
                <p>
                  <strong>Category:</strong> {product.category.name}
                </p>
              )}
              <p className="text-muted">{product.description}</p>

              <h3 className="text-success fw-bold">₹{totalPrice.toFixed(2)}</h3>

              {/* Quantity Selector */}
              <div className="d-flex align-items-center mb-3">
                <label className="me-2" htmlFor="quantity">
                  Quantity:
                </label>
                <input
                  type="number"
                  id="quantity"
                  value={quantity}
                  min="1"
                  className="form-control w-25"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-md-row justify-content-start align-items-start gap-3 mt-4">
                {/* Add to Cart Button */}
                <button
                  className="btn btn-secondary d-flex align-items-center"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart className="me-2" />
                  Buy Now
                </button>

                {/* Contact Seller Button */}
                <button
                  className="btn btn-secondary d-flex align-items-center"
                  onClick={() =>
                    (window.location.href = "mailto:seller@example.com")
                  }
                >
                  <FaEnvelope className="me-2" />
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
