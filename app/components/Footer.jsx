import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Top Bar with Add Property Button */}
      <div className="bg-green-700 text-center py-3">
      <Link href="/add-property">
      <button className="bg-white text-green-700 font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition duration-300">
          + Add Property
        </button>
        </Link>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & App Store Links */}
        <div className="text-center md:text-left">
          <img src="/logo.png" alt="Logo" className="w-32 mx-auto md:mx-0" />
          <div className="flex justify-center md:justify-start mt-4">
            <img src="/app-store.png" alt="App Store" className="w-32 mr-2" />
            <img src="/google-play.png" alt="Google Play" className="w-32" />
          </div>
        </div>

        {/* Internal Links */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="/about" className="hover:text-green-400 transition duration-300">About Us</a>
          <a href="/contact" className="hover:text-green-400 transition duration-300">Contact</a>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        <a href="/sitemap" className="mx-3 hover:text-green-400 transition duration-300">Sitemap</a>
        <a href="/privacy-policy" className="mx-3 hover:text-green-400 transition duration-300">Privacy Policy</a>
        <a href="/terms" className="mx-3 hover:text-green-400 transition duration-300">Terms & Conditions</a>
      </div>
    </footer>
  );
};

export default Footer;
