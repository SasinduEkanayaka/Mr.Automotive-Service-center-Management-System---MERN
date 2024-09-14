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

import CreatePayment from "./pages/Payments/CreatePayment";
import DeletePayment from "./pages/Payments/DeletePayment";
import EditPayment from "./pages/Payments/EditPayment";
import ReadOnePayment from "./pages/Payments/ReadOnePayment";
import ShowPayment from "./pages/Payments/ShowPayment";

export default function App() {
  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory-management/*" element={<DashboardLayout />} />
        <Route path="/book" element={<BookingPage />} />
        <Route path="/book/add/:id" element={<CreateBooking />} />
        <Route path="/pkg" element={<ShowAllPackages />} />





        <Route path="/inventory-management/*" element={<DashboardLayout />} />


        <Route path="/supplier-management/*" element={<DashboardLayouSt />} />

        <Route path="/payment-management/*" element={<DashboardLayoutP />} />


        <Route path='/payments/allPayments' element={<ShowPayment />}></Route>
      <Route path='/payments/detail/:id' element={<ReadOnePayment />}></Route>
      <Route path='/payments/create' element={<CreatePayment />}></Route>
       <Route path='/payments/edit/:id' element={<EditPayment />}></Route>
      <Route path='/payments/delete/:id' element={<DeletePayment />}></Route>

      </Routes>
    </BrowserRouter>
  );
}
