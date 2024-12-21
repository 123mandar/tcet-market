import React from "react";
import Layout from "../components/Layout/Layout";
import "../assets/css/PageNotFound.css";
import { NavLink } from "react-router-dom";
const PageNotFound = () => {
  return (
    <>
      <Layout title={"Page Not Found | TCET Marketplace"}>
        <div className="page-not-found">
          <a target="_blank">
            <header className="top-header"></header>
            {/*dust particel*/}
            <div>
              <div className="starsec" />
              <div className="starthird" />
              <div className="starfourth" />
              <div className="starfifth" />
            </div>
            {/*Dust particle end-*/}
            <div className="lamp__wrap">
              <div className="lamp">
                <div className="cable" />
                <div className="cover" />
                <div className="in-cover">
                  <div className="bulb" />
                </div>
                <div className="light" />
              </div>
            </div>
            {/* END Lamp */}
          </a>
          <section className="error">
            <a href="https://codepen.io/uiswarup/full/vYPxywO" target="_blank">
              {/* Content */}
            </a>
            <div className="error__content">
              <a target="_blank">
                <div className="error__message message">
                  <h1 className="message__title">Page Not Found</h1>
                  <div className="error__nav e-nav">
                    <NavLink to={"/"} className="e-nav__link">
                      GO TO HOME PAGE
                    </NavLink>
                  </div>
                  <p className="message__text">
                    We're sorry, the page you were looking for isn't found here.
                    The link you followed may either be broken or no longer
                    exists. Please try again, or take a look at our.
                  </p>
                </div>
              </a>
            </div>
            {/* END Content */}
          </section>
        </div>
      </Layout>
    </>
  );
};

export default PageNotFound;
