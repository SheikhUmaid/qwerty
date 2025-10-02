import React from 'react';
import AnantHegde from '/images/anant.jpg';
import Krithi from '/images/kruti.jpg';
function HowStarted() {
  return (
    <div>
      <section className="w-full bg-[#04000D] py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-8 items-center">
          {/* Heading and Intro (spans 3 columns) */}
          <div className="md:col-span-3 text-center md:text-left md:ml-10">
            <h2 className="mb-2 flex items-center justify-center md:justify-start gap-x-2">
              <span className="font-bold font-inter text-5xl text-[#7E22CE]">
                How
              </span>
              <span className="font-bold font-inter text-5xl text-white">
                it started
              </span>
            </h2>
            <p className="text-gray-300 mb-2 font-roboto text-lg leading-relaxed">
              Qwerty began in 2019 under the guidance of Prof. Satish, founded by Anant Hegde and Kriti with a vision to create a strong technical community at SDMCET. What started as a small initiative has now grown into a thriving club of 50+ members dedicated to learning, innovation, and growth.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#04000D] text-white py-12 px-6 -mt-8">
        <div className="flex flex-col gap-y-12 max-w-6xl mx-auto">
          {/* Anant Hegde Section */}
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div>
              <img
                src={AnantHegde}
                alt="Anant Hegde"
                className="w-full md:w-80 h-[360px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left flex flex-col items-center md:items-start mt-4 md:-mt-60 sm:mt-1">
              <h3 className="text-3xl font-bold mb-7 md:mr-5">Anant Hegde</h3>
              <p className="text-gray-300 text-justify font-roboto text-base max-w-xl">
                Anant Hegde is a passionate technologist who co-founded Qwerty.I/O with the vision of building a vibrant technical community.
                He aimed to bring together like-minded individuals who believe that sharing more knowledge benefits everyone. Since its humble
                beginnings in 2019, Anant has inspired students to collaborate, support one another, and continuously learn, fostering an inclusive space
                for personal and collective growth.</p>
            </div>
          </div>

          {/* Anant Quote */}
          <div className="flex justify-center mt-4 md:-mt-[180px] mb-4 lg:mb-[100px]">
            <p className="text-center text-gray-300 max-w-xs leading-relaxed font-roboto text-base mx-auto">
              "From a small vision in 2019, Qwerty.I/O has grown into a thriving hub of innovation, collaboration, and technical excellence, inspiring every student to build, learn, and create together."
            </p>
          </div>

          {/* Kriti Section */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-14 mt-6 md:-mt-32 sm:mb-10">
            <div className="mt-0 md:-mt-28">
              <img
                src={Krithi}
                alt="Kriti"
                className="w-full md:w-80 h-[360px] object-cover rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-2/3 text-center md:text-left flex flex-col md:flex-row items-center md:justify-between gap-4 mt-6 md:mt-44">
              <p className="text-gray-300 text-justify font-roboto text-base max-w-xl">
                Driven by real-world industry expectations, Kruti co-founded Qwerty.I/O to better equip peers for
                the professional world. Noticing the gap between the college curriculum and industry demands, Qwerty.I/O’s
                objective was to bridge this divide by empowering students with extra opportunities beyond academics.
                The original focus was on peer preparation and making a tangible difference in students' readiness for future careers.</p>
              <h3 className="text-3xl font-bold order-first md:order-last">Kruti</h3>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HowStarted;
