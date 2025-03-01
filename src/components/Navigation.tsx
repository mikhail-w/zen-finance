'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Navigation() {
  const [isSticky, setIsSticky] = useState(false);
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const nav = document.querySelector('.nav');
    if (nav) navRef.current = nav as HTMLElement;

    // Simple scroll event listener for sticky navigation
    const handleScroll = () => {
      if (window.scrollY > 0) {
        // Make sticky immediately when scrolling starts
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Check position on initial load
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handle navigation hover effect
  const handleHover = (
    e: React.MouseEvent<HTMLUListElement>,
    opacity: number,
    enter = false
  ) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('nav__link')) {
      const link = target;
      const siblings = link.closest('.nav')?.querySelectorAll('.nav__link');
      const logo = link.closest('.nav')?.querySelector('img');

      if (!link.classList.contains('nav__link--btn')) {
        if (enter) {
          link.classList.add('under_light');
        } else {
          link.classList.remove('under_light');
        }
      }

      siblings?.forEach(el => {
        if (el !== link) {
          (el as HTMLElement).style.opacity = opacity.toString();
        }
      });

      if (logo) {
        (logo as HTMLElement).style.opacity = opacity.toString();
      }
    }
  };

  // Handle smooth scrolling
  const handleNavClick = (e: React.MouseEvent<HTMLUListElement>) => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    if (target.classList.contains('nav__link')) {
      const id = target.getAttribute('href');
      if (id && id !== '#') {
        const section = document.querySelector(id);
        section?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`nav ${isSticky ? 'sticky' : ''}`} ref={navRef}>
      <Image
        src="/img/logo.png"
        alt="Zen Finance logo"
        className="nav__logo"
        id="logo"
        width={200}
        height={63}
        data-version-number="3.0"
      />
      <ul
        className="nav__links"
        onClick={handleNavClick}
        onMouseOver={e => handleHover(e, 0.5, true)}
        onMouseOut={e => handleHover(e, 1)}
      >
        <li className="nav__item">
          <a className="nav__link" href="#section--1">
            Features
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link" href="#section--2">
            Operations
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link" href="#section--3">
            Testimonials
          </a>
        </li>
        <li className="nav__item">
          <a className="nav__link nav__link--btn btn--show-modal" href="#">
            Open account
          </a>
        </li>
      </ul>
    </nav>
  );
}
