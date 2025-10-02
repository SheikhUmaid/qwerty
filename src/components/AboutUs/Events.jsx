import React from "react";
import GeekOlympics from "/images/workshops/geek.png";
import Insignia from "../../assets/team-photo.jpg";

function Events() {
  return (
    <section className="text-white py-16 px-6 -mt-8 overflow-visible">
      <h2 className="text-5xl font-semibold text-center text-[#7E22CE] mb-12 font-inter">
        Events
      </h2>
      <div className="flex flex-col gap-y-12 lg:gap-y-20 max-w-6xl mx-auto overflow-visible">
        {/* Geek Olympics Card */}
        <div className="bg-[#04000D] relative flex flex-col lg:flex-row items-stretch rounded-[5rem_3rem_3rem_5rem] min-h-[18rem] ">
          {/* Much darker glow bright near image (left), fades toward text (right) */}
          <div
            className="absolute -inset-4 lg:-inset-6 -z-10 rounded-[5.5rem_3.5rem_3.5rem_5.5rem] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, rgba(126,34,206,0.45) 0%, rgba(126,34,206,0.40) 15%, rgba(126,34,206,0.32) 30%, rgba(126,34,206,0.25) 45%, rgba(126,34,206,0.15) 65%, rgba(126,34,206,0.08) 80%, transparent 100%)",
              filter: "blur(20px)",
              opacity: 0.9,
            }}
          />

          <div className="w-full lg:w-2/5 h-64 lg:h-full lg:min-h-[20rem] rounded-l-[5rem] overflow-hidden relative z-10 flex">
            <img
              src={GeekOlympics}
              alt="Geek Olympics"
              className="w-full h-full object-cover"
              style={{ objectPosition: "center center" }}
              draggable="false"
            />
          </div>

          <div className="flex-1 p-8 lg:px-8 lg:py-10 flex flex-col justify-center bg-gradient-to-r from-[#04000D]/98 to-[#04000D]/92 rounded-r-[3rem] relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white font-inter">
              Geek Olympics
            </h3>
            <p className="text-gray-300 text-base leading-relaxed font-roboto">
              Geek Olympics is the flagship coding and tech event organized by
              Qwerty.I/O. It consists of fun yet challenging programming
              contests, algorithm wars, and debugging battles designed to push
              your logical skills to the limit.
            </p>
          </div>
        </div>

        {/* Insignia Card */}
        <div className="bg-[#04000D] relative flex flex-col lg:flex-row-reverse items-stretch rounded-[5rem_3rem_3rem_5rem] min-h-[18rem] ">
          {/* Much darker glow bright near image (right), fades toward text (left) */}
          <div
            className="absolute -inset-4 lg:-inset-6 -z-10 rounded-[5.5rem_3.5rem_3.5rem_5.5rem] pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(126,34,206,0.08) 20%, rgba(126,34,206,0.15) 35%, rgba(126,34,206,0.25) 55%, rgba(126,34,206,0.32) 70%, rgba(126,34,206,0.40) 85%, rgba(126,34,206,0.45) 100%)",
              filter: "blur(20px)",
              opacity: 0.9,
            }}
          />
          {/* Image with no gaps */}
          <div className="w-full lg:w-2/5 h-64 lg:min-h-[16rem] relative z-10">
            <img
              src={Insignia}
              alt="Insignia"
              className="w-full h-full object-cover rounded-r-[5rem] rounded-l-none"
              style={{
                objectPosition: "center center",
                margin: 0,
                padding: 0,
              }}
              draggable="false"
            />
          </div>
          <div className="flex-1 p-8 lg:px-8 lg:py-10 flex flex-col justify-center text-left bg-gradient-to-l from-[#04000D]/98 to-[#04000D]/92 rounded-l-[3rem] relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white font-inter">
              Insignia
            </h3>
            <p className="text-gray-300 text-base leading-relaxed font-roboto">
              Insignia is a creative tech fest where design meets development.
              From UI/UX design sprints to web and app hackathons, this event
              empowers innovators to turn ideas into impactful digital
              experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Footer lorem ipsum text */}
      <div className="mt-20 max-w-3xl mx-auto text-center text-gray-400 text-base font-roboto relative z-10">
        “At QWERTY, we are committed to empowering students with the skills,
        knowledge, and confidence to excel in the ever-evolving world of
        technology.”
      </div>
    </section>
  );
}

export default Events;
