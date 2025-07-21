import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Content */}
      <div className="relative z-20 px-4 text-white max-w-6xl">
        {/* Stylized Animated Heading */}
        <h1
          style={{ fontFamily: "Josefin Sans" }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-snug tracking-wide 
          bg-gradient-to-r from-black via-gray-800 to-gray-600 bg-[length:200%_200%] animate-gradient 
          bg-clip-text text-transparent"
        >
          READY TO LEVEL UP YOUR FASHION GAME?
        </h1>

        {/* Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <NavLink
            to="/products"
            className="w-40 px-6 py-3 border-b-2 border-black text-black bg-transparent text-lg 
            hover:bg-white hover:text-black transition-all duration-300"
          >
            SHOP ALL
          </NavLink>
          <NavLink
            to="/login"
            className="w-40 px-6 py-3 border-b-2 border-black text-black bg-transparent text-lg 
            hover:bg-white hover:text-black transition-all duration-300"
          >
            LOGIN
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
