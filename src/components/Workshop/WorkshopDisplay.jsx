import React, { useState } from 'react';
import codeCrunch from '/images/workshops/code.jpg';
import webDev from '/images/workshops/webDev.jpg';
import pythonDev from '/images/workshops/python.jpg';
import figmaVerse from '/images/workshops/figma.jpg';
import dataExplorer from '/images/workshops/data.jpg';
import JavaScript from '/images/workshops/javascript.jpg';
import unixShell from '/images/workshops/unix.jpg';
import pythonGame from '/images/workshops/pythonGame.jpg';
import career from '/images/workshops/career.jpg';



function WorkshopDisplay() {
  const workshops = {
    2020: [
      { title: "Code Crunch", img: codeCrunch, desc: "A hands-on workshop to master DSA concepts, problem-solving strategies, and coding efficiency in programming." },
      { title: "Frontend Web Development", img: webDev, desc: "The Frontend Web Development workshop covered HTML, CSS, and JavaScript fundamentals with practical projects." },
      { title: "Python Programming Bootcamp", img: pythonDev, desc: "A Python workshop covering basics to advanced concepts with hands-on projects for practical learning." },
    ],
    2021: [
      { title: "FigmaVerse", img: figmaVerse, desc: "A practical workshop on UI/UX design covering design laws, Figma tools, and hands-on prototyping projects." },
      { title: "Data Explorer", img: dataExplorer, desc: "A hands-on workshop on data analysis and visualization using tools like Tableau." },
      { title: "Java Script", img: JavaScript, desc: "A comprehensive JavaScript workshop covering core JS concepts, cookies, and backend essentials." },
    ],
    2022: [
      { title: "Unix Shell Programming ", img: unixShell, desc: "A practical workshop on Unix shell programming, mastering CLI, scripting fundamentals, and automation techniques." },
      { title: "Python Game Jam", img:pythonGame, desc: "A hands-on workshop on Python game development using basic Python concepts and the Tkinter library." },
      { title: "Bridging the Gap: Campus to Career", img:career, desc: "A career guidance session where alumni shared insights to bridge the gap between campus learning and professional careers." },
    ],
  };

  const years = Object.keys(workshops).map(Number);
  const [currentYear, setCurrentYear] = useState(2020);

  const handlePrev = () => {
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex > 0) setCurrentYear(years[currentIndex - 1]);
  };
  const handleNext = () => {
    const currentIndex = years.indexOf(currentYear);
    if (currentIndex < years.length - 1) setCurrentYear(years[currentIndex + 1]);
  };

  return (
    <div className="w-full flex justify-center items-center py-8">
      <div className="max-w-[90vw] w-full rounded-lg px-2 py-2">
        {/* Navigation */}
        <div className="flex justify-center items-center mb-8 gap-7">
          <button
            onClick={handlePrev}
            className={`px-4 py-2 rounded-md text-2xl bg-[#2f2c47] text-[#b3a6d9] hover:bg-[#5f54a1] transition disabled:opacity-50`}
            disabled={years.indexOf(currentYear) === 0}
          >
            &lt;
          </button>
          <h1 className="text-3xl font-semibold text-white font-inter">
            Workshops <span className="text-[#7E22CE]">{currentYear}</span>
          </h1>
          <button
            onClick={handleNext}
            className={`px-4 py-2 rounded-md text-2xl bg-[#2f2c47] text-[#b3a6d9] hover:bg-[#5f54a1] transition disabled:opacity-50`}
            disabled={years.indexOf(currentYear) === years.length - 1}
          >
            &gt;
          </button>
        </div>
        {/* Cards */}
        <div className="flex justify-center gap-10 items-stretch flex-wrap">
          {workshops[currentYear].map((workshop, index) => (
            <div
              key={index}
              className="rounded-lg p-5 flex flex-col items-center w-[400px] min-h-[440px] transition hover:scale-[1.012] duration-150 "
            >
              <div className="rounded-lg overflow-hidden w-full h-[220px] mb-6 flex justify-center items-center">
                <img
                  src={workshop.img}
                  alt={workshop.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="font-semibold text-2xl text-[#7E22CE] mb-2 text-center leading-tight">
                {workshop.title}
              </h2>
              <p className="text-gray-300 max-w-xs text-base mt-1 text-center">
                {workshop.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WorkshopDisplay;
