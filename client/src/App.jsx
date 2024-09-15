import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/inventory management/DashboardLayout";
import DashboardLayouSt from "./pages/Supplier management/DashboardLayoutS";
import DashboardLayoutP from "./pages/Payment management/DashboardLayoutP";

import Sidebar from "./pages/inventory management/Sidebar";
import Home from "./pages/Home";

import AddSparePartPage from "./pages/inventory management/AddSparePartPage";
import BookingPage from "./pages/bookings/BookingPage";
import CreateBooking from "./pages/bookings/CreateBooking";
import ShowAllPackages from "./pages/packageManagement/ShowAllPackages";

import AddSupplierPage from "./pages/Supplier management/AddSupplierPage";
import AdminSidebar from "./components/AdminSidebar";

import UserDashboard from "./pages/user/UserDashboard";
import DashboardOverview from "./pages/user/DashboardOverview";
import CustomerProfile from "./pages/user/Customerprofile";
import CreateCustomer from "./pages/user/CreateCustomer";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory-management/*" element={<DashboardLayout />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/book/add/:id" element={<CreateBooking />} />

        <Route path="/inventory-management/*" element={<DashboardLayout />} />

        <Route path="/supplier-management/*" element={<DashboardLayouSt />} />

        <Route path="/payment-management/*" element={<DashboardLayoutP />} />
        {/* <Route path="/das/*" element={< CustomerProfile/>} /> */}

        <Route path="/side" element={<AdminSidebar />} />
        <Route path="/user-manage/*" element={<UserDashboard />} />
        <Route path="/signup" element={<CreateCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}
