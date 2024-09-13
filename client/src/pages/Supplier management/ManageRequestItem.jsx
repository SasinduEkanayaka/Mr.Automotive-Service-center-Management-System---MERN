import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import UpdateRequestItemPopup from './UpdateReqItemPopup'; // Make sure path is correct

const ManageRequestItem = () => {
  const [requestItems, setRequestItems] = useState([]);
  const [receivedItems, setReceivedItems] = useState([]);
  const [failedItems, setFailedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    fetchRequestItems();
  }, []);

  const fetchRequestItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/requestItems');
      setRequestItems(response.data);
      // Initialize filtered items
      setReceivedItems(response.data.filter(item => item.status === 'received'));
      setFailedItems(response.data.filter(item => item.status === 'failed'));
    } catch (error) {
      console.error('Error fetching request items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredReceived = requestItems.filter((item) =>
      item.status === 'received' &&
      (item.requestID.toLowerCase().includes(query) ||
      item.supplierName.toLowerCase().includes(query) ||
      item.itemName.toLowerCase().includes(query) ||
      item.brand?.toLowerCase().includes(query) ||
      new Date(item.requestDate).toLocaleDateString().toLowerCase().includes(query))
    );

    const filteredFailed = requestItems.filter((item) =>
      item.status === 'failed' &&
      (item.requestID.toLowerCase().includes(query) ||
      item.supplierName.toLowerCase().includes(query) ||
      item.itemName.toLowerCase().includes(query) ||
      item.brand?.toLowerCase().includes(query) ||
      new Date(item.requestDate).toLocaleDateString().toLowerCase().includes(query))
    );

    setReceivedItems(filteredReceived);
    setFailedItems(filteredFailed);
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3000/requestItems/${id}`);
          setRequestItems(prevItems => prevItems.filter(item => item._id !== id));
          setReceivedItems(prevItems => prevItems.filter(item => item._id !== id && item.status === 'received'));
          setFailedItems(prevItems => prevItems.filter(item => item._id !== id && item.status === 'failed'));
          Swal.fire('Deleted!', 'Request item has been deleted.', 'success');
        } catch (error) {
          Swal.fire('Error!', 'Failed to delete request item.', 'error');
        }
      }
    });
  };

  const handleUpdate = (item) => {
    setSelectedItem(item);
    setShowUpdatePopup(true);
  };

  const handleOverview = (item) => {
    setSelectedItem(item);
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Request Items</h1>
      <input
        type="text"
        placeholder="Search request items..."
        className="w-full mb-6 p-3 border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-dark transition"
        value={searchQuery}
        onChange={handleSearch}
      />

      {/* Received Items Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">Received Items</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Request ID</th>
              <th className="py-3 px-5 text-left">Supplier Name</th>
              <th className="py-3 px-5 text-left">Item Name</th>
              <th className="py-3 px-5 text-left">Brand</th>
              <th className="py-3 px-5 text-left">Quantity</th>
              <th className="py-3 px-5 text-left">Req Date</th>
              <th className="py-3 px-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {receivedItems.map((item) => (
              <motion.tr
                key={item._id}
                className="border-b hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="py-3 px-5">{item.requestID}</td>
                <td className="py-3 px-5">{item.supplierName}</td>
                <td className="py-3 px-5">{item.itemName}</td>
                <td className="py-3 px-5">{item.brand}</td>
                <td className="py-3 px-5">{item.quantity}</td>
                <td className="py-3 px-5">{new Date(item.requestDate).toLocaleDateString()}</td>
                <td className="py-3 px-5">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleOverview(item)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleUpdate(item)}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Failed Items Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Failed Items</h2>
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Request ID</th>
              <th className="py-3 px-5 text-left">Supplier Name</th>
              <th className="py-3 px-5 text-left">Item Name</th>
              <th className="py-3 px-5 text-left">Brand</th>
              <th className="py-3 px-5 text-left">Quantity</th>
              <th className="py-3 px-5 text-left">Req Date</th>
              <th className="py-3 px-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {failedItems.map((item) => (
              <motion.tr
                key={item._id}
                className="border-b hover:bg-gray-100 transition-colors duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <td className="py-3 px-5">{item.requestID}</td>
                <td className="py-3 px-5">{item.supplierName}</td>
                <td className="py-3 px-5">{item.itemName}</td>
                <td className="py-3 px-5">{item.brand}</td>
                <td className="py-3 px-5">{item.quantity}</td>
                <td className="py-3 px-5">{new Date(item.requestDate).toLocaleDateString()}</td>
                <td className="py-3 px-5">
                  <div className="flex items-center">
                    <button
                      onClick={() => handleOverview(item)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleUpdate(item)}
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Item Overview Popup */}
      <AnimatePresence>
        {selectedItem && !showUpdatePopup && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              className="bg-white rounded-lg p-8 max-w-3xl w-full shadow-2xl relative"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl text-gray-800 mb-6 font-bold border-b border-gray-300 pb-2">
                {selectedItem.itemName}
              </h2>
              <div className="flex flex-col space-y-4">
                <p>
                  <strong>Request ID:</strong> {selectedItem.requestID}
                </p>
                <p>
                  <strong>Supplier:</strong> {selectedItem.supplierName}
                </p>
                <p>
                  <strong>Brand:</strong> {selectedItem.brand}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedItem.quantity}
                </p>
                <p>
                  <strong>Request Date:</strong> {new Date(selectedItem.requestDate).toLocaleDateString()}
                </p>
              </div>
              <button
                className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800"
                onClick={() => setSelectedItem(null)}
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Update Item Popup */}
      <AnimatePresence>
        {showUpdatePopup && (
          <UpdateRequestItemPopup
            isOpen={showUpdatePopup}
            onClose={() => setShowUpdatePopup(false)}
            requestItemData={selectedItem} // Ensure prop name matches
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ManageRequestItem;
