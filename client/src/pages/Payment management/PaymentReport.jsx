import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import { motion } from "framer-motion";

const PaymentReport = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [averagePayment, setAveragePayment] = useState(0);
  const [downloadType, setDownloadType] = useState("pdf");
  const [loading, setLoading] = useState(true);

  // Fallback in case the environment variable isn't available
  const companyLogoBase64 = import.meta.env.REACT_APP_COMPANY_LOGO_BASE64 || "";

  useEffect(() => {
    // Fetch payment data from API
    const fetchPaymentData = async () => {
      try {
        const response = await fetch("http://localhost:3000/payments");
        const data = await response.json();
        console.log("Fetched payment data:", data); // Check the format of the data
        if (data && Array.isArray(data.data)) {
          setPaymentData(data.data);
        } else {
          console.error("Expected data.data to be an array but got:", data);
          setPaymentData([]);
        }
      } catch (error) {
        console.error("Error fetching payment data:", error);
        setPaymentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentData();
  }, []);

  useEffect(() => {
    if (Array.isArray(paymentData) && paymentData.length > 0) {
      // Calculate total and average payments
      const total = paymentData.reduce((sum, payment) => sum + (payment.Pamount || 0), 0);
      const average = total / paymentData.length;
      setTotalPayments(total);
      setAveragePayment(average);
    } else {
      setTotalPayments(0);
      setAveragePayment(0);
    }
  }, [paymentData]);

  const generatePDF = () => {
    const doc = new jsPDF();

    // Check if the logo exists before trying to add it
    if (companyLogoBase64) {
      doc.addImage(companyLogoBase64, "PNG", 10, 10, 30, 30);
    } else {
      console.warn("Company logo not found.");
    }

    doc.setFontSize(18);
    doc.text("Payment Report", 75, 20);

    // Add report details
    doc.setFontSize(12);
    doc.text(`Total Payments: $${totalPayments.toFixed(2)}`, 10, 50);
    doc.text(`Average Payment: $${averagePayment.toFixed(2)}`, 10, 60);

    // Add table
    if (Array.isArray(paymentData)) {
      doc.autoTable({
        head: [
          ["Payment ID", "Customer Name", "Vehicle Number", "Payment Date", "Payment Method", "Booking ID", "Package", "Amount"],
        ],
        body: paymentData.map((payment) => [
          payment.PaymentId,
          payment.cusName,
          payment.Vehicle_Number,
          payment.PaymentDate,
          payment.PaymentMethod,
          payment.Booking_Id,
          payment.Package || "N/A",
          `$${(payment.Pamount || 0).toFixed(2)}`,
        ]),
        startY: 70,
      });
    }

    // Add signature at the bottom
    doc.text(
      "Authorized Signature: ____________________",
      10,
      doc.internal.pageSize.height - 20
    );

    // Save the PDF
    doc.save("payment_report.pdf");
  };

  const generateCSV = () => {
    const csvData = [
      ["Payment ID", "Customer Name", "Vehicle Number", "Payment Date", "Payment Method", "Booking ID", "Package", "Amount"],
      ...paymentData.map((payment) => [
        payment.PaymentId,
        payment.cusName,
        payment.Vehicle_Number,
        payment.PaymentDate,
        payment.PaymentMethod,
        payment.Booking_Id,
        payment.Package || "N/A",
        (payment.Pamount || 0).toFixed(2),
      ]),
    ];
    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "payment_report.csv");
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
      <h2 className="text-2xl font-bold text-dark mb-4">Payment Report</h2>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
      >
        {/* Summary info as cards */}
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Total Payments</h3>
          <p className="text-2xl">Rs.{totalPayments.toFixed(2)}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-2">Average Payment</h3>
          <p className="text-2xl">Rs.{averagePayment.toFixed(2)}</p>
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

      {/* Payment Table */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-6"
      >
        <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-700 text-white">
                <th className="py-2 px-4">Payment ID</th>
                <th className="py-2 px-4">Customer Name</th>
                <th className="py-2 px-4">Vehicle Number</th>
                <th className="py-2 px-4">Payment Date</th>
                <th className="py-2 px-4">Payment Method</th>
                <th className="py-2 px-4">Booking ID</th>
                <th className="py-2 px-4">Package</th>
                <th className="py-2 px-4">Package Amount</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(paymentData) && paymentData.length > 0 ? (
                paymentData.map((payment) => (
                  <tr key={payment.PaymentId} className="text-center">
                    <td className="py-2 px-4">{payment.PaymentId}</td>
                    <td className="py-2 px-4">{payment.cusName}</td>
                    <td className="py-2 px-4">{payment.Vehicle_Number}</td>
                    <td className="py-2 px-4">{payment.PaymentDate}</td>
                    <td className="py-2 px-4">{payment.PaymentMethod}</td>
                    <td className="py-2 px-4">{payment.Booking_Id}</td>
                    <td className="py-2 px-4">{payment.Package || "N/A"}</td>
                    <td className="py-2 px-4">Rs.{(payment.Pamount || 0).toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default PaymentReport;
