import React from "react";

const Home = () => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center text-center overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video-bg.mp4" type="video/mp4" />
        
      </video>
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10"></div>

      <div className="relative z-20 px-4 text-white">
        <h1 style={{fontFamily:'Josefin Sans'}}className="text-4xl md:text-5xl font-bold mb-4">
          READY TO LEVEL UP YOUR FASHION GAME?
        </h1>
        <p className="text-lg md:text-2xl mb-6">
          Choose from a wide range of products to fit your style!
        </p>
<div className="flex justify-center space-x-4">
  <button className="px-6 py-3  text-white bg-transparent hover:bg-white hover:text-black transition-colors duration-300 relative z-10">
    SHOP
  </button>
  <button className="px-6 py-3   border-white text-white bg-transparent hover:bg-white hover:text-black transition-colors duration-300 relative z-10">
    LOGIN
  </button>
</div>


      </div>
    </div>
  );
};

export default Home;
