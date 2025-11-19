// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const navRef = useRef(null);
  const navItemsRef = useRef([]);
  const sliderRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const timeoutsRef = useRef([]);

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

  // Clear stored timeouts on unmount
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(id => clearTimeout(id));
      timeoutsRef.current = [];
    };
  }, []);

  // Debounced resize handler to track mobile vs desktop
  useEffect(() => {
    let timeoutId;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const mobile = window.innerWidth < 768;
        setIsMobile(mobile);

        if (!mobile && isMobileMenuOpen) {
          setIsMobileMenuOpen(false);
        }
        if (!mobile && activeLink) {
          updateSliderPosition();
        }
      }, 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobileMenuOpen, activeLink]);

  // Click outside to close mobile menu (ignore clicks on toggle button)
  useEffect(() => {
    const handleClickOutside = (event) => {
      const clickedInsideMenu = mobileMenuRef.current && mobileMenuRef.current.contains(event.target);
      const clickedToggleButton = toggleButtonRef.current && toggleButtonRef.current.contains(event.target);
      if (!clickedInsideMenu && !clickedToggleButton) {
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

  // After navigation: if on home (no hash) scroll to top
  useEffect(() => {
    if (location.pathname === '/' && !location.hash) {
      const id = setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 40);
      timeoutsRef.current.push(id);
    }
  }, [location.pathname, location.hash]);

  // Update active link slider position (desktop)
  const updateSliderPosition = () => {
    if (isMobile) return;
    if (!activeLink) {
      if (sliderRef.current) sliderRef.current.style.width = '0px';
      return;
    }

    const idx = navItems.findIndex(i => i === activeLink);
    const el = navItemsRef.current[idx];
    const slider = sliderRef.current;
    if (el && slider && idx !== -1) {
      slider.style.width = `${Math.round(el.offsetWidth)}px`;
      slider.style.transform = `translateX(${Math.round(el.offsetLeft)}px)`;
    }
  };

  useEffect(() => {
    updateSliderPosition();
    const t = setTimeout(updateSliderPosition, 120);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeLink, location, isMobile]);

  // Update active link based on URL path and hash
  useEffect(() => {
    if (location.pathname === '/') {
      if (location.hash) {
        const hashId = location.hash.replace('#', '');
        const matched = Object.entries(linkConfig).find(([, v]) => v.sectionId === hashId);
        if (matched) {
          setActiveLink(matched[0]);
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

  // Landing page scroll listener to set active link by section
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

      setActiveLink(prev => {
        if (prev !== currentActive) {
          const newPath = currentActive === 'Home' ? '/' : `/#${linkConfig[currentActive].sectionId}`;
          window.history.replaceState(null, '', newPath);
          return currentActive;
        }
        return prev;
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
      window.scrollTo({ top: scrollToPosition, behavior: 'smooth' });
    }
  };

  // Navigation click handler
  const handleClick = (item) => {
    const config = linkConfig[item];
    if (!config) return;

    setIsMobileMenuOpen(false);

    if (item === 'Home') {
      if (location.pathname === '/' && !location.hash) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 100);
      }
      return;
    }

    if (location.pathname === '/') {
      if (config.sectionId) {
        scrollToSection(config.sectionId);
      } else if (config.path && config.path !== '/') {
        navigate(config.path);
      }
    } else {
      if (config.path && config.path !== '/') {
        navigate(config.path);
      } else if (config.sectionId) {
        navigate(`/#${config.sectionId}`);
      } else {
        navigate('/');
      }
    }
  };

  const toggleMobileMenu = () => setIsMobileMenuOpen(prev => !prev);

  return (
    <>
      <nav ref={navRef} className="sticky top-[15px] z-50 mt-4 mb-16 h-12 flex items-center">
        {/* Desktop Navigation */}
        <div className="hidden md:flex justify-center w-full">
          <ul className="relative flex items-center justify-center gap-4 rounded-full border border-white/20 bg-[rgba(30,10,50,0.5)] p-1.5 backdrop-blur-[5px]">
            <span
              ref={sliderRef}
              className="absolute left-0 top-1.5 bottom-1.5 rounded-full bg-white transition-all duration-500 ease-in-out"
              style={{ width: 0, pointerEvents: 'none', zIndex: 0 }}
              aria-hidden
            />
            {navItems.map((item, index) => (
              <li key={item} ref={el => (navItemsRef.current[index] = el)} className="z-10">
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); handleClick(item); }}
                  className={`block rounded-full px-6 py-2 font-medium transition-colors duration-500 ${
                    activeLink === item ? 'text-black' : 'text-white hover:text-white/80'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex-1 flex justify-end pr-4 relative z-50">
          <button
            ref={toggleButtonRef}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            className="flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 
                  bg-[rgba(30,10,50,0.5)] backdrop-blur-[5px] text-white 
                  hover:text-white/80 transition-colors duration-300"
          >
            {isMobileMenuOpen ? (
              <HiOutlineX className="w-6 h-6" />
            ) : (
              <HiOutlineMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {/* overlay z is lower than the toggle button (so the button won't be covered) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div
            ref={mobileMenuRef}
            className="absolute top-36 left-4 right-4 bg-[rgba(30,10,50,0.95)] backdrop-blur-[10px] rounded-2xl border border-white/20 shadow-2xl animate-in fade-in slide-in-from-top-5 duration-300"
            style={{ zIndex: 40 }}
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
                    className={`block w-full px-6 py-4 rounded-xl font-medium transition-all duration-300 text-center
                      ${item === 'Home' ? 'mt-6' : ''}
                      ${activeLink === item
                        ? 'bg-white text-black shadow-lg'
                        : 'text-white hover:bg-white/10'}
                      ${index < navItems.length - 1 ? 'mb-1' : ''}`}
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
