'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoAnimationComplete, setIsLogoAnimationComplete] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  // Menu items data
  const menuItems = [
    { label: 'Features', href: '#section--1' },
    { label: 'Operations', href: '#section--2' },
    { label: 'Testimonials', href: '#section--3' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
    setWindowWidth(window.innerWidth);

    // Add resize listener
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if we're on mobile (less than 768px - md breakpoint)
  const isMobile = windowWidth < 768;

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300 ease-in-out h-[90px]
        ${isScrolled ? 'bg-[#f3f3f3] shadow-md' : 'bg-[#f3f3f3]'}
        px-6 md:px-12 lg:px-24
      `}
    >
      <div className="h-full w-full flex justify-between items-center">
        {/* Logo and Brand Name */}
        <div className="flex items-center">
          <div
            className="relative flex items-center justify-center w-[40px] h-[40px] cursor-pointer"
            onMouseEnter={() => setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <Image
                src="/img/logo.svg"
                alt="Zen Finance logo"
                width={40}
                height={40}
                className={`
                  transition-all duration-1000
                  ${!isLogoAnimationComplete ? 'animate-spin-twice' : ''}
                  ${
                    isLogoHovered && isLogoAnimationComplete
                      ? 'animate-spin-twice'
                      : ''
                  }
                `}
                style={{
                  animationDuration: '2s',
                  animationIterationCount: '1',
                  animationTimingFunction: 'ease-in-out',
                  transformOrigin: '50% 55%',
                  cursor: 'pointer',
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
            }}
          >
            Zen Finance
          </div>
        </div>

        {/* Desktop Navigation Links - using inline style instead of hidden class */}
        <div
          style={{ display: isMobile ? 'none' : 'flex' }}
          className="items-center "
        >
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="
    ml-8 lg:ml-16
    text-base md:text-[1.7rem] font-normal text-gray-800 no-underline
    transition-transform duration-300 relative
    after:content-[''] after:absolute after:bottom-[-10px] after:left-0
    after:h-[2px] after:w-0 after:bg-[#5ec576]
    after:transition-all after:duration-300
    hover:after:w-full
    hover:translate-y-[-3px] hover:scale-105
    will-change-transform transform-origin-center
  "
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="#"
            className="
              ml-8 lg:ml-16
              text-sm md:text-[1.7rem] font-normal py-4 px-4 lg:px-10 rounded-3xl
              bg-[#5ec576] text-[#222]
              transition-all duration-300
              hover:bg-[#4bbb7d] hover:shadow-md
              transform hover:-translate-y-[4px]
            "
          >
            Open account
          </Link>
        </div>

        {/* Mobile Hamburger Button - using inline style instead of hidden class */}
        <button
          onClick={toggleMenu}
          type="button"
          style={{ display: isMobile ? 'inline-flex' : 'none' }}
          className="items-center p-2 w-12 h-12 justify-center text-gray-500 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
      </div>

      {/* Mobile Menu - using conditional rendering instead of hidden class */}
      {isMenuOpen && isMobile && (
        <div
          className="
            absolute top-[90px] left-0 w-full bg-[#f3f3f3] shadow-md
            transition-all duration-300 ease-in-out z-40
          "
          id="navbar-menu"
        >
          <ul className="flex flex-col p-4">
            {menuItems.map((item, index) => (
              <li key={index} className="my-2 py-2">
                <Link
                  href={item.href}
                  className="
                    text-xl font-normal text-inherit no-underline block px-3 py-2
                    transition-all duration-300
                    hover:bg-gray-100 hover:text-primary rounded-lg
                  "
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="my-2 py-2">
              <Link
                href="#"
                className="
                  text-xl font-normal block px-3 py-2 rounded-lg
                  bg-[#5ec576] text-[#222] text-center mx-2
                  transition-all duration-300
                  hover:bg-[#4bbb7d] hover:shadow-md
                "
                onClick={() => setIsMenuOpen(false)}
              >
                Open account
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
