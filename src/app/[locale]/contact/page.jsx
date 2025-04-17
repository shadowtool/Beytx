"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const Contact = () => {
  const t = useTranslations("contactUs");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    inquiry: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    setFormData({
      name: "",
      email: "",
      phone: "",
      inquiry: "",
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-md bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <h2 className="text-green-700 mb-6 text-center">
              {t("contactUs")}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="name" className="block text-gray-700 mb-1">
                    {t("name")}
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-gray-700 mb-1">
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-700 mb-1">
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry" className="block text-gray-700 mb-1">
                    {t("inquiry")}
                  </label>
                  <textarea
                    id="inquiry"
                    name="inquiry"
                    rows="4"
                    value={formData.inquiry}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-300 text-black"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-300 active:scale-95"
              >
                {t("sendMessage")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
