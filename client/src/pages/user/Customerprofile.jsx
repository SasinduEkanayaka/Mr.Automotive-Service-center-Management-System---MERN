import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
// import UpdateCustomerPopup from './UpdateCustomer'; // Placeholder for edit popup

const CustomerProfile = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/customers/${customerId}`);
        setCustomer(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer:', error);
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/customers/${customerId}`);
      alert('Customer deleted successfully');
      // Add logic to redirect or update UI after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
    }
  };

  const handleUpdate = () => {
    setShowUpdatePopup(true);
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (!customer) {
    return <div className="text-center mt-6">Customer not found</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">{`${customer.firstName} ${customer.lastName}`}'s Profile</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col space-y-4">
          <img src={customer.image} alt="Customer" className="w-32 h-32 rounded-full object-cover mb-4" />
          <p><strong>Customer ID:</strong> {customer.cusID}</p>
          <p><strong>NIC:</strong> {customer.NIC}</p>
          <p><strong>Contact:</strong> {customer.phone}</p>
          <p><strong>Email:</strong> {customer.cusEmail}</p>
          <p><strong>Address:</strong> {customer.Address}</p>
        </div>

        <div className="flex items-center space-x-4 mt-6">
          <button
            onClick={handleUpdate}
            className="text-green-500 hover:text-green-700 flex items-center space-x-2"
          >
            <FaEdit /> <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700 flex items-center space-x-2"
          >
            <FaTrash /> <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Update Customer Popup */}
      {/* <AnimatePresence>
        {showUpdatePopup && (
          <UpdateCustomerPopup
            isOpen={showUpdatePopup}
            onClose={() => setShowUpdatePopup(false)}
            customerData={customer} // Pass customer data to the popup
          />
        )}
      </AnimatePresence> */}
    </div>
  );
};

export default CustomerProfile;
