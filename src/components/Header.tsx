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
    <header className="px-4 sm:px-6 md:px-8 lg:px-12 pt-20 sm:pt-24 md:pt-12 lg:pt-16 min-h-screen flex flex-col items-center justify-center">
      <div className="flex-1 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-center">
        {/* Image - On top for small screens, moved to the right for medium+ screens */}
        <div className="w-full order-first lg:order-last lg:justify-self-end mt-10 sm:mt-14 md:mt-10 lg:-mt-20">
          <div className="relative w-full max-w-[500px] mx-auto lg:max-w-full">
            <Image
              src="/img/hero.svg"
              alt="Hero Image"
              width={800}
              height={600}
              priority
              className={`w-full h-auto object-contain transition-all duration-2000 ease-in-out ${
                isVisible.image
                  ? 'opacity-100 translate-x-0'
                  : 'opacity-0 translate-x-8'
              }`}
            />
          </div>
        </div>

        {/* Text content - Below image on small screens, to the left on medium+ screens */}
        <div className="w-full max-w-full text-center lg:text-left order-last lg:order-first mt-6 lg:mt-0">
          <h1
            className={`transition-all duration-2000 text-5xl sm:text-5xl md:text-6xl lg:text-7.5xl font-light leading-tight ${
              isVisible.title
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-5'
            }`}
          >
            The art of{' '}
            <span className="relative inline-block">
              Finance
              <span
                className={`absolute bottom-0 left-[-5px] sm:left-[-8px] md:left-[-10px] lg:left-[-15px] h-full opacity-70 z-[-1] origin-bottom-left bg-gradient-primary transition-all duration-2000 ease-in-out ${
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
                className={`absolute bottom-0 left-[-5px] sm:left-[-8px] md:left-[-10px] lg:left-[-15px] h-full opacity-70 z-[-1] origin-bottom-left bg-gradient-primary transition-all duration-2000 ease-in-out ${
                  isVisible.highlight2 ? 'w-full' : 'w-0'
                }`}
                style={{ transform: 'scale(1.07, 1.05) skewX(-15deg)' }}
              ></span>
            </span>{' '}
            simplicity
          </h1>
          <h4
            className={`mt-4 sm:mt-6 md:mt-8 text-base sm:text-lg md:text-xl transition-all duration-1000 ${
              isVisible.fadeIn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
          >
            Financial clarity, without the complexity.
          </h4>
          <button
            className={`mt-4 inline-block bg-transparent text-[#5ec576] text-base sm:text-lg font-medium border-none border-b border-current pb-[2px] cursor-pointer transition-all duration-300 btn-scroll-to ${
              isVisible.fadeInLate
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            } hover:translate-y-[-3px] hover:scale-105`}
          >
            Learn more &#8595;
          </button>
        </div>
      </div>
    </header>
  );
}
