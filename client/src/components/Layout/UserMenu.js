import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaShoppingCart,
  FaHandshake,
  FaTools,
  FaBoxOpen,
  FaClipboardList,
  FaTasks,
  FaReceipt,
  FaDollarSign,
  FaUser,
} from "react-icons/fa";
import "../../assets/css/ProfileMenu.css";

const UserMenu = () => {
  return (
    <>
      <div className="list-group">
        <NavLink
          to="/dashboard/user"
          style={{ backgroundColor: "#dda92f", border: " 1px solid #dda92f " }}
          className="list-group-item list-group-item-action"
        >
          <FaUser className="me-2" />
          User Panel
        </NavLink>
        <NavLink
          to="/dashboard/user/create-order"
          className="list-group-item list-group-item-action"
        >
          <FaShoppingCart className="me-2" />
          Sell Product
        </NavLink>
        <NavLink
          to="/dashboard/user/create-rent-order"
          className="list-group-item list-group-item-action"
        >
          <FaHandshake className="me-2" />
          Rent Product
        </NavLink>
        <NavLink
          to="/dashboard/user/create-service"
          className="list-group-item list-group-item-action"
        >
          <FaTools className="me-2" />
          Offer Service
        </NavLink>
        <NavLink
          to="/dashboard/user/manage-products"
          className="list-group-item list-group-item-action"
        >
          <FaBoxOpen className="me-2" />
          Manage Your Products
        </NavLink>
        <NavLink
          to="/dashboard/user/manage-rented-products"
          className="list-group-item list-group-item-action"
        >
          <FaClipboardList className="me-2" />
          Manage Your Rented Products
        </NavLink>
        <NavLink
          to="/dashboard/user/manage-services"
          className="list-group-item list-group-item-action"
        >
          <FaTasks className="me-2" />
          Manage Your Offered Services
        </NavLink>
        <NavLink
          to="/dashboard/user/manage-orders"
          className="list-group-item list-group-item-action"
        >
          <FaReceipt className="me-2" />
          Manage Your Orders
        </NavLink>
        <NavLink
          to="/dashboard/user/manage-purchased-products"
          className="list-group-item list-group-item-action"
        >
          <FaDollarSign className="me-2" />
          Purchased Products
        </NavLink>
      </div>
    </>
  );
};

export default UserMenu;
