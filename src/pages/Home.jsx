import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Hero from '../components/Home/Hero';
import About from '../components/Home/About';
import Workshop from '../components/Home/Workshop';
import Team from '../components/Home/Team';

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  // Container styling to keep consistent
  const containerClasses = "max-w-7xl mx-auto px-4 md:px-8";

  // Scroll helper
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // On mount or on location change, scroll to section if hash exists
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      // Timeout to ensure DOM is rendered before scrolling
      setTimeout(() => {
        scrollToSection(id);
      }, 100);
    }
  }, [location]);

  // Handler for "Learn More" buttons in each section
  const handleLearnMore = (path) => {
    navigate(path);
  };

  return (
    <>
      <div className={containerClasses}>
        {/* Hero section */}
        <Hero onLearnMore={() => handleLearnMore('/quiz')}/>

        {/* About section */}
        <section id="about-us" className="scroll-mt-20">
          <About onLearnMore={() => handleLearnMore('/about')} />
        </section>
      </div>

      {/* Workshop section - full width */}
      <section id="workshops" className="scroll-mt-20">
        <Workshop onLearnMore={() => handleLearnMore('/workshop')} />
      </section>

      <div className={containerClasses}>
        {/* Team section */}
        <section id="teams" className="scroll-mt-20">
          <Team onLearnMore={() => handleLearnMore('/teams')} />
        </section>
      </div>
    </>
  );
}

export default Home;
