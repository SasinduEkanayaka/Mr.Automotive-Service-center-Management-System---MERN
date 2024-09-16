import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const BookingManagement = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);

  const handleUpdateClick = (id) => {
    navigate(`/booking-management/update/${id}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/booking/get"
        );
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this booking",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/booking/delete/${id}`);
        setBookings(bookings.filter((booking) => booking._id !== id));
        Swal.fire("Deleted!", "The booking has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the booking.",
        "error"
      );
    }
  };

  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ExtraDarkColor">
          Booking Management
        </h1>
        <div className="flex items-center space-x-4">
          <button className="bg-DarkColor text-white px-4 py-2 rounded-md shadow hover:bg-ExtraDarkColor transition-colors duration-300">
            Generate Report
          </button>
          <button className="bg-DarkColor text-white px-4 py-2 rounded-md shadow hover:bg-ExtraDarkColor transition-colors duration-300">
            Add Booking
          </button>
        </div>
      </div>

      {/* Booking Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaUserAlt className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">
              Total Customers
            </h2>
            <p className="text-2xl font-semibold text-DarkColor">120</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaCalendarAlt className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">
              Upcoming Bookings
            </h2>
            <p className="text-2xl font-semibold text-DarkColor">25</p>
          </div>
        </motion.div>
      </div>

      {/* Booking Table */}
      <div className="mt-12 bg-SecondaryColor p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-ExtraDarkColor mb-6">
          Booking Details
        </h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-DarkColor text-white">
            <tr>
              <th className="py-3 px-5 text-left">Customer Name</th>
              <th className="py-3 px-5 text-left">Booking Date</th>
              <th className="py-3 px-5 text-left">Service</th>
              <th className="py-3 px-5 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-PrimaryColor transition-colors duration-300"
              >
                <td className="py-3 px-5 text-ExtraDarkColor">
                  {item.cusName}
                </td>
                <td className="py-3 px-5 text-ExtraDarkColor">{item.date}</td>
                <td className="py-3 px-5 text-ExtraDarkColor">{item.time}</td>
                <td className="py-3 px-5 text-ExtraDarkColor">
                  <button
                    className="bg-violet-500 text-black mt-1 ml-2 inline-block px-8 py-2.5 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md mr-5"
                    onClick={() => handleUpdateClick(item._id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-pink-600 text-black mt-1 ml-2 inline-block px-8 py-2.5 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md mr-5"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
