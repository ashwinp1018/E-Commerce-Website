import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 px-4 text-white max-w-6xl">
        {/* Stylized Animated Heading */}
        <h1
          style={{ fontFamily: "Josefin Sans" }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-snug tracking-wide 
          bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-[length:200%_200%] animate-gradient 
          bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
        >
          READY TO LEVEL UP YOUR FASHION GAME?
        </h1>

        {/* Buttons */}
        <div className="flex justify-center space-x-6 mt-8">
          <NavLink
            to="/products"
            className="w-40 px-6 py-3 border-b-2 border-white text-white bg-transparent text-lg 
            hover:bg-white hover:text-black transition-all duration-300"
          >
            SHOP ALL
          </NavLink>
          <NavLink
            to="/login"
            className="w-40 px-6 py-3 border-b-2 border-white text-white bg-transparent text-lg 
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
