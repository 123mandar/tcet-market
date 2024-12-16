import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";

const RentProduct = () => {
  return (
    <Layout title="User Dashboard | Rent Product">
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
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default RentProduct;
