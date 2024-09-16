import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBox, FaChartLine } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBell } from "react-icons/fa";

const ShowModRequest = () => {
  const navigate = useNavigate();
  const [modReq, setModReq] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredPkg, setFilteredPkg] = useState([]);

  const handleUpdateClick = (id) => {
    navigate(`/inventory-management/upd/${id}`);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  useEffect(() => {
    const fetchMaintaincePkgs = async () => {
      try {
        const pkgs = await axios.get("http://localhost:3000/api/mod/getMod");
        setModReq(pkgs.data);
      } catch (error) {
        console.error("Error fetching repair estimates:", error);
      }
    };
    fetchMaintaincePkgs();
  }, []);

  useEffect(() => {
    const serchResult = modReq.filter((item) =>
      item.customerName.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredPkg(serchResult);
  }, [searchValue, modReq]);

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
        await axios.delete(`http://localhost:3000/api/mod/delMod/${id}`);
        setModReq(modReq.filter((rep) => rep._id !== id));
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

  const navigateAddPkg = () => {
    navigate("/inventory-management/create-pkg");
  };
  return (
    <div className="p-8">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-ExtraDarkColor">
          Manager Dashboard
        </h1>
        <FaSearch className="text-DarkColor mr-3" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-SecondaryColor rounded-md p-2 w-64 outline-none"
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="flex items-center space-x-4">
          <button className="bg-DarkColor text-white px-4 py-2 rounded-md shadow hover:bg-ExtraDarkColor transition-colors duration-300">
            Generate Report
          </button>
        </div>
      </div>

      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaBox className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">
              Total Parts
            </h2>
            <p className="text-2xl font-semibold text-DarkColor">435</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-SecondaryColor p-6 rounded-lg shadow-lg flex items-center space-x-4"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
        >
          <FaChartLine className="text-3xl text-DarkColor" />
          <div>
            <h2 className="text-lg font-bold text-ExtraDarkColor">Low Stock</h2>
            <p className="text-2xl font-semibold text-DarkColor">12 Parts</p>
          </div>
        </motion.div>
      </div>

      {/* Inventory Table */}
      <div className="mt-12 bg-SecondaryColor p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-ExtraDarkColor mb-6">
          Modification Bookings
        </h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-DarkColor text-white">
            <tr>
              <th className="py-3 px-5 text-left">CusName</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">ModType</th>
              <th className="py-3 px-5 text-left">Date</th>
              <th className="py-3 px-5 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPkg.map((item) => (
              <tr
                key={item.customerName}
                className="border-b hover:bg-PrimaryColor transition-colors duration-300"
              >
                <td className="py-3 px-5 text-ExtraDarkColor">
                  {item.customerEmail}
                </td>
                <td className="py-3 px-5 text-ExtraDarkColor">
                  {item.modificationType}
                </td>
                <td className="py-3 px-5 text-ExtraDarkColor">{item.date}</td>

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
                      e.stopPropagation(); // Prevent the click event from bubbling up
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

export default ShowModRequest;
