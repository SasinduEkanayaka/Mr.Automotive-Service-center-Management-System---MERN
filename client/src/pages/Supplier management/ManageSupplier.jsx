import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ManageSupplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/suppliers');
        setSuppliers(response.data.data.filter(supplier => supplier.status === 'approved'));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching suppliers:', error);
        setLoading(false);
      }
    };

    fetchSuppliers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/suppliers/${id}`);
      setSuppliers(prevSuppliers => prevSuppliers.filter(supplier => supplier._id !== id));
    } catch (error) {
      console.error('Error deleting supplier:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-6">Loading...</div>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Approved Suppliers</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-5 text-left">Supplier ID</th>
              <th className="py-3 px-5 text-left">Supplier Name</th>
              <th className="py-3 px-5 text-left">Supply items</th>
              <th className="py-3 px-5 text-left">Contact number</th>
              <th className="py-3 px-5 text-left">Email</th>
              <th className="py-3 px-5 text-left">Address</th>

              <th className="py-3 px-5 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr
                key={supplier._id}
                className="border-b hover:bg-gray-100 transition-colors duration-300"
              >
                <td className="py-3 px-5">{supplier.SupplierID}</td>
                <td className="py-3 px-5">{supplier.SupplierName}</td>
                <td className="py-3 px-5">{supplier.ItemName}</td>
                <td className="py-3 px-5">{supplier.ContactNo}</td>
                <td className="py-3 px-5">{supplier.Email}</td>
                <td className="py-3 px-5">{supplier.Address}</td>
                <td className="py-3 px-5">
                  <div className="flex items-center">
                    <Link
                      to={`/supplier/${supplier._id}`} // Assuming a route exists for viewing supplier details
                      className="text-blue-500 hover:text-blue-700 mr-2"
                    // title="Show Details"
                    >
                      <FaEye />
                    </Link>
                    <Link
                      to={`/edit-supplier/${supplier._id}`} // Assuming a route exists for editing supplier
                      className="text-green-500 hover:text-green-700 mr-2"
                    // title="Edit Supplier"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(supplier._id)}
                      className="text-red-500 hover:text-red-700"
                    // title="Delete Supplier"
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

export default ManageSupplier;
