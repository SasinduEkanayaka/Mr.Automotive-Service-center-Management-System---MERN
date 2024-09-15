import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';

const CustomerProfile = ({ customerId }) => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/Customer/66e70ff5981916d5a3d3b225`);
        setCustomer(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer:', error);
        setError('Error fetching customer data');
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [customerId]);

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-6 text-red-500">{error}</div>;
  }

  if (!customer) {
    return <div className="text-center mt-6">Customer not found</div>;
  }

  return (
    <div className="p-9">
      <h1 className="text-3xl font-bold mb-4 text-center">{`${customer.firstName} ${customer.lastName}`}'s Profile</h1>

      <div className="bg-white p-9 rounded-lg shadow-lg">
        <div className="flex flex-col items-left space-y-4">
          {/* Display customer image if available */}
          {customer.image && (
            <img
              src={customer.image}
              alt="Customer"
              className="w-32 h-32 rounded-full object-cover mb-4 mx-auto"
            />
          )}
          <p><strong>Customer ID:</strong> {customer.cusID}</p>
          <p><strong>NIC:</strong> {customer.NIC}</p>
          <p><strong>Contact:</strong> {customer.phone}</p>
          <p><strong>Email:</strong> {customer.cusEmail}</p>
          <p><strong>Address:</strong> {customer.Address}</p>
        </div>

        <div className="flex items-center justify-center space-x-4 mt-6">
          <button
            onClick={() => alert('Edit functionality coming soon!')}
            className="text-green-500 hover:text-green-700 flex items-center space-x-2"
          >
            <FaEdit /> <span>Edit</span>
          </button>
          <button
            onClick={() => alert('Delete functionality coming soon!')}
            className="text-red-500 hover:text-red-700 flex items-center space-x-2"
          >
            <FaTrash /> <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
