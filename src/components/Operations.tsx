'use client';

import { useEffect, useState, useRef } from 'react';

export default function Operations() {
  const [activeTab, setActiveTab] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleTabClick = (tabNum: number) => {
    setActiveTab(tabNum);
  };

  return (
    <section
      className={`py-16 md:py-24 lg:py-32 min-h-[480px] px-4 sm:px-6 md:px-8 lg:px-12 border-t border-[#ddd] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'
      }`}
      id="section--2"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto mb-8 md:mb-12 lg:mb-16">
        <h2 className="text-base md:text-lg font-semibold uppercase text-primary mb-2 md:mb-3">
          Operations
        </h2>
        <h3 className="text-2xl sm:text-3xl md:text-4xl leading-tight font-medium">
          Everything as simple as possible, but no simpler.
        </h3>
      </div>

      <div className="max-w-6xl mx-auto mt-8 md:mt-16 bg-white min-h-5 ">
        {/* Tabs */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 mb-16 sm:mb-8">
          <button
            className={`inline-block bg-[var(--color-secondary)] text-xs sm:text-sm md:text-base font-medium border-none py-2 sm:py-3 px-4 sm:px-5 md:px-6 rounded-full cursor-pointer transition-all duration-300 transform mb-2 sm:mb-0 sm:mr-2 md:mr-4
            ${activeTab === 1 ? 'shadow-md' : 'opacity-90'} 
            ${
              activeTab === 1 ? 'sm:-translate-y-2 z-10' : 'sm:-translate-y-0'
            }`}
            onClick={() => handleTabClick(1)}
          >
            <span className="mr-1 sm:mr-2 font-semibold inline-block">01</span>
            Instant Transfers
          </button>
          <button
            className={`inline-block bg-[#5ec576] text-xs sm:text-sm md:text-base font-medium border-none py-2 sm:py-3 px-4 sm:px-5 md:px-6 rounded-full cursor-pointer transition-all duration-300 transform mb-2 sm:mb-0 sm:mr-2 md:mr-4
            ${activeTab === 2 ? 'shadow-md' : 'opacity-90'} 
            ${
              activeTab === 2 ? 'sm:-translate-y-2 z-10' : 'sm:-translate-y-0'
            }`}
            onClick={() => handleTabClick(2)}
          >
            <span className="mr-1 sm:mr-2 font-semibold inline-block">02</span>
            Instant Loans
          </button>
          <button
            className={`inline-block bg-[var(--color-tertiary)] text-xs sm:text-sm md:text-base font-medium border-none py-2 sm:py-3 px-4 sm:px-5 md:px-6 rounded-full cursor-pointer transition-all duration-300 transform
            ${activeTab === 3 ? 'shadow-md' : 'opacity-90'} 
            ${
              activeTab === 3 ? 'sm:-translate-y-2 z-10' : 'sm:-translate-y-0'
            }`}
            onClick={() => handleTabClick(3)}
          >
            <span className="mr-1 sm:mr-2 font-semibold inline-block">03</span>
            Instant Closing
          </button>
        </div>

        {/* Content */}
        <div
          className={`${
            activeTab === 1
              ? 'grid grid-cols-1 sm:grid-cols-[5rem_1fr] md:grid-cols-[6rem_1fr] lg:grid-cols-[7rem_1fr] gap-4 md:gap-6 lg:gap-8 animate-fadeIn'
              : 'hidden'
          } text-sm sm:text-base md:text-lg p-4 sm:p-6 md:p-8 lg:p-10 min-h-[200px] sm:min-h-[240px]`}
        >
          <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full bg-[var(--color-secondary-opacity)] mx-auto sm:mx-0">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 fill-[var(--color-secondary-darker)]"></svg>
          </div>
          <h5 className="text-lg sm:text-xl md:text-2xl font-medium text-center sm:text-left sm:self-center">
            Transfer money to anyone, instantly! No fees, no BS.
          </h5>
          <p className="col-span-1 sm:col-start-2 text-[#666] text-center sm:text-left text-sm sm:text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div
          className={`${
            activeTab === 2
              ? 'grid grid-cols-1 sm:grid-cols-[5rem_1fr] md:grid-cols-[6rem_1fr] lg:grid-cols-[7rem_1fr] gap-4 md:gap-6 lg:gap-8 animate-fadeIn'
              : 'hidden'
          } text-sm sm:text-base md:text-lg p-4 sm:p-6 md:p-8 lg:p-10 min-h-[200px] sm:min-h-[240px]`}
        >
          <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full bg-[var(--color-primary-opacity)] mx-auto sm:mx-0">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 fill-primary"></svg>
          </div>
          <h5 className="text-lg sm:text-xl md:text-2xl font-medium text-center sm:text-left sm:self-center">
            Buy a home or make your dreams come true, with instant loans.
          </h5>
          <p className="col-span-1 sm:col-start-2 text-[#666] text-center sm:text-left text-sm sm:text-base leading-relaxed">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>

        <div
          className={`${
            activeTab === 3
              ? 'grid grid-cols-1 sm:grid-cols-[5rem_1fr] md:grid-cols-[6rem_1fr] lg:grid-cols-[7rem_1fr] gap-6 md:gap-8 lg:gap-10 animate-fadeIn'
              : 'hidden'
          } text-base sm:text-lg md:text-xl p-6 sm:p-8 md:p-10 lg:p-12 mt-6 sm:mt-8 md:mt-10 lg:mt-12 min-h-[300px]`}
        >
          <div className="flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16 rounded-full bg-[var(--color-tertiary-opacity)] mx-auto sm:mx-0">
            <svg className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 fill-[var(--color-tertiary)]"></svg>
          </div>
          <h5 className="text-lg sm:text-xl md:text-2xl font-medium text-center sm:text-left sm:self-center">
            No longer need your account? No problem! Close it instantly.
          </h5>
          <p className="col-span-1 sm:col-start-2 text-[#666] text-center sm:text-left text-sm sm:text-base">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
        </div>
      </div>
    </section>
  );
}
