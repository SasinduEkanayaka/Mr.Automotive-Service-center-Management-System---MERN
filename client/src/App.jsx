import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/inventory management/DashboardLayout";
import Sidebar from "./pages/inventory management/Sidebar";
import Home from "./pages/Home";
import AddSparePartPage from "./pages/inventory management/AddSparePartPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inventory-management/*" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
