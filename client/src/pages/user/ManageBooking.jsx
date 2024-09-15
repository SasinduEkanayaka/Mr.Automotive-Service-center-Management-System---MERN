import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]); // Ensure bookings is initialized as an array
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState(null); // For overview and edit
  const [showUpdatePopup, setShowUpdatePopup] = useState(false); // For edit popup
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/booking/get');
        setBookings(response.data?.data || []); // Set bookings or an empty array if data is not as expected
        setLoading(false);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setBookings([]); // Ensure that bookings is set to an empty array in case of error
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/booking/${id}`);
      setBookings(prevBookings => prevBookings.filter(booking => booking._id !== id));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  const handleOverview = (booking) => {
    setSelectedBooking(booking); // Set selected booking for overview
  };

  const handleUpdate = (booking) => {
    setSelectedBooking(booking); // Set selected booking for edit
    setShowUpdatePopup(true);
  };

  // Filter bookings based on the search term
  const filteredBookings = (bookings || []).filter((booking) =>
    booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.bookingID.includes(searchTerm) ||
    booking.contactNumber.includes(searchTerm)
  );

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Bookings</h1>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-400 rounded-lg"
          placeholder="Search by customer name, booking ID, or contact number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Booking ID</th>
              <th className="py-3 px-5 text-left">Customer Name</th>
              <th className="py-3 px-5 text-left">Contact Number</th>
              <th className="py-3 px-5 text-left">Booking Date</th>
              <th className="py-3 px-5 text-left">Total Amount</th>
              <th className="py-3 px-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <motion.tr
                  key={booking._id}
                  className="border-b hover:bg-gray-100 transition-colors duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <td className="py-3 px-5">{booking.bookingID}</td>
                  <td className="py-3 px-5">{booking.customerName}</td>
                  <td className="py-3 px-5">{booking.contactNumber}</td>
                  <td className="py-3 px-5">{booking.bookingDate}</td>
                  <td className="py-3 px-5">${booking.totalAmount}</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center">
                      <button
                        onClick={() => handleOverview(booking)}
                        className="text-blue-500 hover:text-blue-700 mr-2"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleUpdate(booking)}
                        className="text-green-500 hover:text-green-700 mr-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(booking._id)}
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
                <td colSpan="6" className="py-3 px-5 text-center">
                  No bookings found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Booking Overview Popup */}
      <AnimatePresence>
        {selectedBooking && !showUpdatePopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedBooking(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-3xl w-full shadow-2xl relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl text-gray-800 mb-6 font-bold border-b border-gray-300 pb-2">
                {selectedBooking.customerName}
              </h2>
              <div className="flex flex-col space-y-4">
                <p><strong>Booking ID:</strong> {selectedBooking.bookingID}</p>
                <p><strong>Contact:</strong> {selectedBooking.contactNumber}</p>
                <p><strong>Booking Date:</strong> {selectedBooking.bookingDate}</p>
                <p><strong>Total Amount:</strong> ${selectedBooking.totalAmount}</p>
              </div>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedBooking(null)}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Booking Popup (commented out) */}
      {/* 
      <AnimatePresence>
        {showUpdatePopup && (
          <UpdateSupplierPopup
            isOpen={showUpdatePopup}
            onClose={() => setShowUpdatePopup(false)}
            bookingData={selectedBooking} // Ensure prop name matches the popup
          />
        )}
      </AnimatePresence> 
      */}
    </div>
  );
};

export default ManageBookings;
