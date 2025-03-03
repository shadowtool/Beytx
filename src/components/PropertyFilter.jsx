"use client";
import { useFormContext } from "react-hook-form";
import SortBy from "./SortBy";

import { useState, useEffect, useRef } from "react";

const PropertyFilter = () => {
  const { register, watch, setValue, reset } = useFormContext();

  const status = watch("status", "Buy");
  const minPrice = watch("minPrice", 0);
  const maxPrice = watch("maxPrice", 100000);

  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const priceDropdownRef = useRef(null);

  const handleSearch = () => {};

  const handleClickOutside = (event) => {
    if (
      priceDropdownRef.current &&
      !priceDropdownRef.current.contains(event.target)
    ) {
      setPriceDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const priceOptions = Array.from({ length: 21 }, (_, i) => i * 100000);

  return (
    <div className="flex items-center space-x-2 bg-white p-4 border rounded-lg shadow-md w-full max-w-8xl mx-auto mb-6">
      <button
        onClick={() => setValue("status", "sale")}
        className={`px-5 py-2 w-28 border rounded-md focus:ring-2 transition text-white duration-700 ${
          status === "sale"
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-gray-300 text-gray-700"
        }`}
      >
        Buy
      </button>

      <button
        onClick={() => setValue("status", "rent")}
        className={`px-5 py-2 w-28 border rounded-md focus:ring-2 transition text-white duration-700 ${
          status === "rent"
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-gray-300 text-gray-700"
        }`}
      >
        Rent
      </button>

      <input
        type="text"
        placeholder="Search Location"
        {...register("location")}
        className="px-4 py-2 border rounded-md flex-grow outline-none focus:ring-2 focus:ring-green-500 transition text-black"
      />

      <select
        {...register("type")}
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black"
      >
        <option value="">Type</option>
        <option value="Villa">Villa</option>
        <option value="Apartment">Apartment</option>
        <option value="Land">Land</option>
        <option value="Office">Office</option>
        <option value="Shop">Shop</option>
      </select>

      <select
        {...register("furnished")}
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black"
      >
        <option value="">Furniture</option>
        <option value="Furnished">Furnished</option>
        <option value="Unfurnished">Unfurnished</option>
      </select>

      <select
        {...register("bedrooms")}
        className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black"
      >
        <option value="">Beds</option>
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
            <span>{minPrice}</span>
            <span>-</span>
            <span>{maxPrice}</span>
          </div>
        </div>
        {priceDropdownOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg z-10 p-4 max-h-60 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col space-y-2">
              <div className="flex space-x-2">
                <div className="flex flex-col">
                  <span className="text-gray-500">Min</span>
                  <select
                    {...register("minPrice")}
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black text-lg max-h-24 overflow-y-auto"
                  >
                    <option value="">Select min price</option>

                    {priceOptions.map((price) => (
                      <option
                        key={price}
                        value={price}
                        className={`hover:shadow-md hover:bg-gray-100 transition ${
                          minPrice === price ? "bg-emerald-100" : ""
                        }`}
                      >
                        {price}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col">
                  <span className="text-gray-500">Max</span>
                  <select
                    {...register("minPrice")}
                    className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-green-500 transition text-black text-lg max-h-24 overflow-y-auto"
                  >
                    <option value="">Select max price</option>

                    {priceOptions.map((price) => (
                      <option
                        key={price}
                        value={price}
                        className={`hover:shadow-md hover:bg-gray-100 transition ${
                          maxPrice === price ? "bg-emerald-100" : ""
                        }`}
                      >
                        {price}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setValue("minPrice", 0);
                    setValue("maxPrice", 100000);
                  }}
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
        className="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
      >
        Search
      </button>
      <button
        className="px-6 py-2 bg-emerald-500 text-white rounded-md hover:bg-emerald-600 transition"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
      <SortBy className="justify-center" />
    </div>
  );
};

export default PropertyFilter;
