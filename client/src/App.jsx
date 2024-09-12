import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/inventory management/DashboardLayout";
import Sidebar from "./pages/inventory management/Sidebar";
import Home from "./pages/Home";
import AddSparePartPage from "./pages/inventory management/AddSparePartPage";
import BookingPage from "./pages/bookings/BookingPage";
import CreateBooking from "./pages/bookings/CreateBooking";
import ShowAllPackages from "./pages/packageManagement/ShowAllPackages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory-management/*" element={<DashboardLayout />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/book/add/:id" element={<CreateBooking />} />
        <Route path="/pkg" element={<ShowAllPackages />} />
      </Routes>
    </BrowserRouter>
  );
}
