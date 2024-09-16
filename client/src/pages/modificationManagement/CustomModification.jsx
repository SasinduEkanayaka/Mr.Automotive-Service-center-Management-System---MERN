import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import modBack from "../../assets/rim.png";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios
import Per from "../../assets/performanceimg.jpeg";
import Style from "../../assets/stylevehimg.jpeg";
import Effi from "../../assets/efficencyimg.jpeg";
import Mod from "../../assets/repairveh.jpeg";
import zIndex from "@mui/material/styles/zIndex";

const CustomModification = () => {
  const [formData, setFormData] = useState({
    customerId: "",
    customerName: "",
    customerEmail: "",
    vehicleModel: "",
    vehicleNumber: "",
    modificationType: "engine",
    additionalNotes: "",
    date: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/mod/addMod",
        formData
      );
      console.log(formData);
      if (response.status === 201) {
        // Success message
        alert("Modification request submitted successfully!");
        // Reset form data
        setFormData({
          customerId: "",
          customerName: "",
          customerEmail: "",
          vehicleModel: "",
          vehicleNumber: "",
          modificationType: "engine",
          additionalNotes: "",
          date: "",
        });
      } else {
        alert("Failed to submit the request. Please try again.");
        console.log(formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
      console.log(formData);
    }
  };

  return (
    <div>
      <NavBar style={{ zIndex: 1000 }} />

      {/* Section 1: Introduction with Background Image and Scroll Effect */}
      <motion.div
        id="introduction"
        className="bg-center min-h-screen flex  justify-center pt-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-100 mt-20 -z-10">
          <img src={modBack} className="fixed z-0 min-w-full" />
        </div>
        <div className="text-center text-white">
          <h2 className="text-yellow-500 bg-black bg-opacity-40 text-5xl -z-10 font-extrabold fixed left-1/3">
            Modify Your Vehicle
          </h2>
          <div className=" mt-24  left-32 right-32 overflow-hidden fixed -z-10">
            <motion.p
              className="text-white  overflow-hidden "
              initial={{ y: 100 }}
              animate={{ y: -100 }}
              transition={{
                duration: 5,
                ease: "linear",
                style: { zIndex: -1 },
              }}
            >
              Boost your vehicle's performance with top-tier engine
              modifications. Experience unmatched horsepower, enhanced fuel
              efficiency, and smoother rides. Our expert modifications not only
              optimize speed and acceleration but also extend engine longevity,
              ensuring that your vehicle performs at its best. Whether you're
              looking for performance enhancements for daily driving or
              preparing for high-speed races, our engine upgrades are designed
              to meet your needs. Elevate your driving experience with precision
              tuning, cutting-edge technology, and premium parts that redefine
              what your engine is capable of. <br />
              <br />
              <br />
              Boost your vehicle's performance with top-tier engine
              modifications. Experience unmatched horsepower, enhanced fuel
              efficiency, and smoother rides. Our expert modifications not only
              optimize speed and acceleration but also extend engine longevity,
              ensuring that your vehicle performs at its best. Whether you're
              looking for performance enhancements for daily driving or
              preparing for high-speed races, our engine upgrades are designed
              to meet your needs. Elevate your driving experience with precision
              tuning, cutting-edge technology, and premium parts that redefine
              what your engine is capable of.
              <br />
              <br />
              Boost your vehicle's performance with top-tier engine
              modifications. Experience unmatched horsepower, enhanced fuel
              efficiency, and smoother rides. Our expert modifications not only
              optimize speed and acceleration but also extend engine longevity,
              ensuring that your vehicle performs at its best. Whether you're
              looking for performance enhancements for daily driving or
              preparing for high-speed races, our engine upgrades are designed
              to meet your needs. Elevate your driving experience with precision
              tuning, cutting-edge technology, and premium parts that redefine
              what your engine is capable of.
              <br />
              <br />
            </motion.p>
          </div>
          <button
            onClick={() =>
              document
                .getElementById("benefits")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="bottom-10 -z-10 bg-green-400 text-black py-3 px-6 rounded-md font-bold hover:bg-gray-200 transition-colors fixed"
          >
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Section 2: Benefits of Vehicle Modification */}
      <motion.section
        id="benefits"
        className="min-h-screen py-20 bg-gray-100 flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        style={{ zIndex: 2 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-20">Why Modify Your Vehicle?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white shadow-lg rounded-lg">
              <img
                src={Per}
                alt="Performance Upgrade"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mt-4">
                  Performance Upgrades
                </h3>
                <p className="text-gray-600">
                  Boost your vehicle's performance with top-tier engine
                  modifications.Boost your vehicle's performance with top-tier
                  engine modifications.
                </p>
              </div>
            </div>
            {/* Benefit 2 */}
            <div className="bg-white shadow-lg rounded-lg">
              <img
                src={Style}
                alt="Style Enhancement"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mt-4">
                  Style Enhancements
                </h3>
                <p className="text-gray-600">
                  Customize your vehicle's appearance with exterior and interior
                  upgrades.Customize your vehicle's appearance with exterior and
                  interior upgrades.
                </p>
              </div>
            </div>
            {/* Benefit 3 */}
            <div className="bg-white shadow-lg rounded-lg ">
              <img
                src={Effi}
                alt="Efficiency"
                className="w-full h-40 object-cover rounded-t-lg"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mt-4">
                  Efficiency Improvements
                </h3>
                <p className="text-gray-600">
                  Increase your vehicle's fuel efficiency and reduce emissions.
                  Increase your vehicle's fuel efficiency and reduce emissions.
                  Increase your vehicle's fuel efficiency and reduce emissions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 3: Our Modification Process */}

      <motion.section
        id="process"
        className="min-h-screen py-2 bg-white flex items-center justify-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        style={{ zIndex: 3 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-20">Our Modification Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <motion.div
              className="flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={Per}
                alt="Consultation"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Step 1: Consultation
              </h3>
              <p className="text-gray-600 mb-4">
                Engage in a detailed discussion with our expert team. We listen
                to your specific needs, preferences, and goals to tailor a
                perfect modification plan. Our goal is to ensure your vision is
                brought to life with precision and excellence.
              </p>
              <button className="bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600">
                Explore
              </button>
            </motion.div>
            {/* Step 2 */}
            <motion.div
              className="flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={Effi}
                alt="Planning"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Step 2: Planning</h3>
              <p className="text-gray-600 mb-4">
                Our team crafts a detailed modification plan based on your
                consultation. We outline modification plan based each step of
                the process, from technical specifications to timelines,
                ensuring a smooth and transparent precision.
              </p>
              <button className="bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600">
                Explore
              </button>
            </motion.div>
            {/* Step 3 */}
            <motion.div
              className="flex flex-col items-center transition-transform duration-300 hover:scale-105 hover:shadow-2xl p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={Mod}
                alt="Modification"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">
                Step 3: Modification
              </h3>
              <p className="text-gray-600 mb-4">
                Our skilled technicians perform the modifications with the
                utmost care and precision. We use high-quality materials and
                advanced techniques to ensure the modification plan based
                highest standards modification plan based are met.
              </p>
              <button className="bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600">
                Explore
              </button>
            </motion.div>
            {/* Step 4 */}
            <motion.div
              className="flex flex-col items-center transition-transform duration-300 hover:shadow-2xl  p-5 shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src={Per}
                alt="Delivery"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Step 4: Delivery</h3>
              <p className="text-gray-600 mb-4">
                Once the modifications are complete, we schedule a delivery to
                your location. Enjoy your modifications are complete enhanced
                vehicle, and let us know how we modifications are complete did
                Enjoy your modifications!
              </p>
              <button className="bg-black text-white py-2 px-4 rounded-md font-semibold hover:bg-blue-600">
                Explore
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Booking Form */}
      <motion.section
        id="booking"
        className="min-h-screen py-20 bg-gray-50 flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        style={{ zIndex: 4 }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
              Custom Modification Form
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Row 1 */}
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                  <label className="text-gray-700">Customer ID</label>
                  <input
                    type="text"
                    name="customerId"
                    value={formData.customerId}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                  <label className="text-gray-700">Customer Name</label>
                  <input
                    type="text"
                    name="customerName"
                    value={formData.customerName}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="w-full sm:w-1/3 px-2">
                  <label className="text-gray-700">Customer Email</label>
                  <input
                    type="email"
                    name="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>

              {/* Row 2 */}
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
                  <label className="text-gray-700">Vehicle Model</label>
                  <input
                    type="text"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
                  <label className="text-gray-700">Vehicle Number</label>
                  <input
                    type="text"
                    name="vehicleNumber"
                    value={formData.vehicleNumber}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
                <div className="w-full sm:w-1/4 px-2">
                  <label className="text-gray-700">Modification Type</label>
                  <select
                    name="modificationType"
                    value={formData.modificationType}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  >
                    <option value="engine">Engine</option>
                    <option value="exhaust">Exhaust</option>
                    <option value="suspension">Suspension</option>
                  </select>
                </div>
                <div className="w-full sm:w-1/4 px-2 mb-4 sm:mb-0">
                  <label className="text-gray-700">Preferred Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  />
                </div>
              </div>

              {/* Row 3 */}
              <div className="flex flex-wrap -mx-2 mb-4">
                <div className="w-full  px-2 mb-4 sm:mb-0">
                  <label className="text-gray-700">Additional Notes</label>
                  <textarea
                    name="additionalNotes"
                    value={formData.additionalNotes}
                    onChange={handleChange}
                    rows="4"
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                  ></textarea>
                </div>

                <div className="w-full sm:w-1/3 px-2 mb-4 sm:mb-0">
                  {/* Empty cell for layout consistency */}
                </div>
              </div>

              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-md font-bold hover:bg-blue-600 w-full"
              >
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CustomModification;
