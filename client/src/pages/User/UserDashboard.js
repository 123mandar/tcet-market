import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/authContext"; // Access auth state
import Spinner from "react-bootstrap/Spinner"; // Import Bootstrap spinner (or use your own spinner)

const UserDashboard = () => {
  const [auth] = useAuth(); // Access auth state

  // Show spinner if auth or user data is loading
  if (!auth || !auth.user) {
    return (
      <Layout title="User Dashboard | Category Details">
        <div className="container text-center mt-5">
          <Spinner animation="border" role="status" variant="secondary">
            <span className="visually-hidden"></span>
          </Spinner>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="User Dashboard | Category Details">
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
                <h3>User Details</h3>
              </div>
              <div className="card-body">
                <table className="table table-striped table-responsive">
                  <tbody>
                    <tr>
                      <td>
                        <b>User Name:</b> {auth.user.name}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>User Email:</b> {auth.user.email}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>User Phone:</b> {auth.user.phone}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <b>User Role:</b> {auth.user.role}
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

export default UserDashboard;
