'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  return (
    <nav
      className={`
        fixed top-0 left-0 flex justify-between items-center h-[90px] w-full px-24 z-50
        transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-[#f3f3f3] shadow-md' : 'bg-[#f3f3f3]'}
      `}
    >
      <Image
        src="/img/logo.png"
        alt="Zen Finance logo"
        width={180}
        height={45}
        className="h-[4.5rem] w-auto transition-all duration-300"
      />
      <ul className="flex items-center list-none">
        <li className="ml-16">
          <Link
            href="#section--1"
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
            Features
          </Link>
        </li>
        <li className="ml-16">
          <Link
            href="#section--2"
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
            Operations
          </Link>
        </li>
        <li className="ml-16">
          <Link
            href="#section--3"
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
            Testimonials
          </Link>
        </li>
        <li className="ml-16">
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
        </li>
      </ul>
    </nav>
  );
}
