"use client";

import { useState, useRef } from "react";
import { useSession, signIn } from "next-auth/react";
import { useForm } from 'react-hook-form';

export default function AddProperty() {
  const { data: session } = useSession();
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState("");
  const fileInputRef = useRef(null);

  const onSubmit = (data) => {
    console.log({ ...data, status });
    reset();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    e.target.value = null; // Clear the input value
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <p>You must be logged in to add a property.</p>
        <button onClick={() => signIn("google")} className="bg-blue-500 text-white px-4 py-2 rounded">
          Login with Google
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">Add Property</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {/* For Sale or Rent Buttons */}
              <div className="flex justify-center space-x-4">
                <button
                  type="button"
                  onClick={() => setStatus(status === "sale" ? "" : "sale")}
                  className={`mt-4 px-10 py-2 rounded-full transition duration-1000  w-44 ${
                    status === "sale" ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg" : "bg-gray-300 text-gray-700 border-2 border-solid rounded-lg hover:border-emerald-500  hover:bg-emerald-400 hover:text-white "
                  }`}
                >
                  For Sale
                </button>
                <button
                  type="button"
                  onClick={() => setStatus(status === "rent" ? "" : "rent")}
                  className={`mt-4 px-10 py-2 rounded-full transition duration-1000 w-44 ${
                    status === "rent" ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg rounded-lg" : "bg-gray-300 text-gray-700 border-2 border-solid hover:border-emerald-500   hover:bg-emerald-400 hover:text-white rounded-lg"
                  }`}
                >
                  For Rent
                </button>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  {...register('title', { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                />
              </div>

              {/* Property Type */}
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Type of Property
                </label>
                <select
                  id="type"
                  {...register('type', { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                >
                  <option value="Villa">Villa</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Land">Land</option>
                  <option value="Office">Office</option>
                  <option value="Shop">Shop</option>
                
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  {...register('price', { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                />
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  {...register('location', { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                />
              </div>

              {/* Beds */}
              <div>
                <label htmlFor="beds" className="block text-sm font-medium text-gray-700 mb-1">
                  Beds
                </label>
                <input
                  type="number"
                  id="beds"
                  {...register('beds', { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                />
              </div>

              {/* Baths */}
              <div>
                <label htmlFor="baths" className="block text-sm font-medium text-gray-700 mb-1">
                  Baths
                </label>
                <input
                  type="number"
                  id="baths"
                  {...register('baths', { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                />
              </div>

              {/* Area */}
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
                  Area (in square meters)
                </label>
                <input
                  type="number"
                  id="area"
                  {...register('area', { required: true })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description', { required: true })}
                  rows="4"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                ></textarea>
              </div>





              {/* Drag and Drop Image Upload */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={handleClick}
                className="mt-1 block w-full h-52 px-4 py-12 border-2 border-dashed border-gray-300 rounded-md shadow-sm text-center cursor-pointer focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
              >
                <p className="text-gray-500">Drag and drop images here, or click to select files</p>
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
              </div>

              {/* Display selected images */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                {images.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Selected ${index}`}
                      className="w-full h-32 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 active:scale-95"
            >
              Add Property
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
