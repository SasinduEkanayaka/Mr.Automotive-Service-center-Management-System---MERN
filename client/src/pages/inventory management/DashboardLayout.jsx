import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { motion } from "framer-motion";
import { FaBars } from "react-icons/fa";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import ManageParts from "./ManageParts";
import DashboardOverview from "./DashboardOverview";
import AddSparePartPage from "./AddSparePartPage";
import CreatePackage from "../packageManagement/CreatePackage";
import ShowAllPackages from "../packageManagement/ShowAllPackages";
import UpdatePackage from "../packageManagement/UpdatePackage";
import BookingManagement from "../bookings/BookingManagement";

const contentVariants = {
  open: { marginLeft: 250, transition: { type: "spring", stiffness: 50 } },
  closed: { marginLeft: 0, transition: { type: "spring", stiffness: 50 } },
};

export default function DashboardLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative min-h-screen bg-PrimaryColor">
      {/* Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 bg-ExtraDarkColor text-SecondaryColor p-2 rounded-full shadow-md"
        onClick={toggleSidebar}
      >
        <FaBars size={20} />
      </button>

      {/* Sidebar Component */}
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <motion.main
        className="flex-1 ml-0 transition-all"
        variants={contentVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <Header />

        {/* Routes for Dashboard Components */}
        <Routes>
          <Route path="/" element={<DashboardOverview />} />
          <Route path="/add-parts" element={<AddSparePartPage />} />

          <Route
            path="/inventory-management/manage-parts"
            element={<ManageParts />}
          />
          <Route path="/pkg" element={<ShowAllPackages />} />
          <Route path="/create-pkg" element={<CreatePackage />} />
          <Route path="/upd/:id" element={<UpdatePackage />} />

          <Route path="/bmng" element={<BookingManagement />} />
          <Route path="/manage-parts" element={<ManageParts />} />
        </Routes>
      </motion.main>
    </div>
  );
}
