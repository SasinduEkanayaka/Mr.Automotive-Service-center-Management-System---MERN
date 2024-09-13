import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddRequestItemPage = () => {
  const [requestID, setRequestID] = useState("");
  const [supplierName, setSupplierName] = useState("");
  const [requestDate, setRequestDate] = useState("");
  const [itemName, setItemName] = useState("");
  const [brand, setBrand] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send request item data to backend API
      await axios.post("http://localhost:3000/requestItems/", {
        requestID,
        supplierName,
        requestDate,
        itemName,
        brand,
        quantity,
      });

      Swal.fire({
        title: "Success!",
        text: "Request item added successfully.",
        icon: "success",
      });

      // Clear the form fields after successful submission
      setRequestID("");
      setSupplierName("");
      setRequestDate("");
      setItemName("");
      setBrand("");
      setQuantity("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add request item.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-primary min-h-screen flex justify-center items-center p-4">
      <div className="bg-secondary p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h2 className="text-dark text-3xl font-bold mb-6 bg-gray-800 text-white">
          Add Request Item
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="text-dark block mb-2">Request ID</label>
            <input
              type="text"
              className="w-full p-2 border border-dark rounded"
              value={requestID}
              onChange={(e) => setRequestID(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-dark block mb-2">Supplier Name</label>
            <input
              type="text"
              className="w-full p-2 border border-dark rounded"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-dark block mb-2">Request Date</label>
            <input
              type="date"
              className="w-full p-2 border border-dark rounded"
              value={requestDate}
              onChange={(e) => setRequestDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-dark block mb-2">Item Name</label>
            <input
              type="text"
              className="w-full p-2 border border-dark rounded"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-dark block mb-2">Brand</label>
            <input
              type="text"
              className="w-full p-2 border border-dark rounded"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="text-dark block mb-2">Quantity</label>
            <input
              type="number"
              className="w-full p-2 border border-dark rounded"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full p-2 border border-dark rounded ${
              loading ? "bg-gray-500" : "bg-blue-500 text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Request Item"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRequestItemPage;
