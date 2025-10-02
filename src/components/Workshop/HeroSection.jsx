import React from 'react';
import hero from '/images/workshops/home-workshop/data.png';

const HeroSection = () => (
  <section className="relative w-full h-[80vh]">
    {/* Navbar overlay */}
    <button className="md:hidden text-white">
      ☰
    </button>

    {/* Hero Background */}
    <div
      className="absolute inset-0 bg-cover -mt-[140px] z-20 opacity-50"
      style={{ backgroundImage: `url(${hero})` }}
    />

    {/* Dark overlay for better contrast */}
    <div className="absolute inset-0 bg-[#04000d] bg-opacity-60" />

    {/* Hero content */}
    <div className="relative z-10 w-full flex flex-col items-center justify-end h-full pb-14 px-4">
      <h1 className="text-5xl md:text-6xl font-bold text-white mb-3 text-center drop-shadow-lg">
        Workshops
      </h1>
      <p className="text-lg md:text-xl text-gray-200 max-w-xl text-center drop-shadow-lg">
        Expand your tech horizons with our year-wise interactive workshops.
      </p>
    </div>
  </section>
);

export default HeroSection;
