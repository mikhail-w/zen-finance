'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Header() {
  const [isVisible, setIsVisible] = useState({
    title: false,
    image: false,
    highlight1: false,
    highlight2: false,
    fadeIn: false,
    fadeInLate: false,
  });

  useEffect(() => {
    const btnScrollTo = document.querySelector('.btn-scroll-to');
    const section1 = document.querySelector('#section--1');

    const scrollToSection1 = (e: Event) => {
      e.preventDefault();
      section1?.scrollIntoView({ behavior: 'smooth' });
    };

    btnScrollTo?.addEventListener('click', scrollToSection1);

    // Animate elements with a sequence
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, title: true }));

      setTimeout(() => {
        setIsVisible(prev => ({ ...prev, image: true }));

        setTimeout(() => {
          setIsVisible(prev => ({ ...prev, highlight1: true }));

          setTimeout(() => {
            setIsVisible(prev => ({ ...prev, highlight2: true }));

            setTimeout(() => {
              setIsVisible(prev => ({
                ...prev,
                fadeIn: true,
                fadeInLate: true,
              }));
            }, 300);
          }, 1000);
        }, 1000);
      }, 800);
    }, 300);

    return () => {
      btnScrollTo?.removeEventListener('click', scrollToSection1);
    };
  }, []);

  return (
    <header className="px-4 sm:px-8 md:px-12 pt-12 sm:pt-[100px] min-h-screen flex flex-col items-center justify-center overflow-y-auto">
      <div className="flex-1 w-full max-w-[150rem] grid grid-cols-1 md:grid-cols-[50%_50%] gap-8 md:gap-16 content-center justify-center items-center justify-items-center py-8 sm:py-[50px] px-6 sm:px-10 ">
        {/* Image - On top for small screens, moved to the right for medium+ screens */}
        <div className="w-full max-w-full order-first md:order-last md:max-w-5xl mx-auto -mt-8 sm:-mt-16 md:-mt-[124px] md:col-start-2 md:col-end-3 block">
          <Image
            src="/img/hero.svg"
            alt="Minimalist items"
            width={800}
            height={600}
            priority
            className={`w-full h-auto object-contain transition-all duration-2000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isVisible.image
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-[30px]'
            }`}
          />
        </div>

        {/* Text content - Below image on small screens, to the left on medium+ screens */}
        <div className="w-full max-w-[90%] text-center md:text-left order-last md:order-first">
          <h1
            className={`transition-all duration-2000 text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl ${
              isVisible.title
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[20px]'
            }`}
          >
            The art of{' '}
            <span className="relative inline-block">
              Finance
              <span
                className={`absolute bottom-0 left-[-10px] sm:left-[-10px] md:left-[-10px] lg:left-[-20px]  h-full opacity-70 z-[-1] origin-bottom-left bg-gradient-primary transition-all duration-2000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isVisible.highlight1 ? 'w-full' : 'w-0'
                }`}
                style={{ transform: 'scale(1.07, 1.05) skewX(-15deg)' }}
              ></span>
            </span>
            <br />
            with{' '}
            <span className="relative inline-block">
              Effortless
              <span
                className={`absolute bottom-0 left-[-10px] sm:left-[-10px] md:left-[-10px] lg:left-[-20px] h-full opacity-70 z-[-1] origin-bottom-left bg-gradient-primary transition-all duration-2000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isVisible.highlight2 ? 'w-full' : 'w-0'
                }`}
                style={{ transform: 'scale(1.07, 1.05) skewX(-15deg)' }}
              ></span>
            </span>{' '}
            simplicity
          </h1>
          <h4
            className={`mt-4 text-base sm:text-lg md:text-2xl transition-all duration-1000 ${
              isVisible.fadeIn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[10px]'
            }`}
          >
            Financial clarity, without the complexity.
          </h4>
          <button
            className={`mt-4 inline-block bg-transparent text-base sm:text-lg md:text-xl font-medium text-primary border-none border-b border-current pb-[2px] cursor-pointer transition-all duration-300 btn-scroll-to ${
              isVisible.fadeInLate
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[10px]'
            }`}
          >
            Learn more &#8595;
          </button>
        </div>
      </div>
    </header>
  );
}
