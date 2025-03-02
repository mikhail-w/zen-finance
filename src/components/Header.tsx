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

    // Define animateHeaderText variable first
    const animateHeaderText = () => {
      const h1Text = document.querySelector('h1');
      const highlights = document.querySelectorAll('.highlight');
      const fadeInElements = document.querySelectorAll('.fade-in');
      const fadeInLateElements = document.querySelectorAll('.fade-in-late');
      const heroImage = document.querySelector('.slide-in-right');

      // Step 1: Make the entire h1 visible at once
      if (h1Text) {
        h1Text.classList.add('visible');
      }

      // Step 2: Show the image
      setTimeout(() => {
        // Start the image animation
        if (heroImage) {
          heroImage.classList.add('start-slide');
        }

        // Step 3: Apply the highlight effect one after another
        setTimeout(() => {
          // Apply the highlight effect to each highlighted text sequentially
          highlights.forEach((highlight, index) => {
            setTimeout(() => {
              highlight.classList.add('animate-highlight');
            }, index * 300);
          });

          // Step 4: After all highlighting is done, show the fade-in elements
          const lastHighlightDelay = highlights.length * 300;
          setTimeout(() => {
            fadeInElements.forEach(el => {
              el.style.animationDelay = '0s';
              el.classList.add('start-animation');
            });

            // Slightly later for fade-in-late elements
            fadeInLateElements.forEach(el => {
              el.style.animationDelay = '0.3s';
              el.classList.add('start-animation');
            });
          }, 300 + lastHighlightDelay);
        }, 1000); // Delay after image starts appearing
      }, 400); // Delay after h1 text appears
    };

    // Start the entire sequence after a short delay
    setTimeout(animateHeaderText, 300);

    return () => {
      btnScrollTo?.removeEventListener('click', scrollToSection1);
    };
  }, []);

  return (
    <header className="px-12 pt-[100px] h-screen flex flex-col items-center">
      <div className="flex-1 max-w-[150rem] w-full grid grid-cols-[45%_55%] gap-16 content-start justify-center items-center justify-items-start px-8 pt-[100px]">
        <div className="max-w-[90%]">
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
        <div className="w-full h-auto justify-self-center self-center -mt-[100px] col-start-2 col-end-3">
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
