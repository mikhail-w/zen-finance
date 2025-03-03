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
          }, 300);
        }, 1000);
      }, 400);
    }, 300);

    return () => {
      btnScrollTo?.removeEventListener('click', scrollToSection1);
    };
  }, []);

  return (
    <header className="px-12 pt-[100px] h-screen flex flex-col items-center">
      <div className="flex-1 max-w-[150rem] w-full grid grid-cols-[45%_55%] gap-16 content-start justify-center items-center justify-items-start px-8 pt-[100px]">
        <div className="max-w-[90%]">
          <h1
            className={`transition-opacity duration-800 ${
              isVisible.title ? 'opacity-100' : 'opacity-0'
            }`}
          >
            The art of{' '}
            <span className="relative inline-block">
              Finance
              <span
                className={`absolute bottom-0 left-[-20px] h-full opacity-70 z-[-1] origin-bottom-left bg-gradient-primary transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
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
                className={`absolute bottom-0 left-[-20px] h-full opacity-70 z-[-1] origin-bottom-left bg-gradient-primary transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isVisible.highlight2 ? 'w-full' : 'w-0'
                }`}
                style={{ transform: 'scale(1.07, 1.05) skewX(-15deg)' }}
              ></span>
            </span>{' '}
            simplicity
          </h1>
          <h4
            className={`transition-all duration-1000 ${
              isVisible.fadeIn
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[10px]'
            }`}
          >
            Financial clarity, without the complexity.
          </h4>
          <button
            className={`inline-block bg-transparent text-[1.7rem] font-medium text-primary border-none border-b border-current pb-[2px] cursor-pointer transition-all duration-300 btn-scroll-to ${
              isVisible.fadeInLate
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-[10px]'
            }`}
          >
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
            className={`object-contain transition-all duration-1200 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
              isVisible.image
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-[30px]'
            }`}
          />
        </div>
      </div>
    </header>
  );
}
