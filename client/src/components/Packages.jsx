import React from "react";
import img from "../assets/EventCalender.png";

const packages = [
  {
    title: "Full Service",
    description:
      "A vehicle full service is a comprehensive maintenance procedure designed to ensure your car operates at its best...",
    price: "Rs.30000",
    image: img,
  },
  {
    title: "Master Mileage Pack",
    description:
      "The Mileage Master Package is ideal for vehicles that have clocked significant miles.",
    price: "Rs.10000",
    image: img,
  },
  {
    title: "Engine Repair",
    description:
      "Engine repair involves diagnosing and fixing issues within a vehicle’s engine, addressing problems like overheating, misfiring, or mechanical failures...",
    price: "Rs.10000",
    image: img,
  },
  {
    title: "Wheel Alignment",
    description:
      "Wheel alignment adjusts the angles of a vehicle’s wheels to the manufacturer’s specifications, ensuring they are parallel and properly aligned with the road...",
    price: "Rs.4500",
    image: img,
  },
  {
    title: "Engine Tune Up",
    description:
      "An engine tune-up involves inspecting and adjusting key engine components, such as spark plugs, filters, and ignition systems, to ensure optimal performance...",
    price: "Rs.3000",
    image: img,
  },
  {
    title: "AC Repair",
    description:
      "AC repair involves diagnosing and fixing issues in a vehicle’s air conditioning system, such as refrigerant leaks, faulty compressors, or clogged filters...",
    price: "Rs.6000",
    image: img,
  },
];

const Packages = () => {
  const handleClickCard = () => {};
  return (
    <section className="bg-gray-100 py-10 px-6 pt-28">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Maintenance Packages</h2>
        <p className="text-gray-600">
          Keep your vehicle running at its best with our tailored maintenance
          packages.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ml-20 mr-20">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
            onClick={handleClickCard}
          >
            <img
              src={pkg.image}
              alt={pkg.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{pkg.title}</h3>
              <p className="text-gray-700 mb-4">{pkg.description}</p>
              <button className="bg-yellow-400 text-white font-bold py-2 px-4 rounded-lg">
                {pkg.price}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Packages;
