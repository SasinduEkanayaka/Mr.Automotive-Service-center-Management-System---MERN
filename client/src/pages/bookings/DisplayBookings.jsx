import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Swal from "sweetalert2";

const DisplayBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const email = localStorage.getItem("email");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/booking/get/${email}`
        );
        const uid = localStorage.getItem("uid");
        console.log(uid);
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

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this Estimate Log",
        icon: "warning",
        fontFamily: "Montserrat, sans-serif",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await axios.delete(`http://localhost:3000/api/booking/delete/${id}`);
        setBookings(bookings.filter((rep) => rep._id !== id));
        Swal.fire("Deleted!", "The Estimate Log has been deleted.", "success");
      }
    } catch (error) {
      console.error("Error deleting Estimate Log:", error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the Estimate Log.",
        "error"
      );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8 pt-28">
        <h2 className="text-2xl font-bold mb-6 text-center">My Bookings</h2>
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
              <button
                className="bg-pink-600 text-black mt-1 ml-2 inline-block px-8 py-2.5 text-sm uppercase rounded-full shadow-lg transition-transform duration-200 ease-in-out hover:-translate-y-1 hover:shadow-lg active:translate-y-px active:shadow-md mr-5"
                onClick={(e) => {
                  e.stopPropagation(); // Prevent the click event from bubbling up
                  handleDelete(booking._id);
                }}
              >
                Delete
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
