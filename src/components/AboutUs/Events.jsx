
import React from "react";

const GeekOlympics = "/images/workshops/geek.png";
const Insignia = "/images/workshops/insigniaFinal.jpg";

function Events() {
  return (
    <section className="text-white py-16 px-6 -mt-8 relative">
      <h2 className="text-5xl font-semibold text-center text-[#7E22CE] mb-12 font-inter">
        Events
      </h2>

      <div className="flex flex-col gap-20 max-w-6xl mx-auto relative">
        {/* Geek Olympics Card */}
        <div className="relative">
          {/* Desktop Glow - Positioned outside the card but within relative parent */}
          <div
            className="absolute -inset-6 -z-10 rounded-[3.5rem] md:rounded-[5.5rem_3.5rem_3.5rem_5.5rem] pointer-events-none hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, rgba(126,34,206,0.45) 0%, rgba(126,34,206,0.40) 15%, rgba(126,34,206,0.32) 30%, rgba(126,34,206,0.25) 45%, rgba(126,34,206,0.15) 65%, rgba(126,34,206,0.08) 80%, transparent 100%)",
              filter: "blur(20px)",
              opacity: 0.9,
            }}
          />

          {/* Mobile Glow */}
          <div
            className="absolute -inset-6 -z-10 rounded-[3.5rem] pointer-events-none md:hidden"
            style={{
              background: "radial-gradient(circle at center, rgba(126,34,206,0.4) 0%, rgba(126,34,206,0.2) 40%, transparent 70%)",
              filter: "blur(20px)",
              opacity: 0.9,
            }}
          />

          {/* Card Content */}
          <div className="bg-[#04000D] relative flex flex-col md:flex-row items-stretch rounded-[3rem] md:rounded-[5rem_3rem_3rem_5rem] min-h-[18rem] overflow-hidden z-10">
            {/* Image Container */}
            <div className="md:w-2/5 h-64 md:h-auto flex-shrink-0">
              <img
                src={GeekOlympics}
                alt="Geek Olympics"
                className="w-full h-full object-cover object-center"
                style={{ minWidth: "100%", minHeight: "100%" }}
                loading="lazy"
                draggable="false"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 px-8 py-10 flex flex-col justify-center bg-gradient-to-r from-[#04000D]/98 to-[#04000D]/92 md:rounded-r-[3rem] md:rounded-l-none rounded-b-[3rem]">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white font-inter">
                Geek Olympics
              </h3>
              <p className="text-gray-300 text-base leading-relaxed font-roboto">
                Geek Olympics is the flagship coding and tech event organized by
                QWERTY.I/O. It consists of fun yet challenging programming
                contests, algorithm wars, and debugging battles designed to push
                your logical skills to the limit.
              </p>
            </div>
          </div>
        </div>

        {/* Insignia Card */}
        <div className="relative">
          {/* Desktop Glow (Reversed Direction) */}
          <div
            className="absolute -inset-6 -z-10 rounded-[3.5rem] md:rounded-[5.5rem_3.5rem_3.5rem_5.5rem] pointer-events-none hidden md:block"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(126,34,206,0.08) 20%, rgba(126,34,206,0.15) 35%, rgba(126,34,206,0.25) 55%, rgba(126,34,206,0.32) 70%, rgba(126,34,206,0.40) 85%, rgba(126,34,206,0.45) 100%)",
              filter: "blur(20px)",
              opacity: 0.9,
            }}
          />

          {/* Mobile Glow */}
          <div
            className="absolute -inset-6 -z-10 rounded-[3.5rem] pointer-events-none md:hidden"
            style={{
              background: "radial-gradient(circle at center, rgba(126,34,206,0.4) 0%, rgba(126,34,206,0.2) 40%, transparent 70%)",
              filter: "blur(20px)",
              opacity: 0.9,
            }}
          />

          {/* Card Content */}
          <div className="bg-[#04000D] relative flex flex-col md:flex-row-reverse items-stretch rounded-[3rem] md:rounded-[5rem_3rem_3rem_5rem] min-h-[18rem] overflow-hidden z-10">
            {/* Image Container */}
            <div className="md:w-2/5 h-64 md:h-auto flex-shrink-0">
              <img
                src={Insignia}
                alt="Insignia"
                className="w-full h-full object-cover object-center"
                style={{ minWidth: "100%", minHeight: "100%" }}
                loading="lazy"
                draggable="false"
              />
            </div>

            {/* Text Content */}
            <div className="flex-1 px-8 py-10 flex flex-col justify-center bg-gradient-to-l from-[#04000D]/98 to-[#04000D]/92 md:rounded-l-[3rem] md:rounded-r-none rounded-b-[3rem]">
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white font-inter">
                Insignia
              </h3>
              <p className="text-gray-300 text-base leading-relaxed font-roboto">
                Insignia is the annual techno-cultural fest of SDM College of Engineering and Technology, Dharwad. It serves as a vibrant platform where technology meets creativity, bringing together students from various domains to showcase their skills, ideas, and talents. With a blend of technical events, cultural showcases, workshops, and competitions, Insignia reflects the spirit of innovation, collaboration, and youthful energy. It’s not just a fest,  it’s a celebration of potential and passion.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <div className="mt-20 max-w-3xl mx-auto text-center text-gray-400 text-base font-roboto z-10 px-4">
        "At QWERTY.I/O, we are committed to empowering students with the skills,
        knowledge, and confidence to excel in the ever-evolving world of
        technology."
      </div>
    </section>
  );
}

export default Events;