import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserShield,
  FaTag,
  FaEdit,
  FaFileAlt,
  FaBoxes,
} from "react-icons/fa"; // Import the icons
import "../../assets/css/ProfileMenu.css";

const AdminMenu = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/admin"
          style={{ backgroundColor: "#dda92f", border: " 1px solid #dda92f " }}
          className="list-group-item list-group-item-action"
        >
          <div className="card-header text-black">
            <h3>
              <FaUserShield className="me-2" /> Admin Panel
            </h3>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/admin/create-category"
          className="list-group-item list-group-item-action"
        >
          <FaTag className="me-2" />
          Product Category
        </NavLink>

        <NavLink
          to="/dashboard/admin/update-product"
          className="list-group-item list-group-item-action"
        >
          <FaEdit className="me-2" />
          Update Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/update-rent-product"
          className="list-group-item list-group-item-action"
        >
          <FaFileAlt className="me-2" />
          Update Rent Product
        </NavLink>

        <NavLink
          to="/dashboard/admin/manage-order"
          className="list-group-item list-group-item-action"
        >
          <FaBoxes className="me-2" />
          Manage All Orders
        </NavLink>
      </div>
    </>
  );
};

export default AdminMenu;
