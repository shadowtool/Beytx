// components/Hero.js
'use client';
import { useState } from "react"; // Importing state management from React
import { usePropertyContext } from '../context/PropertyContext';

const Hero = () => {
  const { filterStatus, setFilterStatus } = usePropertyContext();
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [furnished, setFurnished] = useState("");

  return (
    <div className="bg-gray-100 py-20 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-6">Find Your Dream Property</h1>

      {/* Search Buttons */}
      <div className="mt-4 flex justify-center space-x-4">
        <button
          onClick={() => setFilterStatus(filterStatus === "sale" ? null : "sale")}
          className={`px-6 py-2 rounded-full transition ${
            filterStatus === "sale" ? "bg-green-600 text-white shadow-lg" : "bg-gray-300 text-gray-700"
          }`}
        >
          For Sale
        </button>

        <button
          onClick={() => setFilterStatus(filterStatus === "rent" ? null : "rent")}
          className={`px-6 py-2 rounded-full transition ${
            filterStatus === "rent" ? "bg-green-600 text-white shadow-lg" : "bg-gray-300 text-gray-700"
          }`}
        >
          For Rent
        </button>
      </div>

      {/* Search Bar */}
      <div className="w-full flex flex-col items-center bg-gray-100 p-6">

      {/* Search Bar Container */}
      <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden w-full max-w-3xl">
        
        {/* Property Type Select */}
        <select
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
          className="px-4 py-3 w-40 text-gray-700 border-r border-gray-300 outline-none"
        >
          <option value="" disabled>Property Type</option>
          <option value="Villa">Villa</option>
          <option value="Apartment">Apartment</option>
          <option value="Land">Land</option>
          <option value="Office">Office</option>
          <option value="Shop">Shop</option>
        </select>
        <select
            value={furnished}
            onChange={(e) => setFurnished(e.target.value)}
            className="px-4 py-3 w-40 text-gray-700 border-r border-gray-300 outline-none"
          >
            <option value="" disabled>Furniture</option>
            <option value="Furnished">Furnished</option>
            <option value="Unfurnished">Unfurnished</option>
          </select>

        {/* Bedrooms Select */}
        <select
          value={bedrooms}
          onChange={(e) => setBedrooms(e.target.value)}
          className="px-4 py-3 w-32 text-gray-700 border-r border-gray-300 outline-none"
        >
          <option value="" disabled>Beds</option>
          <option value="Studio">Studio</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7+">7+</option>
        </select>

        {/* Search Bar Input */}
        <input
          type="text"
          placeholder="Search properties..."
          className="px-4 py-3 flex-1 text-gray-700 outline-none"
        />

        {/* Search Button */}
        <button className="bg-green-600 text-white px-10 py-3 font-semibold hover:bg-green-700 transition">
          Search
        </button>
      </div>
    </div>
    </div>
  );
};

export default Hero;
