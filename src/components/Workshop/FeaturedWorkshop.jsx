import React from 'react';
import inception from '/images/workshops/inception.jpg';

const FeaturedWorkshop = () => (
  <section className="min-h-[320px] text-white flex flex-col md:flex-row items-center py-12 font-roboto mt-20 max-w-7xl mx-auto px-4 md:px-8 gap-8">
    {/* Left: Workshop People Image */}
    <div className="flex-shrink-0 w-[90vw] max-w-[480px] md:w-[520px] min-h-[240px] bg-gradient-to-tr from-[#5e3cca] to-[#7e22ce] rounded-lg overflow-hidden shadow-lg">
      <img
        src={inception}
        alt="Workshop participants"
        className="object-cover w-full h-full rounded-lg"
        draggable="false"
      />
    </div>
    {/* Right: Text */}
    <div className="md:flex-1 px-2 md:px-0 max-w-3xl">
      <h2 className="text-3xl md:text-4xl font-inter font-semibold mb-4 text-[#7E22CE]">
        Featured Workshop
      </h2>
      <p className="text-base text-[#dcddee] font-roboto leading-relaxed tracking-wide text-justify">
        Join QWERTY’s hands-on workshops designed to bridge the gap between classroom learning and industry-ready skills. Our sessions cover the latest technologies, including full-stack development, AI & ML, cloud computing, cybersecurity, and modern UI/UX design. Participants gain practical, project-based experience, learn from industry experts, and build real-world projects to showcase in their portfolios. These workshops are ideal for students and aspiring professionals who want to transform academic knowledge into actionable expertise and stay ahead in the rapidly evolving tech landscape.
      </p>
    </div>
  </section>
);

export default FeaturedWorkshop;
