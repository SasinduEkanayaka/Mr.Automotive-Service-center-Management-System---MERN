import React, { useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/AdminSidebar";
import CountUp from "react-countup";
import { Routes, Route } from "react-router-dom"; // Importing Routes and Route

import DashboardOverview from "./DashboardOverview";
import AddSupplierPage from "../Supplier management/AddSupplierPage";
import CustomerProfile from "./Customerprofile";
import AddRequestItemPage from "../Supplier management/AddRequestItemPage";
import ManageRequestItem from "../Supplier management/ManageRequestItem";

const UserDashboard = () => {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleCollapseChange = (collapsed) => {
    setSidebarCollapsed(collapsed);
  };
  return (
    <div>
      <AdminSidebar onCollapseChange={handleCollapseChange} />

      <main
        style={{
          marginLeft: isSidebarCollapsed ? "60px" : "220px",
          transition: "margin-left 0.3s",
            // width: isSidebarCollapsed
            //   ? "calc(100% - 70px)"
            //   : "calc(100% - 280px)",
        }}
        className=" bg-white min-h-screen rounded-2xl"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900">
              <CountUp id="countto1" end={250} />+
            </h3>
            <p className="text-base font-medium text-dark-grey-600">
              Successful Projects
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900">
              <CountUp id="countto2" end={1200} />+
            </h3>
            <p className="text-base font-medium text-dark-grey-600">
              Happy Customers
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900">
              <CountUp id="countto3" end={150} />+
            </h3>
            <p className="text-base font-medium text-dark-grey-600">
              Employees
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-5xl font-extrabold text-dark-grey-900">
              <CountUp id="countto3" end={150} />+
            </h3>
            <p className="text-base font-medium text-dark-grey-600">
              Employees
            </p>
          </div>
        </div>
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/add-supplier" element={<AddSupplierPage />} />
          <Route path="/add-request-item" element={<AddRequestItemPage />} />
          <Route path="/manage-request-item" element={<ManageRequestItem />} />
          <Route
            path="/customer/:customerId"
            element={<CustomerProfile />}
          />
        </Routes>
      </main>
    </div>
  );
};

export default UserDashboard;
