import React from "react";
import { NavLink } from "react-router-dom";
import "../../assets/css/ProfileMenu.css";

const UserMenu = () => {
  return (
    <>
      <div className="list-group ">
        <NavLink
          to="/dashboard/user"
          style={{ backgroundColor: "#dda92f", border: " 1px solid #dda92f " }}
          className="list-group-item list-group-item-action"
        >
          User Panel
        </NavLink>
        <NavLink
          to="/dashboard/user/create-order"
          className="list-group-item list-group-item-action"
        >
          Sell Product
        </NavLink>
        <NavLink
          to="/dashboard/user/rent-order"
          className="list-group-item list-group-item-action"
        >
          Rent Product
        </NavLink>
        <NavLink
          to="/dashboard/user/manage-products"
          className="list-group-item list-group-item-action"
        >
          Manage Your Products
        </NavLink>
        <NavLink
          to="/dashboard/user/manage-orders"
          className="list-group-item list-group-item-action"
        >
          Manage Your Orders
        </NavLink>
      </div>
    </>
  );
};

export default UserMenu;
