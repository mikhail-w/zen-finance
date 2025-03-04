'use client';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoAnimationComplete, setIsLogoAnimationComplete] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navRef = useRef(null);
  const router = useRouter();

  // Menu items data
  const menuItems = [
    { label: 'Features', href: '#section--1', id: 'features' },
    { label: 'Operations', href: '#section--2', id: 'operations' },
    { label: 'Testimonials', href: '#section--3', id: 'testimonials' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initial call to set correct state
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Start the logo animation on component mount
    const logoAnimationTimeout = setTimeout(() => {
      setIsLogoAnimationComplete(true);
    }, 2000); // 2 seconds for 2 full rotations

    // Show text earlier, after a shorter delay
    const textAnimationTimeout = setTimeout(() => {
      setShowText(true);
    }, 1000); // Show text after 1 second instead of waiting for full logo animation

    return () => {
      clearTimeout(logoAnimationTimeout);
      clearTimeout(textAnimationTimeout);
    };
  }, []);

  useEffect(() => {
    // Set initial window width
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);

      // Add resize listener
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle link hover effect
  const handleLinkHover = id => {
    setHoveredLink(id);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Handle smooth scrolling
  const handleNavClick = (e, href) => {
    e.preventDefault();

    if (href && href !== '#') {
      const section = document.querySelector(href);
      if (section) {
        // Get the navbar height
        const navbarHeight = navRef.current.offsetHeight;

        // Get the position of the section relative to the top of the document
        const sectionPosition =
          section.getBoundingClientRect().top + window.pageYOffset;

        // Calculate the final scroll position, accounting for navbar height and adding some padding
        const offsetPosition = sectionPosition - navbarHeight;

        // Scroll to the calculated position
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  // Check if we're on mobile (less than 768px - md breakpoint)
  const isMobile = windowWidth < 768;

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out h-[90px]
        ${isScrolled ? 'bg-white/95 shadow-md' : 'bg-[#f3f3f3]'}
        px-6 md:px-12 lg:px-24
        flex justify-between items-center
      `}
      ref={navRef}
    >
      {/* Logo and Brand Name */}
      <div className="flex items-center">
        <div
          className="relative flex items-center justify-center w-[40px] h-[40px] cursor-pointer transition-opacity duration-300"
          onMouseEnter={() => setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered(false)}
          onClick={scrollToTop}
          style={{ opacity: hoveredLink ? '0.5' : '1' }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/img/logo.svg"
              alt="Zen Finance logo"
              width={40}
              height={40}
              className="transition-all duration-1000"
              style={{
                animation:
                  !isLogoAnimationComplete ||
                  (isLogoHovered && isLogoAnimationComplete)
                    ? 'spin 2s ease-in-out 1'
                    : 'none',
                transformOrigin: '50% 55%',
              }}
              onAnimationEnd={() => setIsLogoAnimationComplete(true)}
            />
          </div>
        </div>
        <div
          className={`
            ml-3 text-3xl font-normal overflow-hidden
            ${showText ? 'w-auto opacity-100' : 'w-0 opacity-0'}
            transition-all duration-300 ease-in-out
          `}
          style={{
            transform: showText ? 'translateX(0)' : 'translateX(-20px)',
            opacity: hoveredLink ? '0.5' : '1',
          }}
        >
          <span className="relative inline-block">
            Zen
            <span
              className="absolute bottom-[0px] left-0 w-full"
              style={{
                height: '2px',
                backgroundColor: '#5ec576',
                animation: 'breath 4s ease-in-out infinite',
              }}
            ></span>
          </span>{' '}
          Finance
        </div>
      </div>

      {/* Desktop Navigation Links */}
      {!isMobile && (
        <div className="flex items-center">
          {menuItems.map(item => (
            <a
              key={item.id}
              href={item.href}
              className={`
                ml-8 lg:ml-16
                text-base md:text-[1.7rem] font-normal text-gray-800 no-underline
                transition-all duration-300 relative
                ${
                  hoveredLink && hoveredLink !== item.id
                    ? 'opacity-50'
                    : 'opacity-100'
                }
                hover:translate-y-[-3px]
              `}
              onMouseEnter={() => handleLinkHover(item.id)}
              onMouseLeave={() => handleLinkHover(null)}
              onClick={e => handleNavClick(e, item.href)}
            >
              {item.label}
              <span
                className={`
                absolute bottom-[-5px] left-0 w-full h-[2px] bg-[#5ec576]
                transition-transform duration-300 origin-left
                ${hoveredLink === item.id ? 'scale-x-100' : 'scale-x-0'}
                ${hoveredLink === item.id ? 'skew-x-[-15deg]' : 'skew-x-0'}
                ${
                  hoveredLink === item.id
                    ? 'bg-gradient-to-tl from-[#39b385] to-[#9be15d]'
                    : ''
                }
                opacity-70
              `}
              ></span>
            </a>
          ))}
          <Button
            variant="nav"
            size="lg"
            className={`
              ml-8 lg:ml-16 
              text-sm md:text-[1.7rem] rounded-3xl
              transition-all duration-300
              ${
                hoveredLink && hoveredLink !== 'account'
                  ? 'opacity-50'
                  : 'opacity-100'
              }
            `}
            onMouseEnter={() => handleLinkHover('account')}
            onMouseLeave={() => handleLinkHover(null)}
            onClick={() => router.push('/dashboard')}
          >
            Open account
          </Button>
        </div>
      )}

      {/* Mobile Hamburger Button */}
      {isMobile && (
        <button
          onClick={toggleMenu}
          type="button"
          className="inline-flex items-center p-2 w-12 h-12 justify-center text-gray-500 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
          aria-controls="navbar-menu"
          aria-expanded={isMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-10 h-10"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div
          className="absolute top-[90px] left-0 w-full bg-[#f3f3f3] shadow-md transition-all duration-300 ease-in-out z-40"
          id="navbar-menu"
        >
          <ul className="flex flex-col p-4">
            {menuItems.map(item => (
              <li key={item.id} className="my-2 py-2">
                <a
                  href={item.href}
                  className="text-xl font-normal text-inherit no-underline block px-3 py-2 transition-all duration-300 hover:bg-gray-100 hover:text-[#5ec576] rounded-lg relative"
                  onClick={e => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li className="my-2 py-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full text-xl"
                onClick={() => router.push('/dashboard')}
              >
                Open account
              </Button>
            </li>
          </ul>
        </div>
      )}

      {/* Add keyframe animations */}
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(720deg);
          }
        }

        @keyframes breath {
          0%,
          100% {
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </nav>
  );
}
