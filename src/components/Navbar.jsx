import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef(null);
  const navItemsRef = useRef([]);
  const sliderRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = ['Home', 'About Us', 'Workshop', 'Team', 'Contact Us'];

  const navigate = useNavigate();
  const location = useLocation();

  const linkConfig = {
    Home: { path: '/', sectionId: null },
    'About Us': { path: '/about', sectionId: 'about-us' },   
    Team: { path: '/teams', sectionId: 'teams' },
    Workshop: { path: '/workshop', sectionId: 'workshops' },
    'Contact Us': { path: '/contact', sectionId: null },
  };

  // Handle window resize with debounce
  useEffect(() => {
    let timeoutId;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);
        
        // Close mobile menu when switching to desktop
        if (!mobile && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        
        // Recalculate slider position on desktop
        if (!mobile && activeLink) {
          updateSliderPosition();
        }
      }, 150);
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen, activeLink]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Function to update slider position
  const updateSliderPosition = () => {
    if (isMobile) return;

    if (!activeLink) {
      const sliderElement = sliderRef.current;
      if (sliderElement) {
        sliderElement.style.width = '0px';
      }
      return;
    }

    const activeItemIndex = navItems.findIndex(item => item === activeLink);
    const activeItemElement = navItemsRef.current[activeItemIndex];
    const sliderElement = sliderRef.current;

    if (activeItemElement && sliderElement && activeItemIndex !== -1) {
      const { offsetWidth, offsetLeft } = activeItemElement;
      sliderElement.style.width = `${offsetWidth}px`;
      sliderElement.style.transform = `translateX(${offsetLeft}px)`;
    }
  };

  // Sliding animation for desktop active nav item
  useEffect(() => {
    updateSliderPosition();
  }, [activeLink, location, isMobile]);

  // Update active link based on URL path and hash
  useEffect(() => {
    if (location.pathname === '/') {
      if (location.hash) {
        const hashId = location.hash.replace('#', '');
        const matchedItem = Object.entries(linkConfig).find(
          ([, val]) => val.sectionId === hashId
        );
        if (matchedItem) {
          setActiveLink(matchedItem[0]);
          return;
        }
      }
      setActiveLink('Home');
    } else {
      switch (location.pathname) {
        case '/contact': 
          setActiveLink('Contact Us'); 
          break;
        case '/about': 
          setActiveLink('About Us'); 
          break;
        case '/workshop': 
          setActiveLink('Workshop'); 
          break;
        case '/teams': 
          setActiveLink('Team'); 
          break;
        case '/quiz':
          setActiveLink(null); 
          break;
        default: 
          setActiveLink(null); 
          break;
      }
    }
  }, [location]);

  // Scroll listener for landing page to update active link on scroll
  useEffect(() => {
    if (location.pathname !== '/') return;

    const handleScroll = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      const navHeight = navRef.current ? navRef.current.offsetHeight : 0;
      const buffer = navHeight + 50;

      const sections = Object.entries(linkConfig)
        .filter(([, val]) => val.sectionId)
        .map(([key, val]) => {
          const el = document.getElementById(val.sectionId);
          return el ? { key, offsetTop: el.offsetTop } : null;
        })
        .filter(Boolean)
        .sort((a, b) => a.offsetTop - b.offsetTop);

      let currentActive = 'Home';

      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPos + buffer >= sections[i].offsetTop) {
          currentActive = sections[i].key;
          break;
        }
      }

      setActiveLink(prevActiveLink => {
        if (prevActiveLink !== currentActive) {
          const newPath = currentActive === 'Home'
            ? '/'
            : `/#${linkConfig[currentActive].sectionId}`;
          window.history.replaceState(null, '', newPath);
          return currentActive;
        }
        return prevActiveLink;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location.pathname]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el && navRef.current) {
      const navHeight = navRef.current.offsetHeight;
      const scrollToPosition = el.getBoundingClientRect().top + window.scrollY - navHeight - 20;
      window.scrollTo({
        top: scrollToPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleClick = (item) => {
    const config = linkConfig[item];
    if (!config) return;

    setIsMobileMenuOpen(false);

    // Home navigation - always go to root
    if (item === 'Home') {
      if (location.pathname === '/' && !location.hash) {
        // Already on home, scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Navigate to home and scroll to top
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
      return;
    }

    // For other navigation items
    if (location.pathname === '/') {
      // On landing page
      if (config.sectionId) {
        // Has a section, scroll to it
        scrollToSection(config.sectionId);
      } else if (config.path && config.path !== '/') {
        // No section but has a path, navigate
        navigate(config.path);
      }
    } else {
      // On other pages, navigate to the designated path
      if (config.path && config.path !== '/') {
        navigate(config.path);
      } else if (config.sectionId) {
        // Navigate to home with hash
        navigate(`/#${config.sectionId}`);
      } else {
        navigate('/');
      }
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav ref={navRef} className="sticky top-[15px] z-50 mt-4 mb-16 h-12 flex items-center">
        {/* Desktop Navigation (Centered) */}
        <div className="hidden md:flex justify-center w-full">
          <ul className="relative flex items-center justify-center gap-4 rounded-full border border-white/20 bg-[rgba(30,10,50,0.5)] p-1.5 backdrop-blur-[5px]">
            <span
              ref={sliderRef}
              className="absolute left-0 top-1.5 bottom-1.5 rounded-full bg-white transition-all duration-500 ease-in-out"
            />
            {navItems.map((item, index) => (
              <li key={item} ref={el => navItemsRef.current[index] = el} className="z-10">
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(item);
                  }}
                  className={`block rounded-full px-6 py-2 font-medium transition-colors duration-500 ${activeLink === item ? 'text-black' : 'text-white hover:text-white/80'}`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Button (Right-aligned) */}
        <div className="md:hidden flex-1 flex justify-end pr-4">
          <button
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 bg-[rgba(30,10,50,0.5)] backdrop-blur-[5px] text-white hover:text-white/80 transition-colors duration-300"
          >
            <div className="w-6 h-5 flex flex-col justify-between items-center">
              <span 
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen 
                    ? 'rotate-45 translate-y-2' 
                    : 'rotate-0 translate-y-0'
                }`} 
              />
              <span 
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen 
                    ? 'opacity-0 scale-0' 
                    : 'opacity-100 scale-100'
                }`} 
              />
              <span 
                className={`block w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen 
                    ? '-rotate-45 -translate-y-2' 
                    : 'rotate-0 translate-y-0'
                }`} 
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            className="absolute top-24 left-4 right-4 bg-[rgba(30,10,50,0.95)] backdrop-blur-[10px] rounded-2xl border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-300"
          >
            <ul className="p-2">
              {navItems.map((item, index) => (
                <li key={item}>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(item);
                    }}
                    className={`block w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 text-center ${
                      activeLink === item 
                        ? 'bg-white text-black shadow-lg' 
                        : 'text-white hover:bg-white/10'
                    } ${index < navItems.length - 1 ? 'mb-1' : ''}`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;