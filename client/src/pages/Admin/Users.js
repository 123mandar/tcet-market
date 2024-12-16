import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";

const Users = () => {
  return (
    <Layout title=" Admin Dashboard | Users Details">
      <div className="container text-center">
        <div className="row mt-3">
          <div className="col-6 col-md-4">
            <AdminMenu />
          </div>
          <div className="col-md-8">
            <div class="card">
              <div class="card-header">
                <h3> Create Users Details</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
