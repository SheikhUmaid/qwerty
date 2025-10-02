import React from 'react';
import CountUp from 'react-countup';

function StatsRow() {
  return (
    <section className="py-10 bg-[#04000D]">
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 px-4">
        {/* Years */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-bold text-[#ffffff]">
            <CountUp end={5} duration={2.5} enableScrollSpy scrollSpyOnce />
          </span>
          <span className="text-lg md:text-2xl text-gray-200 font-roboto mt-2">years</span>
        </div>

        {/* Members */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-bold text-[#ffffff]">
            <CountUp end={50} duration={2.5} enableScrollSpy scrollSpyOnce />+
          </span>
          <span className="text-lg md:text-2xl text-gray-200 font-roboto mt-2">members</span>
        </div>

        {/* Workshops */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-bold text-[#ffffff]">
            <CountUp end={20} duration={2.5} enableScrollSpy scrollSpyOnce />+
          </span>
          <span className="text-lg md:text-2xl text-gray-200 font-roboto mt-2">workshops</span>
        </div>

        {/* Events */}
        <div className="flex flex-col items-center">
          <span className="text-4xl md:text-6xl font-bold text-[#ffffff]">
            <CountUp end={10} duration={2.5} enableScrollSpy scrollSpyOnce />+
          </span>
          <span className="text-lg md:text-2xl text-gray-200 font-roboto mt-2">events</span>
        </div>
      </div>
    </section>
  );
}

export default StatsRow;