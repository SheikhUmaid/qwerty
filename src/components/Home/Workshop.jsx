import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import Button from '../Button';
import dataExplorer from '/images/workshops/home-workshop/data.png'
import unixShell from '/images/workshops/home-workshop/unix.png'
import figma from '/images/workshops/figma.jpg'

const slides = [
  {
    title: 'Data Explorer',
    description:
      '"A hands-on workshop on data analysis and visualization using tools like Tableau."',
    image:
      dataExplorer,
  },
  {
    title: 'Unix shell Programming',
    description:
      '"A practical workshop on Unix shell programming, mastering CLI, scripting fundamentals, and automation techniques."',
    image:
      unixShell,
  },
  {
    title: 'FigmaVerse',
    description:
      '"A practical workshop on UI/UX design covering design laws, Figma tools, and hands-on prototyping projects."',
    image:
     figma,
  },
];

const Workshop = ({ onLearnMore }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const navigate = useNavigate(); // Add this hook

  const handleLearnMore = () => {
    if (onLearnMore) {
      onLearnMore();
    } else {
      navigate('/workshop'); // Navigate to your workshop page
    }
  };

  return (
    // Section takes full viewport height, flex layout, white text, overflow-hidden
    <section className="relative flex h-screen w-full items-center overflow-hidden text-white">
      {/* Background images as fading slides */}
      <div className="absolute inset-0 z-10">
        {slides.map((slide, index) => (
          <div
            key={slide.title}
            className={`
              absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-black/80 before:to-transparent before:content-['']
              ${index === activeSlide ? 'opacity-100' : 'opacity-0'}
            `}
            style={{ backgroundImage: `url(${slide.image})` }}
          />
        ))}
      </div>

      {/* Content block with higher z-index */}
      <div className="relative z-20 w-full max-w-2xl px-8 md:pl-24">
        <h2 className="mb-4 text-4xl font-bold md:text-5xl">
          {slides[activeSlide].title}
        </h2>
        <p className="mb-8 text-lg leading-relaxed text-gray-200">
          {slides[activeSlide].description}
        </p>

        {/* "More Info" button with navigation */}
        <Button
          variant="primary"
          onClick={handleLearnMore} // Use the new handler
        >
          More Info
        </Button>
      </div>

      {/* Pagination controls */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 list-none gap-3">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`transition-all duration-300 ease-in-out ${
              index === activeSlide ? 'w-12' : 'w-8'
            }`}
          >
            <button
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-[6px] w-full cursor-pointer rounded-full transition-colors duration-300 ${
                index === activeSlide
                  ? 'bg-white'
                  : 'bg-white/40 hover:bg-white/70'
              }`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Workshop;
