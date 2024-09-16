import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

const DisplayBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch bookings data from the API
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/booking/get"
        );
        setBookings(response.data); // Assuming response data is an array of bookings
        setLoading(false);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading bookings...</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8 pt-28">
        <h2 className="text-2xl font-bold mb-6 text-center">Your Bookings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking._id}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-semibold mb-2">
                {booking.vehicleModel}
              </h3>
              <p className="text-gray-600 mb-2">
                <strong>Vehicle Number:</strong> {booking.vehNum}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Modification Type:</strong> {booking.modificationType}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Customer Name:</strong> {booking.cusName}
              </p>
              <p className="text-gray-600 mb-4">
                <strong>Date:</strong>{" "}
                {new Date(booking.date).toLocaleDateString()}
              </p>
              <button className="bg-green-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded mr-5">
                View Details
              </button>
              <button className="bg-red-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded">
                Cancell Booking
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DisplayBookings;
