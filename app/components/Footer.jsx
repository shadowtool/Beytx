import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className=" bg-gray-900 text-white fixed bottom-0 left-0 w-full z-50 border-t border-gray-700">
      {/* Top Bar with Add Property Button */}



      {/* Main Footer Content */}
      <div className="container mx-auto px-2 py-4 flex flex-col md:flex-row justify-between items-center">
        {/* Logo & App Store Links */}
        {/* <div className="text-center md:text-left">  */}
{/* This is where the logo position was */}
          <div className="flex justify-center md:justify-start mt-4">
          <img src="/images/beyt.png" alt="Logo" className="max-w-30 max-h-8 mr-12" />
            <img src="/images/app-store.png" alt="App Store" className="w-32 mr-2 ml-10" />
            <img src="/images/google-play.png" alt="Google Play" className="w-32" />
          </div>
        {/* </div> */}

        {/* Internal Links */}
        <div className="flex space-x-6 mt-6 md:mt-0">
          <a href="/about" className="hover:text-green-400 transition duration-300">About Us</a>
          <a href="/contact" className="hover:text-green-400 transition duration-300">Contact</a>
          <a href="/add-property" className="hover:text-green-400 transition duration-300">Add Property</a>
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
