import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar";
import DashboardOverview from "./DashboardOverview";
import AddSupplierPage from "../Supplier management/AddSupplierPage";
import CustomerProfile from "./Customerprofile";
import ManageBooking from "../user/ManageBooking";
import Managepayment from "./Managepayment";

const UserDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <AdminSidebar onCollapseChange={handleCollapseChange} />

      {/* Main content */}
      <main
        style={{
          marginLeft: isSidebarCollapsed ? "60px" : "220px",
          transition: "margin-left 0.3s",
        }}
        className="bg-white min-h-screen w-full p-6"
      >
        {/* Routes to switch between different views */}
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/manage/:id" element={<CustomerProfile />} />
          <Route path="/booking" element={<ManageBooking />} />
          <Route path="/payment" element={< Managepayment/>} />
        </Routes>
      </main>
    </div>
  );
};

export default UserDashboard;
