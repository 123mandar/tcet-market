import { React, useState } from "react";
import Layout from "../components/Layout/Layout";
import "../assets/css/ContactPage.css";
import toast from "react-hot-toast";
import CurvedBackground from "./../components/Layout/CurvedBackground";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/v1/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Contact data submitted successfully!");
      } else {
        toast.error(data.error || "Failed to submit contact data");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred while submitting the contact form.");
    }
  };

  return (
    <>
      <Layout title="Contact Us | TCET Marketplace">
        <CurvedBackground />
        <div className="contact_us_6">
          <div className="responsive-container-block container">
            <form className="form-box">
              <div className="container-block form-wrapper">
                <div className="mob-text">
                  <p className="text-blk contactus-head">Get in Touch</p>
                </div>
                <div className="responsive-container-block" id="i2cbk">
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="i10mt-3"
                  >
                    <p className="text-blk input-title">FIRST NAME</p>
                    <input
                      type="text"
                      className="input"
                      id="ijowk-3"
                      name="firstName"
                      placeholder="Please enter first name..."
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="ip1yp"
                  >
                    <p className="text-blk input-title">EMAIL</p>
                    <input
                      type="email"
                      className="input"
                      id="ipmgh-3"
                      name="email"
                      placeholder="Please enter email..."
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="ih9wi"
                  >
                    <p className="text-blk input-title">PHONE NUMBER</p>
                    <input
                      type="tel"
                      className="input"
                      id="imgis-3"
                      name="phoneNumber"
                      placeholder="Please enter phone number..."
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div
                    className="responsive-cell-block wk-tab-12 wk-mobile-12 wk-desk-12 wk-ipadp-12"
                    id="i634i-3"
                  >
                    <p className="text-blk input-title">
                      WHAT DO YOU HAVE IN MIND ?
                    </p>
                    <textarea
                      name="message"
                      className="textinput"
                      id="i5vyy-3"
                      placeholder="Please enter query..."
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  id="w-c-s-bgc_p-1-dm-id-2"
                >
                  Submit
                </button>
              </div>
            </form>
            <div
              className="responsive-cell-block wk-desk-7 wk-ipadp-12 wk-tab-12 wk-mobile-12"
              id="i772w"
            >
              <div className="map-part">
                <iframe
                  className="map-box container-block"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.7819117134736!2d72.86800877466821!3d19.204725547919825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b7394d843d65%3A0x173d337b9d0a18d!2sSarova%20Complex%20Rd%2C%20Kandivali%2C%20Singh%20Agri%20Estate%2C%20Kandivali%20East%2C%20Mumbai%2C%20Maharashtra%20400101!5e0!3m2!1sen!2sin!4v1728218086136!5m2!1sen!2sin"
                  style={{ width: "580px", height: "580px" }}
                  title="Google Maps showing Sarova Complex Road in Mumbai, Maharashtra"
                />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ContactPage;
