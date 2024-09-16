import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center fixed min-w-full">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">Mr.Automotive</h1>
      </div>
      <ul className="flex space-x-6">
        {["Home", "Booking", "Service", "Product", "FAQ"].map((item) => (
          <li key={item} className="hover:text-yellow-400">
            {<a href={`/${item}`}>{item}</a>}
          </li>
        ))}
      </ul>
      <div className="flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-1 border border-gray-300 rounded-md"
        />
        <button className="bg-yellow-400 p-2 rounded-full">
          <i className="fas fa-search"></i>
        </button>
        <img
          src="https://via.placeholder.com/40"
          alt="User Avatar"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </nav>
  );
};

export default NavBar;
