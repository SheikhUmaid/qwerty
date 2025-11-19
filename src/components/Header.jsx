import React from 'react';
import collegeLogo from '../assets/collegelogo.png';
import qLogo from '../assets/q-logo.png';

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between px-6 py-4 bg-transparent z-50">
      {/* Left Logo */}
      <div className="flex-shrink-0">
        <img src={collegeLogo} alt="College Logo" className="h-12 md:h-14 w-auto" />
      </div>

      {/* College Name */}
      <div className="flex-1 text-center px-4">
        <p className="m-0 font-jockeyone text-xs sm:text-sm md:text-base uppercase font-normal leading-[1.1] tracking-wider">
          Shri Dharmasthala Manjunatheshwara College of
        </p>
        <p className="m-0 font-jockeyone text-xs sm:text-sm md:text-base uppercase font-normal leading-[1.1] tracking-wider">
          Engineering & Technology, Dharwad
        </p>
      </div>

      {/* Right Logo */}
      <div className="flex-shrink-0">
        <img src={qLogo} alt="Q Logo" className="h-10 md:h-12 w-auto" />
      </div>
    </header>
  );
};

export default Header;
