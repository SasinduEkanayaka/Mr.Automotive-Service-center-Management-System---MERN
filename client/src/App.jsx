import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardLayout from "./pages/inventory management/DashboardLayout";
import DashboardLayouSt from "./pages/Supplier management/DashboardLayoutS";
import Sidebar from "./pages/inventory management/Sidebar";
import Home from "./pages/Home";
// import AddSparePartPage from "./pages/inventory management/AddSparePartPage";
import AddSupplierPage from "./pages/Supplier management/AddSupplierPage";

export default function App() {
  return (
    <BrowserRouter>
      {/* <Routes>
        <Route path="/inventory-management/*" element={<DashboardLayout />} />
      </Routes> */}

      <Routes>
        <Route path="/supplier-management/*" element={<DashboardLayouSt />} />
      </Routes>
    </BrowserRouter>
  );
}
