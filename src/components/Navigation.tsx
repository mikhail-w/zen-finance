'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLogoAnimationComplete, setIsLogoAnimationComplete] = useState(false);
  const [showText, setShowText] = useState(false);

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

  return (
    <nav
      className={`
        fixed top-0 left-0 flex justify-between items-center h-[90px] w-full px-24 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-[#f3f3f3] shadow-md' : 'bg-[#f3f3f3]'}
      `}
    >
      {/* Logo and Brand Name */}
      <div className="flex items-center">
        <div className="relative flex items-center justify-center w-[40px] h-[40px]">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src="/img/logo.svg"
              alt="Zen Finance logo"
              width={40}
              height={40}
              className={`
                transition-all duration-1000
                ${isLogoAnimationComplete ? '' : 'animate-spin-twice'}
              `}
              style={{
                animationDuration: '2s',
                animationIterationCount: '1',
                animationTimingFunction: 'ease-in-out',
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
          }}
        >
          Zen Finance
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex items-center">
        <nav className="mr-8">
          <ul className="flex items-center list-none m-0 p-0">
            {menuItems.map((item, index) => (
              <li key={index} className="ml-16">
                <Link
                  href={item.href}
                  className="
                    text-[1.7rem] font-normal text-inherit no-underline block
                    transition-all duration-300 relative
                    hover:text-primary
                    after:content-[''] after:absolute after:bottom-0 after:left-0
                    after:h-[2px] after:w-0 after:bg-primary
                    after:transition-all after:duration-300
                    hover:after:w-full
                  "
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button */}
        <div className="ml-8">
          <Link
            href="#"
            className="
              text-[1.7rem] font-normal py-2 px-10 rounded-3xl
              bg-primary text-[#222]
              transition-all duration-300
              hover:bg-primary-darker hover:shadow-md
              transform hover:-translate-y-[2px]
            "
          >
            Open account
          </Link>
        </div>
      </div>
    </nav>
  );
}
