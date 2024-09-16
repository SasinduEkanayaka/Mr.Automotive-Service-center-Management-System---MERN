import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import modBack from "../../assets/modBack.jpg";
import { motion } from "framer-motion";
import axios from "axios"; // Import axios
import Per from "../../assets/performanceimg.jpeg";
import Style from "../../assets/stylevehimg.jpeg";
import Effi from "../../assets/efficencyimg.jpeg";
import Mod from "../../assets/repairveh.jpeg";

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
      <NavBar
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 50 }}
      />

      {/* Section 1: Introduction with Background Image and Scroll Effect */}
      <motion.div
        id="introduction"
        className="bg-center min-h-screen flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${modBack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 text-center text-white">
          <h2 className="text-5xl font-extrabold">Modify Your Vehicle</h2>
          <p className="text-gray-200 mt-4">
            Keep your vehicle running at its best with our tailored modification
            packages.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("benefits")
                .scrollIntoView({ behavior: "smooth" })
            }
            className="mt-6 bg-white text-blue-600 py-3 px-6 rounded-md font-bold hover:bg-gray-200 transition-colors"
          >
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Section 2: Benefits of Vehicle Modification */}
      <motion.section
        id="benefits"
        className="relative min-h-screen py-20 bg-gray-100 flex items-center justify-center"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        style={{ zIndex: 2 }}
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Modify Your Vehicle?</h2>
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
        className="relative min-h-screen py-10 bg-white flex items-center justify-center"
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
            <div className="flex flex-col items-center">
              <img
                src={Per}
                alt="Consultation"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Step 1: Consultation</h3>
              <p className="text-gray-600">
                Discuss your needs and goals with our experts.
              </p>
            </div>
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <img
                src={Effi}
                alt="Planning"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Step 2: Planning</h3>
              <p className="text-gray-600">
                Get a customized modification plan for your vehicle.
              </p>
            </div>
            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <img
                src={Mod}
                alt="Modification"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Step 3: Modification</h3>
              <p className="text-gray-600">
                Our experts perform the modifications with precision.
              </p>
            </div>
            {/* Step 4 */}
            <div className="flex flex-col items-center">
              <img
                src={Per}
                alt="Delivery"
                className="w-20 h-20 object-cover rounded-full mb-4"
              />
              <h3 className="text-xl font-semibold">Step 4: Delivery</h3>
              <p className="text-gray-600">
                Enjoy your modified vehicle, customized to perfection.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: Booking Form */}
      <motion.section
        id="booking"
        className="relative min-h-screen py-20 bg-gray-50 flex items-center justify-center"
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
              <div className="flex flex-col">
                <label className="text-gray-700">Customer ID</label>
                <input
                  type="text"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Customer Name</label>
                <input
                  type="text"
                  name="customerName"
                  value={formData.customerName}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Customer Email</label>
                <input
                  type="email"
                  name="customerEmail"
                  value={formData.customerEmail}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Vehicle Model</label>
                <input
                  type="text"
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Vehicle Number</label>
                <input
                  type="text"
                  name="vehicleNumber"
                  value={formData.vehicleNumber}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Modification Type</label>
                <select
                  name="modificationType"
                  value={formData.modificationType}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="engine">Engine</option>
                  <option value="exhaust">Exhaust</option>
                  <option value="suspension">Suspension</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleChange}
                  rows="4"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="flex flex-col">
                <label className="text-gray-700">Preferred Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white py-3 px-6 rounded-md font-bold hover:bg-blue-600"
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
