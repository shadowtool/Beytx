"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { usePropertyContext } from "@/context/PropertyContext";
import { FilterBgImage } from "@/imports/images";
import Image from "next/image";

const Hero = () => {
  const { filterStatus, setFilterStatus } = usePropertyContext();

  // Initialize form with React Hook Form
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      propertyType: "",
      bedrooms: "",
      furnished: "",
      location: "",
    },
  });

  // Set default filter status to "sale" on component mount
  useEffect(() => {
    setFilterStatus("sale");
  }, [setFilterStatus]);

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Search Data:", {
      ...data,
      status: filterStatus, // Include selected Buy/Rent filter
    });
  };

  return (
    <div className="relative text-center flex py-36 items-center justify-center flex-col">
      <Image
        src={FilterBgImage}
        alt="filter-background-image"
        className="absolute h-full w-full object-cover"
      />
      <div className="h-full w-full bg-black/15 absolute top-0 left-0 z-[1]"></div>

      <div className="h-fit w-fit px-8 py-4 bg-black/25 rounded-xl backdrop-blur min-w-[65%] z-[3]">
        <div className="flex justify-center space-x-4 relative z-[3]">
          <button
            onClick={() => setFilterStatus("sale")}
            className={`px-6 py-2 w-40 sm:w-32 rounded-full transition ${
              filterStatus === "sale"
                ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg"
                : "bg-gray-300 text-gray-700 border-2 border-solid rounded-lg hover:border-emerald-500 transition-all duration-700 hover:bg-emerald-400 hover:text-white "
            }`}
          >
            Buy
          </button>

          <button
            onClick={() => setFilterStatus("rent")}
            className={`px-6 py-2 w-40 sm:w-32 rounded-full transition ${
              filterStatus === "rent"
                ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg"
                : "bg-gray-300 text-gray-700 border-2 border-solid hover:border-emerald-500 transition-all duration-700 hover:bg-emerald-400 hover:text-white rounded-lg"
            }`}
          >
            Rent
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full flex flex-col items-center p-6 relative z-[3]"
        >
          {/* Filter Bar Container */}
          <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden w-full max-w-3xl mb-2">
            {/* Property Type Select */}
            <select
              {...register("propertyType")}
              className="px-4 py-3 w-1/3 text-gray-700 border-r border-gray-300 outline-none"
            >
              <option value="" disabled>
                Type
              </option>
              <option value="Villa">Villa</option>
              <option value="Apartment">Apartment</option>
              <option value="Land">Land</option>
              <option value="Office">Office</option>
              <option value="Shop">Shop</option>
            </select>

            {/* Furnished Select */}
            <select
              {...register("bedrooms")}
              className="px-4 py-3 w-1/3 text-gray-700 border-r border-gray-300 outline-none"
            >
              <option value="" disabled>
                Bedrooms
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7+">7+</option>
            </select>

            {/* Bedrooms Select */}
            <select
              {...register("bathrooms")}
              className="px-4 py-3 w-1/3 text-gray-700 outline-none"
            >
              <option value="" disabled>
                Bathrooms
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7+">7+</option>
            </select>
          </div>

          {/* Search Bar Container */}
          <div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden w-full max-w-3xl">
            {/* Search Bar Input */}
            <input
              type="text"
              placeholder="Location"
              {...register("location")}
              className="px-4 py-3 flex-1 text-gray-800 outline-none"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-emerald-500 text-white px-10 py-3 font-semibold hover:bg-emerald-600 transition"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Hero;
