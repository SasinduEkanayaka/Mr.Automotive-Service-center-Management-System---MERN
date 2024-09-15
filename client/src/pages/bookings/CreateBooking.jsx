import React, { useState, useEffect } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import TextField from "@mui/material/TextField";
import dayjs from "dayjs";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import Car from "../../assets/carbg2.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const CreateBooking = () => {
  const [maintancePkg, setMaintancePkg] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookingData, setBookingData] = useState({
    package: {
      pkgName: "",
      pkgId: "",
      description: "",
      price: 0,
    },
    cusName: "",
    cusEmail: "",
    cusMobile: "",
    vehNum: "",
    milage: 0,
    date: "",
    time: "",
    note: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchMaintaincePkgs = async () => {
      try {
        const pkgs = await axios.get(
          `http://localhost:3000/api/maintance/get/${id}`
        );
        setMaintancePkg(pkgs.data);
      } catch (error) {
        console.error("Error fetching repair estimates:", error);
      }
    };
    fetchMaintaincePkgs();
  }, [id]);

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Add selected date and time to bookingData before sending
      const updatedBookingData = {
        ...bookingData,
        package: maintancePkg,
        date: selectedDate ? selectedDate.format("YYYY-MM-DD") : "",
        time: selectedDate ? selectedDate.format("HH:mm") : "",
      };

      // Send the booking data to the backend API
      const response = await axios.post(
        "http://localhost:3000/api/booking/add",
        updatedBookingData
      );
      console.log(updatedBookingData);
      // Handle success
      alert("Booking created successfully!");
      console.log("Booking Response:", response.data);
    } catch (error) {
      console.log(bookingData);
      alert("Failed to create booking. Please try again.");
    }
  };

  const disabledDates = [
    dayjs("2024-09-15"),
    dayjs("2024-09-18"),
    dayjs("2024-09-22"),
  ];

  const shouldDisableDate = (date) => {
    return disabledDates.some((disabledDate) =>
      dayjs(date).isSame(disabledDate, "day")
    );
  };

  return (
    <div>
      <NavBar />
      <div className="flex w-screen">
        <div className="mt-28 ml-5">
          <img src={Car} alt="" className="" style={{ width: "700px" }} />
        </div>

        <div className="pt-28 pr-10">
          <div className="ml-20 mb-10 flex">
            <div className="bg-lime-300 rounded-2xl shadow-md overflow-hidden flex h-40">
              <img src={maintancePkg.imageURL} className="h-48 object-cover" />
              <div className="p-3">
                <h3 className="text-xl font-semibold mb-2">
                  {maintancePkg.pkgName}
                </h3>
                <p className="text-gray-700 mb-2">{maintancePkg.pkgDes}</p>
                <button className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg mr-5">
                  {maintancePkg.pkgPrice}
                </button>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className=" bg-slate-200 p-4 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-5">
                Section 1: General Information
              </h2>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col w-2/4">
                  <label className="block text-gray-700 required">Name:</label>
                  <input
                    type="text"
                    name="cusName"
                    className="border border-gray-300 rounded-md p-2 mr-5"
                    value={bookingData.cusName}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Email:</label>
                  <input
                    type="email"
                    name="cusEmail"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-5"
                    value={bookingData.cusEmail}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Phone:</label>
                  <input
                    type="text"
                    name="cusMobile"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100"
                    value={bookingData.cusMobile}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">
                    Vehicle No:
                  </label>
                  <input
                    type="text"
                    name="vehNum"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                    value={bookingData.vehNum}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">
                    Mileage:
                  </label>
                  <input
                    type="number"
                    name="milage"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                    value={bookingData.milage}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 bg-slate-200 p-6 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-5">
                Section 2: Vehicle Information
              </h2>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Select a Date"
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                  shouldDisableDate={shouldDisableDate}
                />
              </LocalizationProvider>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBooking;
