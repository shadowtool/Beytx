import React from "react";

const PropertyHyperlinks = () => {
  const properties = [
    { name: "Apartments", count: 124568, link: "/apartments" },
    { name: "Villas", count: 48900, link: "/villas" },
    { name: "Land", count: 5653, link: "/land" },
    { name: "Offices", count: 3200, link: "/offices" }, // Example count for Offices
    { name: "Shops", count: 1500, link: "/shops" }, // Example count for Shops
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-200 bg-opacity-50 shadow-md rounded-lg my-6">
      <div className="grid grid-cols-3 gap-4 text-gray-700 text-lg">
        {properties.map((property, index) => (
          <div key={index} className="flex justify-between">
            <a href={property.link} className="hover:underline flex-grow">
              {property.name}
            </a>
            <span className="text-gray-500">({property.count.toLocaleString()})</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PropertyHyperlinks;
