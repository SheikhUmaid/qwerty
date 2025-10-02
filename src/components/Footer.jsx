import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  // Navigate on link click and prevent page reload
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="w-full bg-[#04010a] pt-16 pb-8 px-8 mt-16 border-t border-gray-700">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-8 mb-12">

        <div className="flex-1 min-w-[220px]">
          <h3 className="text-3xl font-bold mb-4">Qwerty.i/o</h3>
          <div className="flex gap-6">
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-300 text-2xl transition-all duration-300 hover:text-white hover:scale-125"
            >
              <FaInstagram />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-gray-300 text-2xl transition-all duration-300 hover:text-white hover:scale-125"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              aria-label="Website"
              className="text-gray-300 text-2xl transition-all duration-300 hover:text-white hover:scale-125"
            >
              <FaGlobe />
            </a>
          </div>
        </div>

        <div className="flex-1 min-w-[220px]">
          <h4 className="text-lg font-semibold text-gray-200 mb-6">Extra links</h4>
          <ul>
            <li className="mb-3">
              <button
                onClick={() => handleNavigation('/')}
                className="text-gray-300 capitalize transition-colors duration-300 hover:text-white"
              >
                Home
              </button>
            </li>
            <li className="mb-3">
              <button
                onClick={() => handleNavigation('/teams')}
                className="text-gray-300 capitalize transition-colors duration-300 hover:text-white"
              >
                Team
              </button>
            </li>
            <li className="mb-3">
              <button
                onClick={() => handleNavigation('/workshop')}
                className="text-gray-300 capitalize transition-colors duration-300 hover:text-white"
              >
                Workshop
              </button>
            </li>
            <li className="mb-3">
              <button
                onClick={() => handleNavigation('/about')}
                className="text-gray-300 capitalize transition-colors duration-300 hover:text-white"
              >
                About Us
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-1 min-w-[220px]">
          <h4 className="text-lg font-semibold text-gray-200 mb-6">Contact us</h4>
          <p className="text-gray-300 mb-2">Aditya P S -- +91 8277345645</p>
          <p className="text-gray-300 mb-2">Keerti Shanbhag -- +91 9008033415</p>
          <p className="text-gray-300">Email: qwertyio.sdm@gmail.com</p>
        </div>
      </div>

      <div className="text-center text-sm text-gray-400 pt-8 border-t border-gray-800">
        <p>© {new Date().getFullYear()} Qwerty.i/o. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
