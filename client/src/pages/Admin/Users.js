import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/ProfileMenu.css";

const Users = () => {
  return (
    <>
      <div className="list-group ">
        <NavLink
          to="/dashboard/admin"
          style={{ backgroundColor: "#dda92f", border: " 1px solid #dda92f " }}
          className="list-group-item list-group-item-action"
        >
          <div className="card-header text-black">
            <h3>Admin Panel</h3>
          </div>
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          Product Category
        </NavLink>
        <NavLink
          to="/dashboard/admin/create-product"
          className="list-group-item list-group-item-action"
        >
          Sell Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/update-product"
          className="list-group-item list-group-item-action"
        >
          Update Product
        </NavLink>
        <NavLink
          to="/dashboard/admin/orders"
          className="list-group-item list-group-item-action"
        >
          Manage Orders
        </NavLink>
        <NavLink
          to="/dashboard/admin/user"
          className="list-group-item list-group-item-action"
        >
          Users
        </NavLink>
      </div>
    </>
  );
};

export default Users;
