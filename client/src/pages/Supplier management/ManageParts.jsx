import React from "react";

export default function ManageParts() {
  const parts = [
    { id: 1, name: "Brake Pad", quantity: 10 },
    { id: 2, name: "Oil Filter", quantity: 20 },
    { id: 3, name: "Air Filter", quantity: 15 },
  ];

  return (
    <div className="p-8 bg-SecondaryColor rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-ExtraDarkColor mb-4">
        Manage Spare Parts
      </h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-DarkColor text-SecondaryColor">
            <th className="p-2 border-r">Part Name</th>
            <th className="p-2 border-r">Quantity</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <tr key={part.id} className="bg-PrimaryColor text-ExtraDarkColor">
              <td className="p-2 border-r">{part.name}</td>
              <td className="p-2 border-r">{part.quantity}</td>
              <td className="p-2">
                <button className="bg-ExtraDarkColor text-SecondaryColor px-2 py-1 rounded hover:bg-DarkColor">
                  Edit
                </button>
                <button className="bg-ExtraDarkColor text-SecondaryColor px-2 py-1 ml-2 rounded hover:bg-DarkColor">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
