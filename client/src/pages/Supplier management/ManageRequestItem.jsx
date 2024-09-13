import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageRequestItem = () => {
  const [requestItems, setRequestItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequestItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/requestItems');
        setRequestItems(response.data); // No filtering by status
        setLoading(false);
      } catch (error) {
        console.error('Error fetching request items:', error);
        setLoading(false);
      }
    };

    fetchRequestItems();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/requestItems/${id}`);
      setRequestItems(prevItems => prevItems.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error deleting request item:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Request Items</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
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
            {requestItems.map((item) => (
              <tr
                key={item._id}
                className="border-b hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="py-3 px-5">{item.requestID}</td>
                <td className="py-3 px-5">{item.supplierName}</td>
                <td className="py-3 px-5">{item.itemName}</td>
                <td className="py-3 px-5">{item.brand}</td>
                <td className="py-3 px-5">{item.quantity}</td>
                <td className="py-3 px-5">{item.requestDate}</td>
                <td className="py-3 px-5">
                  <div className="flex items-center">
                    <Link
                      to={`/requestItem/${item._id}`} // Assuming a route exists for viewing request item details
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/edit-requestItem/${item._id}`} // Assuming a route exists for editing request items
                      className="text-green-500 hover:text-green-700 mr-2"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRequestItem;
