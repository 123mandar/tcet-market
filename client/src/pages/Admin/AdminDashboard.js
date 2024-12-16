import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/authContext.js"; // Use auth context for authentication state
import Spinners from "../../components/Layout/Spinners.js";

const AdminDashboard = () => {
  const [auth] = useAuth(); // Access auth state and setter function
  if (!auth || !auth.user) {
    return (
      <div>
        <Spinners />
      </div>
    );
  }
  return (
    <Layout title="Admin Dashboard | Category Details">
      <div className="container py-4">
        <div
          className="row"
          style={{ alignItems: "flex-start", marginTop: "0px" }}
        >
          <div className="col-md-3 mb-4">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <div className="card shadow">
              <div
                className="card-header text-black"
                style={{ backgroundColor: "#dda92f" }}
              >
                <h3>Admin Details</h3>
              </div>
              <div className="card-body">
                <table class="table table-striped table-responsive">
                  <thead></thead>
                  <tbody>
                    <tr>
                      <td>
                        <b>Admin Name:</b> {auth.user.name}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Admin Email:</b> {auth.user.email}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Admin Phone:</b> {auth.user.phone}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>Admin Role:</b> {auth.user.role}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
