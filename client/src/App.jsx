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

import DisplayBookings from "./pages/bookings/DisplayBookings";

import AdminSidebar from "./components/AdminSidebar";

import UserDashboard from "./pages/user/UserDashboard";

// import Login from "./components/Login";
// import Signup from "./components/Signup";

import CustomModification from "./pages/modificationManagement/CustomModification";
import ShowPayment from "./pages/Payment management/DashboardOverview";
import SignUp from "./pages/authentication/SignUp";
import SignIn from "./pages/authentication/SignIn";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/inventory-management/*" element={<DashboardLayout />} />
        <Route path="/Booking" element={<BookingPage />} />
        <Route path="/book/add/:id" element={<CreateBooking />} />

        <Route path="/pkg" element={<ShowAllPackages />} />

        <Route path="/Service" element={<CustomModification />} />

        <Route path="/supplier-management/*" element={<DashboardLayouSt />} />

        {/* <Route path="/payments/allPayments" element={<ShowPayment />}></Route>
        <Route path="/payments/detail/:id" element={<ReadOnePayment />}></Route>
        <Route path="/payments/create" element={<CreatePayment />}></Route>
        <Route path="/payments/edit/:id" element={<EditPayment />}></Route>
        <Route path="/payments/delete/:id" element={<DeletePayment />}></Route> */}

        <Route path="/payment-management/*" element={<DashboardLayoutP />} />

        <Route path="/side" element={<AdminSidebar />} />
        <Route path="/userside" element={<UserDashboard />} />

        <Route path="/Bookings" element={<DisplayBookings />} />

        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}
