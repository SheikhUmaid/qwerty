import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import
import Button from '../Button'; // Reusable Button component

// The slides data; you can keep this here or move to parent as needed
const slides = [
  {
    title: 'Workshop - name',
    description:
      '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."',
    image:
      'https://images.unsplash.com/photo-1542744095-291d1f67b221?q=80&w=2070&auto=format&fit=crop',
  },
  {
    title: 'Digital Marketing Mastery',
    description:
      '"Unlock the secrets to online growth and brand visibility with our expert-led sessions."',
    image:
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2130&auto=format&fit=crop',
  },
  {
    title: 'Leadership & Management',
    description:
      '"Cultivate the skills to inspire your team and drive projects to successful completion."',
    image:
      'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop',
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
