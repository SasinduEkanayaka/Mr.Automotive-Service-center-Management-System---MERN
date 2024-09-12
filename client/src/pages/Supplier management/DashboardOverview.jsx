import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from "framer-motion";
import { FaBox, FaChartLine } from "react-icons/fa";

const ShowSupplier = () => {
  const [suppliers, setSupplier] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/suppliers')
      .then((response) => {
        setSupplier(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  // Handle Approve and Decline
  const handleApprove = (id) => {
    const supplierToApprove = suppliers.find((supplier) => supplier._id === id);

    // Update the supplier's status locally
    setSupplier((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier._id === id ? { ...supplier, status: "approved" } : supplier
      )
    );

    // Post the approved supplier to the server
    axios
      .post('http://localhost:3000/suppliers/approve', {
        SupplierID: supplierToApprove.SupplierID,
        SupplierName: supplierToApprove.SupplierName,
        status: "approved",
      })
      .then((response) => {
        console.log("Supplier approved successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error approving supplier:", error);
      });
  };

  const handleDecline = (id) => {
    setSupplier((prevSuppliers) =>
      prevSuppliers.map((supplier) =>
        supplier._id === id ? { ...supplier, status: "declined" } : supplier
      )
    );
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Filter approved suppliers for the Manager Dashboard
  const approvedSuppliers = suppliers.filter(
    (supplier) => supplier.status === "approved"
  );

  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ExtraDarkColor">
          Manager Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <button className="bg-DarkColor text-white px-4 py-2 rounded-md shadow hover:bg-ExtraDarkColor transition-colors duration-300">
            Generate Report
          </button>
          <button className="bg-DarkColor text-white px-4 py-2 rounded-md shadow hover:bg-ExtraDarkColor transition-colors duration-300">
            Add Supplier
          </button>
        </div>
      </div>

      {/* Supplier Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaBox className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">
              Total Approved Suppliers
            </h2>
            <p className="text-2xl font-semibold text-DarkColor">
              {approvedSuppliers.length}
            </p>
          </div>
        </motion.div>

        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaChartLine className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">Low Stock</h2>
            <p className="text-2xl font-semibold text-DarkColor">12 Parts</p>
          </div>
        </motion.div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="text-center mt-6 text-DarkColor">Loading...</div>
      ) : (
        <div className="mt-12 bg-SecondaryColor p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold text-ExtraDarkColor mb-6">
            Supplier Details
          </h2>
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-DarkColor text-white">
              <tr>
                <th className="py-3 px-5 text-left">Supplier ID</th>
                <th className="py-3 px-5 text-left">Supplier Name</th>
                <th className="py-3 px-5 text-left">Status</th>
                <th className="py-3 px-5 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr
                  key={supplier._id}
                  className="border-b hover:bg-PrimaryColor transition-colors duration-300"
                >
                  <td className="py-3 px-5 text-ExtraDarkColor">
                    {supplier.SupplierID}
                  </td>
                  <td className="py-3 px-5 text-ExtraDarkColor">
                    {supplier.SupplierName}
                  </td>
                  <td className="py-3 px-5 text-ExtraDarkColor">
                    {supplier.status || "Pending"}
                  </td>
                  <td className="py-3 px-5 text-ExtraDarkColor">
                    {supplier.status === "approved" || supplier.status === "declined" ? (
                      <span>{supplier.status}</span>
                    ) : (
                      <>
                        <button
                          className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                          onClick={() => handleApprove(supplier._id)}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-3 py-1 rounded-md"
                          onClick={() => handleDecline(supplier._id)}
                        >
                          Decline
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowSupplier;
