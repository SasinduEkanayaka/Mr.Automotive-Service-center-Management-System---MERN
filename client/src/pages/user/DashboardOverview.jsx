import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaMoneyBillAlt, FaEdit } from 'react-icons/fa';
import UpdateRequestItemPopup from '../Supplier management/UpdateReqItemPopup'; // Ensure the path is correct

const ShowCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

 
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/booking');
        setBookings(response.data || []); // Ensure bookings is an array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Error fetching bookings');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      await axios.put(`http://localhost:3000/bookings/${bookingId}/status`, {
        status: newStatus
      });

      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking._id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
    } catch (error) {
      setError('Error updating booking status');
    }
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking);
    setShowUpdatePopup(true);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Filter bookings for the relevant customer
  const totalBookings = bookings.length;
  const totalPayments = bookings.reduce((sum, booking) => sum + booking.paymentAmount, 0);

  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ExtraDarkColor">Customer Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button className="bg-DarkColor text-white px-4 py-2 rounded-md shadow hover:bg-ExtraDarkColor transition-colors duration-300">
            Generate Report
          </button>
          <button className="bg-DarkColor text-white px-4 py-2 rounded-md shadow hover:bg-ExtraDarkColor transition-colors duration-300">
            Add Customer
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaUsers className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">Total Bookings</h2>
            <p className="text-2xl font-semibold text-DarkColor">{totalBookings}</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaMoneyBillAlt className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">Total Payments</h2>
            <p className="text-2xl font-semibold text-DarkColor">${totalPayments}</p>
          </div>
        </motion.div>
      </div>

      {/* Loading/Error State */}
      {loading ? (
        <div className="text-center mt-6 text-DarkColor">Loading...</div>
      ) : error ? (
        <div className="text-center mt-6 text-red-500">{error}</div>
      ) : (
        <>
          {/* Customer Details */}
          <div className="mt-12 bg-SecondaryColor p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-ExtraDarkColor mb-6">Customer Booking Details</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-DarkColor text-white">
                <tr>
                  <th className="py-3 px-5 text-left">Customer ID</th>
                  <th className="py-3 px-5 text-left">Profile Picture</th>
                  <th className="py-3 px-5 text-left">Customer Name</th>
                  <th className="py-3 px-5 text-left">Status</th>
                  <th className="py-3 px-5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr
                    key={customer._id}
                    className="border-b hover:bg-PrimaryColor transition-colors duration-300"
                  >
                    <td className="py-3 px-5 text-ExtraDarkColor">{customer.CustomerID}</td>
                    <td className="py-3 px-5 text-ExtraDarkColor">
                      <img
                        src={customer.profilePicture} // Assuming the profile picture URL is stored in `profilePicture`
                        alt="Profile"
                        className="w-10 h-10 rounded-full"
                      />
                    </td>
                    <td className="py-3 px-5 text-ExtraDarkColor">{customer.CustomerName}</td>
                    <td className="py-3 px-5 text-ExtraDarkColor">
                      {customer.status || 'Pending'}
                    </td>
                    <td className="py-3 px-5 text-ExtraDarkColor">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                        onClick={() => handleUpdate(customer)}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Payment Details */}
          <div className="mt-12 bg-SecondaryColor p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold text-ExtraDarkColor mb-6">Payment Details</h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-DarkColor text-white">
                <tr>
                  <th className="py-3 px-5 text-left">Booking ID</th>
                  <th className="py-3 px-5 text-left">Customer Name</th>
                  <th className="py-3 px-5 text-left">Payment Amount</th>
                  <th className="py-3 px-5 text-left">Status</th>
                  <th className="py-3 px-5 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr
                    key={booking._id}
                    className="border-b hover:bg-PrimaryColor transition-colors duration-300"
                  >
                    <td className="py-3 px-5 text-ExtraDarkColor">{booking.bookingID}</td>
                    <td className="py-3 px-5 text-ExtraDarkColor">{booking.customerName}</td>
                    <td className="py-3 px-5 text-ExtraDarkColor">${booking.paymentAmount}</td>
                    <td className="py-3 px-5 text-ExtraDarkColor">{booking.status || 'Pending'}</td>
                    <td className="py-3 px-5 text-ExtraDarkColor">
                      <button
                        className="bg-green-500 text-white px-3 py-1 rounded-md mr-2"
                        onClick={() => handleStatusChange(booking._id, 'completed')}
                      >
                        Complete
                      </button>
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded-md"
                        onClick={() => handleStatusChange(booking._id, 'failed')}
                      >
                        Fail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Update Popup */}
      <AnimatePresence>
        {showUpdatePopup && (
          <UpdateRequestItemPopup
            booking={selectedBooking}
            onClose={() => setShowUpdatePopup(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ShowCustomer;
