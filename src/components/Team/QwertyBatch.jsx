import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../Button';

const batches = [
  {
    year: '2022',
    title: 'QWERTY.I/O',
    description:
      'The 2022 batch organized impactful sessions including Bridging the Gap: Campus to Corporate, Unix Shell Programming and AI-focused workshops, engaging over 170+ participants. These initiatives helped students build technical skills, prepare for professional life and to stand out in the industrial tech-world.',
    image: 'images/QwertyBatch/2022.jpg',
    groupSize: '170+ participants',
  },
  {
    year: '2021',
    title: 'QWERTY.I/O',
    description:
      'The 2021 batch marked a period of expansion for QWERTY.I/O. With over 150 passionate participants, this batch introduced advanced workshops, hackathons, and collaborative coding projects, setting the stage for a vibrant and active tech community.',
    image: '/images/QwertyBatch/2021.jpg',
    groupSize: '150+ participants',
  },
  {
    year: '2020',
    title: 'QWERTY.I/O',
    description:
      'The 2020 batch focused on consolidating our technical foundations. With 120+ participants, the batch organized beginner-friendly coding sessions, mentorship programs, and small-scale competitions, building a strong community and fostering collaboration among members.',
    image: '/images/QwertyBatch/2020.jpg',
    groupSize: '120+ participants',
  },
  {
    year: '2019',
    title: 'QWERTY.I/O',
    description:
      'The inaugural 2019 batch laid the groundwork for QWERTY.I/O. Starting as a small group of 90 students, the batch introduced basic coding workshops, interactive learning sessions, and community meetups, establishing the clubs vision of empowering students with technical skills.',
    image: '/images/QwertyBatch/2019.jpg',
    groupSize: '90+ participants',
  },
];

const QwertyBatch = ({ onViewBatch }) => {
  const [activeBatch, setActiveBatch] = React.useState(0);
  const navigate = useNavigate();

  // const handleViewBatch = () => {
  //   if (onViewBatch) {
  //     onViewBatch(batches[activeBatch]);
  //   } else {
  //     navigate(`/batch/${batches[activeBatch].year}`);
  //   }
  // };

  return (
    <section className="flex w-full overflow-hidden h-[60vh] sm:h-[70vh] md:h-screen">
      {/* Purple Sidebar - Hidden on mobile */}
      <div className="relative hidden md:flex w-1/4 flex-col justify-between bg-gradient-to-br from-purple-600 to-purple-750 p-8 text-white">
        {/* Header */}
        <div>
          <h1 className="mb-2 text-6xl font-bold">
            {batches[activeBatch].title}
          </h1>
          <div className="mb-8 text-4xl font-light">
            {batches[activeBatch].year}
          </div>

          {/* Description */}
          <p className="mb-6 text-lg leading-relaxed opacity-90">
            {batches[activeBatch].description}
          </p>

          {/* Participant count */}
          <div className="mb-8">
            <span className="text-xs uppercase tracking-wide opacity-75">
              Batch Size
            </span>
            <div className="text-lg font-semibold">
              {batches[activeBatch].groupSize}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Full width on mobile */}
      <div className="relative flex-1 md:flex-1">
        {/* Background Image */}
        <div className="absolute inset-0">
          {batches.map((batch, index) => (
            <div
              key={batch.year}
              className={`
                absolute inset-0 transition-opacity duration-700 ease-in-out
                bg-cover bg-center sm:bg-contain sm:bg-no-repeat md:bg-cover lg:bg-cover
                before:absolute before:inset-0 before:bg-black/20 before:content-['']
                ${index === activeBatch ? 'opacity-100' : 'opacity-0'}
              `}
              style={{ backgroundImage: `url(${batch.image})` }}
            />
          ))}
        </div>

        {/* Content Overlay - Hidden on mobile */}
        <div className="relative z-10 hidden md:flex h-full items-center justify-center">
          <div className="text-center text-white">
            {/* <h2 className="mb-4 text-5xl font-light tracking-wide">
              group image of
            </h2>
            <h3 className="mb-8 text-6xl font-bold">respective batch</h3> */}

            {/* View Batch Button */}
            {/* <Button
              variant="primary"
              onClick={handleViewBatch}
              className="bg-white text-purple-800 hover:bg-gray-100"
            >
              View Batch Details
            </Button> */}
          </div>
        </div>

        {/* Year Navigation - Responsive positioning */}
        <div className="absolute right-4 md:right-8 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-2 md:gap-4">
          {batches.map((batch, index) => (
            <button
              key={batch.year}
              onClick={() => setActiveBatch(index)}
              className={`
                rounded-full px-3 py-1 md:px-4 md:py-2 text-xs md:text-sm font-semibold transition-all duration-300
                ${
                  index === activeBatch
                    ? 'bg-purple-600 text-white shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }
              `}
            >
              {batch.year}
            </button>
          ))}
        </div>

        {/* Bottom Pagination Dots - Only visible on mobile */}
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:hidden">
          {batches.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveBatch(index)}
              aria-label={`Go to batch ${batches[index].year}`}
              className={`
                h-3 w-3 rounded-full transition-all duration-300
                ${
                  index === activeBatch
                    ? 'bg-white scale-125'
                    : 'bg-white/50 hover:bg-white/80'
                }
              `}
            />
          ))}
        </div>

        {/* Mobile batch title overlay */}
        <div className="absolute bottom-16 sm:bottom-20 left-4 right-4 z-20 md:hidden">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white text-center mb-2">
            {batches[activeBatch].title}
          </h2>
          <p className="text-base sm:text-lg font-light text-white text-center">
            {batches[activeBatch].year}
          </p>
        </div>
      </div>
    </section>
  );
};

export default QwertyBatch;