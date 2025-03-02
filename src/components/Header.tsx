'use client';
import { useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  useEffect(() => {
    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');
    const scrollToSection1 = (e: Event) => {
      e.preventDefault();
      section1?.scrollIntoView({ behavior: 'smooth' });
    };
    btnScrollTo?.addEventListener('click', scrollToSection1);

    // Text animation for highlighted words
    const animateHighlights = () => {
      const highlights = document.querySelectorAll('.highlight');
      highlights.forEach((highlight, index) => {
        // Add animation class with a delay based on index
        setTimeout(() => {
          highlight.classList.add('animate-highlight');
        }, index * 600);
      });
    };

    // Start animation after a short delay
    setTimeout(animateHighlights, 300);

    return () => {
      btnScrollTo?.removeEventListener('click', scrollToSection1);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__title">
        <div className="text-content">
          <h1>
            The art of <span className="highlight">Finance</span>
            <br />
            with <span className="highlight">Effortless</span> simplicity
          </h1>
          <h4 className="fade-in">
            Financial clarity, without the complexity.
          </h4>
          <button className="btn--text btn--scroll-to fade-in-late">
            Learn more &#8595;
          </button>
        </div>

        <div className="header__img">
          <Image
            src="/img/hero.svg"
            alt="Minimalist items"
            width={800}
            height={600}
            priority
            className="object-contain slide-in-right"
          />
        </div>
      </div>
    </header>
  );
}
