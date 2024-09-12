import React, { useState } from "react";
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

const CreateBooking = () => {
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

  const handleBookingChange = (e) => {
    const { name, value } = e.target;
    setBookingData((perv) => ({
      ...perv,
      [name]: value,
    }));
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

        <div className=" pt-28 pr-10">
          <form>
            <div className=" bg-slate-200 p-4 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold mb-5">
                Section 1: Customer Information
              </h2>

              <div className="flex items-center justify-between mb-4 ">
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Name:</label>
                  <input
                    type="text"
                    name="cusName"
                    className="border border-gray-300 rounded-md p-2 mr-10"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Email:</label>
                  <input
                    type="email"
                    name="cusEmail"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Phone:</label>
                  <input
                    type="text"
                    name="cusMobile"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Exp:</label>
                  <input
                    type="date"
                    name="exp"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100 mr-10"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Price:</label>
                  <input
                    type="number"
                    name="price"
                    className="border border-gray-300 rounded-md p-2  bg-gray-100  mr-10"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">
                    Quantity:
                  </label>
                  <div className="flex items-center border border-gray-300 rounded-lg h-10 p-1 bg-gray-100 mr-4">
                    <input
                      type="number"
                      name="quantity"
                      className="h-9 p-1  bg-gray-100"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col w-1/4">
                  <label className="block text-gray-700 required">Image:</label>
                  <input
                    type="file"
                    name="image"
                    className="border border-gray-300 rounded-md p-2 bg-gray-100"
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
                  shouldDisableDate={shouldDisableDate} // Disable specific dates
                />
              </LocalizationProvider>
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                className="bg-lime-500 text-black text-xl px-4 py-2 rounded-md mt-5 mb-10"
              >
                Next
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
