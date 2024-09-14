import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddPaymentPage = () => {
  const [cusID, setCusID] = useState("");
  const [Vehicle_Number, setVehicle_Number] = useState("");
  const [PaymentDate, setPaymentDate] = useState("");
  const [PaymentMethod, setPaymentMethod] = useState("");
  const [Booking_Id, setBooking_Id] = useState("");
  const [Package, setPackage] = useState(""); // Optional field
  const [Pamount, setPamount] = useState(0);
  const [email, setEmail] = useState("");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const paymentMethods = ["Credit Card", "Debit Card", "Cash", "Bank Transfer"]; // Add or modify payment methods as needed

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
      await axios.post("http://localhost:3000/payments", {
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
        text: "Payment added successfully.",
        icon: "success",
      });

      setCusID("");
      setVehicle_Number("");
      setPaymentDate("");
      setPaymentMethod("");
      setBooking_Id("");
      setPackage("");
      setPamount(0);
      setEmail("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add payment.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary min-h-screen flex justify-center items-center p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-dark text-3xl font-bold mb-6 bg-gray-800 text-white">Add Payment</h2>
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
              {paymentMethods.map(method => (
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
            <label className="text-dark block mb-2">Package (Optional)</label>
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
            <label className="text-dark block mb-2">Partial Amount</label>
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
            {loading ? "Adding..." : "Add Payment"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddPaymentPage;
