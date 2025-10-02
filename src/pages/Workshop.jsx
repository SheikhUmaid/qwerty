import React from "react";
import HeroSection from "../components/Workshop/HeroSection";
import FeaturedWorkshop from "../components/Workshop/FeaturedWorkshop";
import WorkshopDisplay from "../components/Workshop/WorkshopDisplay";

const Workshops = () => {
  return (
    <div className="relative">
      {/* Push hero section up behind navbar */}
      <div className="relative -mt-90">
        {/* adjust -mt value to match navbar height */}
        <HeroSection />
      </div>
      <FeaturedWorkshop />
      <WorkshopDisplay />
    </div>
  );
};

export default Workshops;
