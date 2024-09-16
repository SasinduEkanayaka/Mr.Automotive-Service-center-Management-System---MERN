import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import { motion } from "framer-motion";

const InventoryReport = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [lowStockItems, setLowStockItems] = useState([]);
  const [totalStock, setTotalStock] = useState(0);
  const [isStockExcellent, setIsStockExcellent] = useState(false);
  const [downloadType, setDownloadType] = useState("pdf");
  const [loading, setLoading] = useState(true);

  // Fallback in case the environment variable isn't available
  const companyLogoBase64 = import.meta.env.REACT_APP_COMPANY_LOGO_BASE64 || "";

  useEffect(() => {
    // Fetch inventory data from API
    const fetchInventoryData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/spareparts");
        const data = await response.json();
        setInventoryData(data);
      } catch (error) {
        console.error("Error fetching inventory data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInventoryData();
  }, []);

  useEffect(() => {
    if (inventoryData.length > 0) {
      // Calculate total stock and low stock items
      const total = inventoryData.reduce((sum, item) => sum + item.quantity, 0);
      const lowStock = inventoryData.filter((item) => item.quantity < 20);
      setLowStockItems(lowStock);
      setTotalStock(total);
      setIsStockExcellent(total / inventoryData.length > 50); // Example stock level check
    }
  }, [inventoryData]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Check if the logo exists before trying to add it
    if (companyLogoBase64) {
      doc.addImage(companyLogoBase64, "PNG", 10, 10, 30, 30);
    } else {
      console.warn("Company logo not found.");
    }

    doc.setFontSize(18);
    doc.text("Inventory Report", 75, 20);

    // Add report details
    doc.setFontSize(12);
    doc.text(`Total Items: ${inventoryData.length}`, 10, 50);
    doc.text(`Low Stock Items: ${lowStockItems.length}`, 10, 60);
    doc.text(
      `Stock Level: ${isStockExcellent ? "Excellent" : "Needs Attention"}`,
      10,
      70
    );

    // Add table
    doc.autoTable({
      head: [
        ["Name", "Supplier", "Price", "Quantity", "Category", "Type", "Total"],
      ],
      body: inventoryData.map((item) => [
        item.partName,
        item.supplier,
        `$${item.price.toFixed(2)}`,
        item.quantity,
        item.category,
        item.type,
        `$${(item.price * item.quantity).toFixed(2)}`,
      ]),
      startY: 80,
    });

    // Add signature at the bottom
    doc.text(
      "Stock Manager Signature: ____________________",
      10,
      doc.internal.pageSize.height - 20
    );

    // Save the PDF
    doc.save("inventory_report.pdf");
  };

  const generateCSV = () => {
    const csvData = [
      ["Name", "Supplier", "Price", "Quantity", "Category", "Type", "Total"],
      ...inventoryData.map((item) => [
        item.partName,
        item.supplier,
        item.price.toFixed(2),
        item.quantity,
        item.category,
        item.type,
        (item.price * item.quantity).toFixed(2),
      ]),
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "inventory_report.csv");
    link.click();
  };

  const handleDownload = () => {
    if (downloadType === "pdf") {
      generatePDF();
    } else {
      generateCSV();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-6 bg-primary rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-dark mb-4">Inventory Report</h2>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
      >
        {/* Summary info as cards */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Total Items</h3>
          <p className="text-2xl">{inventoryData.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Low Stock Items</h3>
          <p className="text-2xl">{lowStockItems.length}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Stock Level</h3>
          <p
            className={`text-2xl ${
              isStockExcellent ? "text-green-600" : "text-red-600"
            }`}
          >
            {isStockExcellent ? "Excellent" : "Needs Attention"}
          </p>
        </div>
      </motion.div>

      {/* Download options */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <label className="block mb-2">Download Report As:</label>
        <select
          value={downloadType}
          onChange={(e) => setDownloadType(e.target.value)}
          className="p-2 border border-dark rounded"
        >
          <option value="pdf">PDF</option>
          <option value="csv">CSV</option>
        </select>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="p-3 bg-gray-600 text-white rounded-lg shadow hover:bg-gray-800"
        onClick={handleDownload}
      >
        Download Report
      </motion.button>

      {/* Inventory Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <h3 className="text-xl font-semibold mb-4">Inventory Items</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Supplier</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Quantity</th>
                <th className="py-2 px-4">Category</th>
                <th className="py-2 px-4">Type</th>
                <th className="py-2 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {inventoryData.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="py-2 px-4">{item.partName}</td>
                  <td className="py-2 px-4">{item.supplier}</td>
                  <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">{item.category}</td>
                  <td className="py-2 px-4">{item.type}</td>
                  <td className="py-2 px-4">
                    ${(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default InventoryReport;
