"use client";
import SortBy from "./SortBy";

import { useState, useEffect, useRef } from "react";

const PropertyFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [transactionType, setTransactionType] = useState("Buy");
  const [propertyType, setPropertyType] = useState("");
  const [beds, setBeds] = useState("");
  const [furnished, setFurnished] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const priceDropdownRef = useRef(null);

  const handleSearch = () => {
    console.log({
      searchTerm,
      transactionType,
      propertyType,
      beds,
      furnished,
      minPrice,
      maxPrice,
    });
  };

  const handleClickOutside = (event) => {
    if (priceDropdownRef.current && !priceDropdownRef.current.contains(event.target)) {
      setPriceDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTransactionTypeClick = (type) => {
    setTransactionType(type);
  };

  const handleResetPrices = () => {
    setMinPrice(0);
    setMaxPrice(100000);
  };

  const priceOptions = Array.from({ length: 21 }, (_, i) => i * 100000);

  return (
    <div className="flex items-center space-x-2 p-4 border rounded-lg shadow-md bg-white w-full max-w-8xl mx-auto mb-6">
      <button
        onClick={() => handleTransactionTypeClick("Buy")}
        className={`px-5 py-2 w-28 border rounded-md focus:ring-2 transition text-white duration-700 ${
          transactionType === "Buy" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-300 text-gray-700"
        }`}
      >
        Buy
      </button>

      <button
        onClick={() => handleTransactionTypeClick("Rent")}
        className={`px-5 py-2 w-28 border rounded-md focus:ring-2 transition text-white duration-700 ${
          transactionType === "Rent" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-300 text-gray-700"
        }`}
      >
        Rent
      </button>

      <input
        type="text"
        placeholder="Search Location"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 border rounded-md flex-grow outline-none focus:ring-2 focus:ring-green-500 transition text-black"
      />

      <select
        value={propertyType}
        onChange={(e) => setPropertyType(e.target.value)}
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black"
      >
        <option value="" disabled>Type</option>
        <option value="Villa">Villa</option>
        <option value="Apartment">Apartment</option>
        <option value="Land">Land</option>
        <option value="Office">Office</option>
        <option value="Shop">Shop</option>
      </select>

      <select
        value={furnished}
        onChange={(e) => setFurnished(e.target.value)}
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black"
      >
        <option value="" disabled>Furniture</option>
        <option value="Furnished">Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>

      <select
        value={beds}
        onChange={(e) => setBeds(e.target.value)}
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black"
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

      <div className="relative" ref={priceDropdownRef}>
        <div
          className="flex items-center px-4 py-2 border rounded-md cursor-pointer focus:ring-2 focus:ring-green-500 transition text-black"
          onClick={() => setPriceDropdownOpen(!priceDropdownOpen)}
        >
          <span className="mr-2">Price</span>
          <div className="flex items-center space-x-2">
            <span>{minPrice.toLocaleString()}</span>
            <span>-</span>
            <span>{maxPrice.toLocaleString()}</span>
          </div>
        </div>
        {priceDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg z-10 p-4 max-h-60 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="flex flex-col">
                  <span className="text-gray-500">Min</span>
                  <select
                    value={minPrice}
                    onChange={(e) => setMinPrice(Number(e.target.value))}
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black text-lg max-h-24 overflow-y-auto"
                  >
                    {priceOptions.map((price) => (
                      <option
                        key={price}
                        value={price}
                        className={`hover:shadow-md hover:bg-gray-100 transition ${
                          minPrice === price ? "bg-emerald-100" : ""
                        }`}
                      >
                        {price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Max</span>
                  <select
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black text-lg max-h-24 overflow-y-auto"
                  >
                    {priceOptions.map((price) => (
                      <option
                        key={price}
                        value={price}
                        className={`hover:shadow-md hover:bg-gray-100 transition ${
                          maxPrice === price ? "bg-emerald-100" : ""
                        }`}
                      >
                        {price.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={handleResetPrices}
                  className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition"
                >
                  Reset
                </button>
                <button
                  onClick={() => setPriceDropdownOpen(false)}
                  className="px-4 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleSearch}
        className="px-14 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
      >
        Search
      </button>
      <SortBy className="justify-center" />
    </div>
  );
};

export default PropertyFilter;
