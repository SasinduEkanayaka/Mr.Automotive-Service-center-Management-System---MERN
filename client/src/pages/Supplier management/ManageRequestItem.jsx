import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Import for generating PDFs
import UpdateRequestItemPopup from './UpdateReqItemPopup'; // Make sure path is correct

const ManageRequestItem = () => {
  const [requestItems, setRequestItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('received');
  const [loading, setLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);

  useEffect(() => {
    fetchRequestItems();
  }, []);

  useEffect(() => {
    filterItems(requestItems, filterStatus, searchQuery);
  }, [requestItems, filterStatus, searchQuery]);

  const fetchRequestItems = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/requestItems');
      setRequestItems(response.data);
    } catch (error) {
      console.error('Error fetching request items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterItems = (items, status, query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = items.filter(
      (item) =>
        item.status === status &&
        (item.requestID.toLowerCase().includes(lowercasedQuery) ||
          item.supplierName.toLowerCase().includes(lowercasedQuery) ||
          item.itemName.toLowerCase().includes(lowercasedQuery) ||
          item.brand?.toLowerCase().includes(lowercasedQuery) ||
          new Date(item.requestDate).toLocaleDateString().toLowerCase().includes(lowercasedQuery))
    );
    setFilteredItems(filtered);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
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
          setRequestItems((prevItems) => prevItems.filter((item) => item._id !== id));
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

  const generatePDF = () => {
    const doc = new jsPDF();
    const tableColumn = ['No', 'Request ID', 'Supplier Name', 'Item Name', 'Brand', 'Quantity', 'Request Date', 'Status'];
    const tableRows = [];

    filteredItems.forEach((item, index) => {
      const data = [
        index + 1,
        item.requestID,
        item.supplierName,
        item.itemName,
        item.brand || '-',
        item.quantity,
        new Date(item.requestDate).toLocaleDateString(),
        item.status,
      ];
      tableRows.push(data);
    });

    const date = new Date().toLocaleDateString();

    doc.setFontSize(24).setFont('helvetica', 'bold').setTextColor('#4B9CD3');
    doc.text('Vehicle_Service Management', 105, 15, { align: 'center' });

    doc.setFont('helvetica', 'normal').setFontSize(18).setTextColor('#333');
    doc.text('Request Item Details Report', 105, 25, { align: 'center' });

    doc.setFont('helvetica', 'italic').setFontSize(12).setTextColor('#666');
    doc.text(`Report Generated Date: ${date}`, 105, 35, { align: 'center' });

    doc.setFont('helvetica', 'normal').setFontSize(10).setTextColor('#999');
    doc.text('Service, Gampaha', 105, 45, { align: 'center' });

    doc.setDrawColor(0, 0, 0).setLineWidth(0.5);
    doc.line(10, 49, 200, 49);

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 55,
      styles: { fontSize: 10, cellPadding: 2 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center',
      },
      alternateRowStyles: {
        fillColor: [230, 230, 230],
      },
      margin: { top: 60 },
    });

    doc.save(`Request-Items-Report_${date}.pdf`);
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Request Items</h1>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search request items..."
          className="w-full p-3 border border-dark rounded-md focus:outline-none focus:ring-2 focus:ring-dark transition"
          value={searchQuery}
          onChange={handleSearch}
        />

        <select
          className="p-3 border border-dark rounded-md"
          value={filterStatus}
          onChange={handleFilterChange}
        >
          <option value="received">Received</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <button
        onClick={generatePDF}
        className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-500 transition"
      >
        Generate Report
      </button>

      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-bold mb-4">{filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Items</h2>

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
            {filteredItems.map((item) => (
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

      {showUpdatePopup && selectedItem && (
        <UpdateRequestItemPopup
          item={selectedItem}
          onClose={() => setShowUpdatePopup(false)}
          onItemUpdated={(updatedItem) => {
            setRequestItems((prevItems) =>
              prevItems.map((item) => (item._id === updatedItem._id ? updatedItem : item))
            );
          }}
        />
      )}
    </div>
  );
};

export default ManageRequestItem;
