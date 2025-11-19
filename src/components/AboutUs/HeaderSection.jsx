import React from 'react';
import man from '../../assets/man.svg';

function HeaderSection() {
  return (
    <section className="w-full bg-[#04000D] py-8 px-4">
      <div className="max-w-6xl xl:max-w-6xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-6 lg:gap-8">
        {/* LEFT: Heading Text Block */}
        <div className="md:w-[48%] w-full flex flex-col items-start px-4 md:px-0 md:ml-10">
          {/* "about" sits tight above the main title */}
          <span
            className="lowercase text-[#7E22CE] font-medium text-3xl md:text-5xl mb-2 md:mb-0 md:ml-10"
            style={{
              fontFamily: 'Inter, Arial, sans-serif',
              lineHeight: 1.15,
              letterSpacing: '0.01em',
              marginBottom: '-0.5rem',
            }}
          >
            about
          </span>
          <h1
            className="font-roboto font-bold tracking-tight text-5xl md:text-7xl text-white mb-4 md:mb-3"
            style={{
              lineHeight: 1.06,
              letterSpacing: '-0.01em',
              textAlign: 'left',
              marginTop: 0,
            }}
          >
            QWERTY.I/O
          </h1>
          <p
            className="text-gray-300 text-base md:text-lg leading-relaxed max-w-full md:max-w-[30rem]"
            style={{
              fontFamily: 'Roboto, Arial, sans-serif',
              lineHeight: 1.52,
              textAlign: 'left',
              marginBottom: 0,
            }}
          >
           QWERTY.I/O is the official technical club of SDMCET with a vibrant community of 50+ members committed to learning, innovation, and growth. The club bridges the gap between academics and industry through workshops, projects, and hands-on sessions that provide practical exposure to emerging technologies. With a vision to empower students and foster teamwork, leadership, and creativity, QWERTY.I/O continues to inspire and make an impact within and beyond the campus.
          </p>
        </div>

        {/* RIGHT: Large, tightly placed square image */}
        <div className="md:w-[45%] w-full flex justify-center md:justify-end mt-6 md:mt-0">
          <img
            src={man}
            alt="About QWERTY.I/O"
            className="w-72 h-72 md:w-[40rem] md:h-[22rem] object-cover"
            style={{
              borderRadius: 0,
              boxShadow: '0 8px 32px 0 rgba(48,20,80,0.13)',
              marginTop: 0,
            }}
            draggable="false"
          />
        </div>
      </div>
    </section>
  );
}

export default HeaderSection;