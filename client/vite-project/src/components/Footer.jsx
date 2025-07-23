import React from "react";
import { FaInstagram, FaTwitter, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between">
        {/* Left - Brand Info */}
        <div className="text-center md:text-left mb-4 md:mb-0">
          <h2 className="text-2xl font-bold tracking-wide">MooN Thrifts</h2>
          <p className="text-gray-400 text-sm mt-1">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center - Social Links */}
        <div className="flex space-x-6">
          <a
            href="https://www.instagram.com/_ashwin018"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaInstagram />
          </a>
          <a
            href="x.com/ashwinpara3542?s=21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaTwitter />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition text-xl"
          >
            <FaFacebookF />
          </a>
        </div>

        {/* Right - Quick Links */}
        <div className="text-center md:text-right mt-4 md:mt-0">
          <p className="text-gray-400 text-sm">
            <a href="/privacy-policy" className="hover:text-white transition">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="/terms" className="hover:text-white transition">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
