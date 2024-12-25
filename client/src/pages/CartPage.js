import React from "react";
import { useCart } from "../context/cartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../context/authContext";
import cart_img from "./../assets/img/cart.jpg";
import { FaShoppingCart } from "react-icons/fa";

const CartPage = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [auth] = useAuth();

  const handleCheckout = async (productId) => {
    if (!auth || !auth.token) {
      navigate("/login");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/order/create-order`,
        { productId },
        {
          headers: { Authorization: `Bearer ${auth.token}` },
        }
      );

      if (data.success) {
        const options = {
          key: process.env.RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: "INR",
          name: "TCET Marketplace",
          description: "Product Payment",
          order_id: data.razorpayOrderId,
          handler: async (response) => {
            try {
              const verifyData = {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              };

              const verifyRes = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/v1/order/verify-payment`,
                verifyData,
                {
                  headers: { Authorization: `Bearer ${auth.token}` },
                }
              );

              if (verifyRes.data.success) {
                toast.success(
                  "Payment verified and order placed successfully!"
                );
                clearCart();
              } else {
                toast.error("Payment verification failed.");
              }
            } catch (error) {
              toast.error("Payment verification failed. Please try again.");
            }
          },
          prefill: {
            name: auth.user.name,
            email: auth.user.email,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Checkout failed. Please try again.");
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container py-5 text-center">
          <img
            src={cart_img}
            alt="Empty Cart"
            style={{ width: "200px", marginBottom: "20px" }}
          />
          <h1>Your cart is empty</h1>
          <button
            className="btn btn-secondary mt-3"
            style={{ width: "150px" }} /* Adjust width as needed */
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-5">
        <h1 className="text-center mb-4">
          <FaShoppingCart className="me-2" />
          Your Cart
        </h1>
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item._id} className="card mb-3">
              <div className="row g-0">
                <div className="col-md-4">
                  <img
                    src={`${process.env.REACT_APP_API_URL}/api/v1/product/get-product-photo/${item._id}`}
                    alt={item.name}
                    className="img-fluid rounded m-4"
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p>Price: ₹{item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleCheckout(item._id)}
                    >
                      Checkout
                    </button>
                    <button
                      className="btn btn-danger ms-2"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;
