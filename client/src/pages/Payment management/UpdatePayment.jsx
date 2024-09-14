import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const UpdatePayment = ({ isOpen, onClose, paymentData, onUpdate }) => {
  const [PaymentId, setPaymentId] = useState(paymentData?.PaymentId || "");
  const [cusID, setCusID] = useState(paymentData?.cusID || "");
  const [Vehicle_Number, setVehicle_Number] = useState(paymentData?.Vehicle_Number || "");
  const [PaymentDate, setPaymentDate] = useState(paymentData?.PaymentDate || "");
  const [PaymentMethod, setPaymentMethod] = useState(paymentData?.PaymentMethod || "");
  const [Booking_Id, setBooking_Id] = useState(paymentData?.Booking_Id || "");
  const [Package, setPackage] = useState(paymentData?.Package || "");
  const [Pamount, setPamount] = useState(paymentData?.Pamount || 0);
  const [email, setEmail] = useState(paymentData?.email || "");
  const [loading, setLoading] = useState(false);
  const [currentId, setCurrentId] = useState(paymentData?._id || ""); // Track the current ID
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (paymentData) {
      setPaymentId(paymentData.PaymentId || "");
      setCusID(paymentData.cusID || "");
      setVehicle_Number(paymentData.Vehicle_Number || "");
      setPaymentDate(paymentData.PaymentDate || "");
      setPaymentMethod(paymentData.PaymentMethod || "");
      setBooking_Id(paymentData.Booking_Id || "");
      setPackage(paymentData.Package || "");
      setPamount(paymentData.Pamount || 0);
      setEmail(paymentData.email || "");
      setCurrentId(paymentData._id || ""); // Update current ID
    }
  }, [paymentData]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/maintance/get");
        setPackages(response.data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };
    fetchPackages();
  }, []);

  const handlePackageChange = (e) => {
    const selectedPackage = packages.find(pkg => pkg.pkgName === e.target.value);
    setPackage(e.target.value);
    setPamount(selectedPackage ? selectedPackage.pkgPrice : 0);
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await axios.put(`http://localhost:3000/payments/${currentId}`, {
        PaymentId: PaymentId,
        cusID: cusID,
        Vehicle_Number: Vehicle_Number,
        PaymentDate: PaymentDate,
        PaymentMethod: PaymentMethod,
        Booking_Id: Booking_Id,
        Package: Package,
        Pamount: Pamount,
        email: email,
      });

      Swal.fire({
        title: "Success!",
        text: "Payment updated successfully.",
        icon: "success",
      });

      onUpdate(data); // Notify parent component with updated data
      onClose(); // Close the popup after update
    } catch (error) {
      console.error("Error updating payment:", error); // Log error details
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update payment.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <h2 className="text-dark text-2xl font-bold mb-6">Update Payment</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="text-dark block mb-2">Customer ID</label>
              <input
                type="text"
                className="w-full p-2 border border-dark rounded"
                value={cusID}
                onChange={(e) => setCusID(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-dark block mb-2">Vehicle Number</label>
              <input
                type="text"
                className="w-full p-2 border border-dark rounded"
                value={Vehicle_Number}
                onChange={(e) => setVehicle_Number(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-dark block mb-2">Payment Date</label>
              <input
                type="date"
                className="w-full p-2 border border-dark rounded"
                value={PaymentDate}
                onChange={(e) => setPaymentDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-dark block mb-2">Payment Method</label>
              <select
                className="w-full p-2 border border-dark rounded"
                value={PaymentMethod}
                onChange={handlePaymentMethodChange}
                required
              >
                <option value="" disabled>Select a payment method</option>
                {["Credit Card", "Debit Card", "Cash", "Bank Transfer"].map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-dark block mb-2">Booking ID</label>
              <input
                type="text"
                className="w-full p-2 border border-dark rounded"
                value={Booking_Id}
                onChange={(e) => setBooking_Id(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-dark block mb-2">Package</label>
              <select
                className="w-full p-2 border border-dark rounded"
                value={Package}
                onChange={handlePackageChange}
              >
                <option value="" disabled>Select a package</option>
                {packages.map(pkg => (
                  <option key={pkg.pkgID} value={pkg.pkgName}>{pkg.pkgName}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="text-dark block mb-2">Payment Amount</label>
              <input
                type="number"
                className="w-full p-2 border border-dark rounded"
                value={Pamount}
                onChange={(e) => setPamount(parseFloat(e.target.value))}
                required
              />
            </div>
            <div className="mb-4">
              <label className="text-dark block mb-2">Email</label>
              <input
                type="email"
                className="w-full p-2 border border-dark rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className={`w-full p-2 border border-dark rounded ${loading ? "bg-gray-500" : "bg-blue-500 text-white"}`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Update Payment"}
            </button>
            <button
              type="button"
              className="mt-4 w-full p-2 border border-dark rounded bg-red-500 text-white"
              onClick={onClose}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    )
  );
};

export default UpdatePayment;
