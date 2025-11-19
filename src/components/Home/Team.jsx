import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import team from "../../data/team.json";
import Button from "../Button";

export default function Team({ onLearnMore }) {
  const [activeIdx, setActiveIdx] = useState(Math.floor(team.length / 2));

  return (
    <section className="py-24">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header section */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 text-center md:text-left">
          <h2 className="text-5xl sm:text-5xl md:text-6xl font-bold leading-tight">
            Meet our <span className="text-purple-500">Team</span>
          </h2>
          <p className="max-w-[500px] text-gray-300 text-base sm:text-lg md:text-right md:self-end">
            “Meet the team behind QWERTY.I/O, driving innovation and empowering
            students with industry-ready skills.”
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          modules={[EffectCoverflow, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          centeredSlidesBounds={true}
          loop={true}
          initialSlide={activeIdx}
          spaceBetween={50}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 180,
            modifier: 1.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          className="w-full"
          onSlideChange={(swiper) => {
            setActiveIdx(swiper.realIndex);
          }}
        >
          {team.map((member, idx) => {
            const total = team.length;
            let distance = Math.abs(idx - activeIdx);
            distance = Math.min(distance, total - distance); // handle looping

            let cardClass = "";
            let imgFilter = "";
            let textClass = "";
            let scale = "";
            let boxShadow = "";

            if (distance === 0) {
              cardClass = "bg-transparent text-white";
              imgFilter = "none";
              scale = "scale-105";
              textClass = "text-white";
              boxShadow = "0 10px 40px 0 rgba(114,84,255,0.36)";
            } else if (distance === 1) {
              cardClass = "bg-violet-900 bg-opacity-80 text-gray-200";
              imgFilter = "brightness(0.5) blur(2px)";
              scale = "scale-98";
              textClass = "text-gray-200";
              boxShadow = "0 6px 16px 0 rgba(114,84,255,0.13)";
            } else if (distance === 2) {
              cardClass = "bg-violet-900 bg-opacity-70 text-gray-400";
              imgFilter = "brightness(0.35) blur(3px)";
              scale = "scale-95";
              textClass = "text-gray-400";
              boxShadow = "0 4px 10px 0 rgba(114,84,255,0.08)";
            } else {
              cardClass = "bg-violet-900 bg-opacity-60 text-gray-500";
              imgFilter = "brightness(0.2) blur(10px)";
              scale = "scale-90";
              textClass = "text-gray-500";
              boxShadow = "0 2px 2px 0 rgba(114,84,255,0.03)";
            }

            return (
              <SwiperSlide
                key={idx}
                className="!w-[280px] sm:!w-[320px] flex justify-center items-center select-none"
              >
                <div
                  className={`rounded-2xl relative w-full min-h-[380px] shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-end ${cardClass} ${scale}`}
                  style={{ boxShadow }}
                >
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                    style={{ filter: imgFilter }}
                  />
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/90 to-transparent h-1/2 pointer-events-none" />
                  <div
                    className={`relative z-10 px-4 pb-6 flex flex-col items-center ${textClass}`}
                  >
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm mb-3">{member.role}</p>
                    <div className="flex gap-6">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} LinkedIn`}
                          className="hover:text-sky-400 text-xl"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} Instagram`}
                          className="hover:text-pink-500 text-xl"
                        >
                          <FaInstagram />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        {/* Show More Button */}
        {onLearnMore && (
          <div className="mt-12 flex justify-center">
            <Button variant="primary" onClick={onLearnMore}>
              Show More
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
