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
import CustomModification from "./pages/modificationManagement/CustomModification";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/inventory-management/*" element={<DashboardLayout />} />
        <Route path="/Booking" element={<BookingPage />} />
        <Route path="/book/add/:id" element={<CreateBooking />} />

        <Route path="/Service" element={<CustomModification />} />

        <Route path="/inventory-management/*" element={<DashboardLayout />} />

        <Route path="/supplier-management/*" element={<DashboardLayouSt />} />

        <Route path="/payment-management/*" element={<DashboardLayoutP />} />
      </Routes>
    </BrowserRouter>
  );
}
