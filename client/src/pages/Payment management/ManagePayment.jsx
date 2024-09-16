import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2'; // Import SweetAlert2
import UpdatePaymentPopup from './UpdatePayment'; // Ensure the path is correct

const ManagePayment = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:3000/payments');
      setPayments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching payments:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/payments/${id}`);
        setPayments(prevPayments => prevPayments.filter(payment => payment._id !== id));
        Swal.fire(
          'Deleted!',
          'The payment has been deleted.',
          'success'
        );
      } catch (error) {
        console.error('Error deleting payment:', error);
        Swal.fire(
          'Error!',
          'There was an issue deleting the payment.',
          'error'
        );
      }
    }
  };

  const handleOverview = (payment) => {
    setSelectedPayment(payment);
  };

  const handleUpdate = (payment) => {
    setSelectedPayment(payment);
    setShowUpdatePopup(true);
  };

  const handlePaymentUpdate = (updatedPayment) => {
    setPayments(prevPayments =>
      prevPayments.map(payment =>
        payment._id === updatedPayment._id ? updatedPayment : payment
      )
    );
    setShowUpdatePopup(false);
    setSelectedPayment(null);
    // Refresh payments data after update
    fetchPayments();
  };

  const filteredPayments = payments.filter((payment) =>
    payment.PaymentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.cusName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.Vehicle_Number.includes(searchTerm)
  );

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Payments</h1>

      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-400 rounded-lg"
          placeholder="Search by payment ID, customer Name, or vehicle number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Payment ID</th>
              <th className="py-3 px-5 text-left">Customer Name</th>
              <th className="py-3 px-5 text-left">Vehicle Number</th>
              <th className="py-3 px-5 text-left">Payment Date</th>
              <th className="py-3 px-5 text-left">Payment Method</th>
              <th className="py-3 px-5 text-left">Booking ID</th>
              <th className="py-3 px-5 text-left">Package</th>
              <th className="py-3 px-5 text-left">Package Amount</th>
              <th className="py-3 px-5 text-left">Customer Email</th>
              <th className="py-3 px-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <motion.tr
                  key={payment._id}
                  className="border-b hover:bg-gray-100 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="py-3 px-5">{payment.PaymentId}</td>
                  <td className="py-3 px-5">{payment.cusName}</td>
                  <td className="py-3 px-5">{payment.Vehicle_Number}</td>
                  <td className="py-3 px-5">{payment.PaymentDate}</td>
                  <td className="py-3 px-5">{payment.PaymentMethod}</td>
                  <td className="py-3 px-5">{payment.Booking_Id}</td>
                  <td className="py-3 px-5">{payment.Package}</td>
                  <td className="py-3 px-5">{payment.Pamount}</td>
                  <td className="py-3 px-5">{payment.email}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleOverview(payment)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleUpdate(payment)}
                        className="text-green-500 hover:text-green-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(payment._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="py-3 px-5 text-center">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {selectedPayment && !showUpdatePopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPayment(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-3xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl text-gray-800 mb-6 font-bold border-b border-gray-300 pb-2">
                Payment ID: {selectedPayment.PaymentId}
              </h2>
              <div className="flex flex-col space-y-4">
                <p><strong>Customer Name:</strong> {selectedPayment.cusName}</p>
                <p><strong>Vehicle Number:</strong> {selectedPayment.Vehicle_Number}</p>
                <p><strong>Payment Date:</strong> {selectedPayment.PaymentDate}</p>
                <p><strong>Payment Method:</strong> {selectedPayment.PaymentMethod}</p>
                <p><strong>Booking ID:</strong> {selectedPayment.Booking_Id}</p>
                <p><strong>Package:</strong> {selectedPayment.Package}</p>
                <p><strong>Package Amount:</strong> {selectedPayment.Pamount}</p>
                <p><strong>Customer Email:</strong> {selectedPayment.email}</p>
              </div>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedPayment(null)}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showUpdatePopup && (
          <UpdatePaymentPopup
            isOpen={showUpdatePopup}
            onClose={() => setShowUpdatePopup(false)}
            paymentData={selectedPayment}
            onUpdate={(updatedPayment) => {
              handlePaymentUpdate(updatedPayment);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManagePayment;
