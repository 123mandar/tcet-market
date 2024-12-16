import React from "react";
import { FaShoppingCart, FaHandHolding } from "react-icons/fa";
import { MdSell } from "react-icons/md";
import Layout from "../components/Layout/Layout";
import "./../assets/css/AboutPage.css";
import Typewriter from "typewriter-effect";
import AboutLogo from "./../assets/img/AboutLogo.png";
import img_1 from "./../assets/img/6181789.png";
import buy_img from "./../assets/img/buy.png";
import sell_img from "./../assets/img/sell.png";
import rent_img from "./../assets/img/rent.png";
import CurvedBackground from "./../components/Layout/CurvedBackground";
import { useNavigate } from "react-router-dom";

const AboutPage = () => {
  const navigate = useNavigate();
  return (
    <Layout
      title={"About Us | TCET Marketplace - Your Trusted Online Marketplace"}
    >
      <CurvedBackground />

      <div className="animated-element">
        <div className="container text-center">
          <div class="row">
            <div class="col">
              <h1>
                The leading platform for{" "}
                <span class="highlight">affordable</span> student resources
              </h1>
              <p>
                Discover a range of high-quality, budget-friendly items perfect
                for students. <br />
                Use the search tool below to see if we’re available at your
                university 🎓
              </p>
              <div className="search-bar">
                <input type="text" placeholder="Search for your university" />
                <i className="search-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </i>
              </div>
              <p class="subtext">
                <b>Explore our student resources across the college.</b>
              </p>
            </div>
            <div class="col">
              <img src={img_1} class="img-fluid" alt="..." />
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div class="row">
            <div class="col">
              <img src={AboutLogo} class="img-fluid" alt="..." />
            </div>
            <div class="col">
              <h1>
                <Typewriter
                  options={{
                    strings: [
                      "Buy and sell pre-loved items",
                      "Enjoy a hassle-free experience",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h1>
              <p>
                Explore a variety of high-quality, affordable items curated just
                for students.
                <br />
                Use the search tool below to check if we're at your university
                🎓!
              </p>
              <p class="subtext">
                <b>Explore our student resources across the college.</b>
              </p>
              <div className="search-bar">
                <input type="text" placeholder="Search for your university" />
                <i className="search-icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </i>
              </div>
            </div>
          </div>
        </div>
        <div className="container text-center">
          <div className="row">
            <div
              className="col"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={sell_img}
                className="img-fluid"
                alt="..."
                style={{
                  maxWidth: "300px",
                  height: "auto",
                }}
              />
              <h2
                style={{
                  color: "#333",
                  fontSize: "24px",
                  marginBottom: "20px",
                }}
              >
                <b>List now</b>
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                If you're in need of a declutter, want to sell your own
                creations or have an existing small business, upload your items
                now to the
              </p>
              <p
                style={{
                  color: "#666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                Either follow our step by step listing process or use our
                importer.
              </p>
              <button
                type="button"
                className="btn btn-secondary w-50 d-flex justify-content-center align-items-center"
                onClick={() => navigate("/")}
              >
                <FaShoppingCart class="icon" />
                &nbsp;Buy
              </button>
            </div>
            <div
              className="col"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={buy_img}
                className="img-fluid"
                alt="..."
                style={{ maxWidth: "300px", height: "auto" }}
              />
              <h2
                style={{
                  color: "#333",
                  fontSize: "24px",
                  marginBottom: "20px",
                }}
              >
                <b>Shop now</b>
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                We know what students want, we've been there ourselves! Shop
                from a range of student tailored categories built with you guys
                in mind, featuring 'under £10'
              </p>
              <p
                style={{
                  color: "#666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                Either follow our step by step listing process or use our
                importer.
              </p>
              <button
                type="button"
                className="btn btn-secondary w-50 d-flex justify-content-center align-items-center"
                onClick={() => navigate("/dashboard/user/create-order")}
              >
                <MdSell />
                &nbsp;Sell
              </button>
            </div>
            <div
              className="col"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <img
                src={rent_img}
                className="img-fluid"
                alt="..."
                style={{ maxWidth: "300px", height: "auto" }}
              />
              <h2
                style={{
                  color: "#333",
                  fontSize: "24px",
                  marginBottom: "20px",
                }}
              >
                <b>Rent now</b>
              </h2>
              <p
                style={{
                  color: "#666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                We know what students want, we've been there ourselves! Shop
                from a range of student tailored categories built with you guys
                in mind, featuring 'under £10'
              </p>
              <p
                style={{
                  color: "#666",
                  fontSize: "16px",
                  lineHeight: "1.5",
                  marginBottom: "20px",
                }}
              >
                Either follow our step by step listing process or use our
                importer.
              </p>
              <button
                type="button"
                className="btn btn-secondary w-50 d-flex justify-content-center align-items-center"
                onClick={() => navigate("/dashboard/user/rent-order")}
              >
                <FaHandHolding />
                &nbsp;Rent
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
