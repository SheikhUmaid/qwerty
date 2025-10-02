
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaGlobe } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <footer className="w-full bg-[#04010a] pt-12 pb-6 px-6 md:pt-16 md:pb-8 md:px-8 mt-16 border-t border-gray-700">
      {/* Main Footer Content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:flex-wrap justify-between gap-x-8 gap-y-10">
        
        {/* Brand Section */}
        <div className="flex-1 min-w-full md:min-w-[200px] text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">QWERTY.I/O</h3>
          <div className="flex justify-center md:justify-start gap-8 text-2xl">
            <a
              href="https://www.instagram.com/sdm.qwertyio"
              aria-label="Instagram"
              className="text-gray-300 transition-all duration-300 hover:text-[#E1306C] hover:scale-110"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/qwerty-i-o-66760627a/"
              aria-label="LinkedIn"
              className="text-gray-300 transition-all duration-300 hover:text-[#0077B5] hover:scale-110"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              aria-label="Website"
              className="text-gray-300 transition-all duration-300 hover:text-white hover:scale-110"
            >
              <FaGlobe />
            </a>
          </div>
        </div>

        {/* Extra Links */}
        <div className="flex-1 min-w-full md:min-w-[200px] text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-200 mb-5">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { name: 'Home', path: '/' },
              { name: 'Team', path: '/teams' },
              { name: 'Workshop', path: '/workshop' },
              { name: 'About Us', path: '/about' },
            ].map((item) => (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className="text-gray-300 text-base transition-colors duration-300 hover:text-white focus:outline-none focus:underline"
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div className="flex-1 min-w-full md:min-w-[200px] text-center md:text-left">
          <h4 className="text-lg font-semibold text-gray-200 mb-5">Contact Us</h4>
          <ul className="text-gray-300 text-sm space-y-2 leading-relaxed">
            <li>Aditya P S — <a href="tel:+918277345645" className="hover:underline">+91 8277345645</a></li>
            <li>Keerti Shanbhag — <a href="tel:+919008033415" className="hover:underline">+91 9008033415</a></li>
            <li>
              Email:{' '}
              <a
                href="mailto:qwertyio.sdm@gmail.com"
                className="hover:underline"
              >
                qwertyio.sdm@gmail.com
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="mt-10 pt-6 border-t border-gray-800 text-center text-xs sm:text-sm text-gray-400">
        <p>© {new Date().getFullYear()} QWERTY.I/O. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;