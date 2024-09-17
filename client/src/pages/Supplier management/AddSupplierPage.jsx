import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AddSupplierPage = () => {
  const [supplierName, setSupplierName] = useState("");
  const [itemNo, setItemNo] = useState("");
  const [itemName, setItemName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([]); // State for storing items
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchParts();
  }, []);

  const fetchParts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/spareparts");
      setItems(response.data); // Store fetched items in state
    } catch (error) {
      console.error("Error fetching parts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send supplier data to backend API
      await axios.post("http://localhost:3000/suppliers/", {
        SupplierName: supplierName,
        ItemNo: itemNo,
        ItemName: itemName,
        ContactNo: contactNo,
        Email: email,
        Address: address,
      });

      Swal.fire({
        title: "Success!",
        text: "Supplier added successfully.",
        icon: "success",
      });

      // Clear the form fields after successful submission
      setSupplierName("");
      setItemNo("");
      setItemName("");
      setContactNo("");
      setEmail("");
      setAddress("");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Failed to add supplier.",
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
          Supplier Registration
        </h2>
        <form onSubmit={handleSubmit}>
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
          {/* <div className="mb-4">
            <label className="text-dark block mb-2">Item Number</label>
            <input
              type="text"
              className="w-full p-2 border border-dark rounded"
              value={itemNo}
              onChange={(e) => setItemNo(e.target.value)}
              required
            />
          </div> */}
          <div className="mb-4">
            <label className="text-dark block mb-2">Item Name</label>
            <select
              className="w-full p-2 border border-dark rounded"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Item
              </option>
              {items.map((item) => (
                <option key={item._id} value={item.itemName}>
                  {item.partName}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="text-dark block mb-2">Contact Number</label>
            <input
              type="text"
              className="w-full p-2 border border-dark rounded"
              value={contactNo}
              onChange={(e) => setContactNo(e.target.value)}
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
          <div className="mb-4">
            <label className="text-dark block mb-2">Address</label>
            <textarea
              className="w-full p-2 border border-dark rounded"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
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
            {loading ? "Adding..." : "Add Supplier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSupplierPage;
