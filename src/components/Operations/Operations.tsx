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
      className={`py-[15rem] px-[3rem] border-t border-[#ddd] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8rem]'
      }`}
      id="section--2"
      ref={sectionRef}
    >
      <div className="max-w-[80rem] mx-auto mb-[8rem]">
        <h2 className="text-[1.8rem] font-semibold uppercase text-primary mb-[1rem]">
          Operations
        </h2>
        <h3 className="text-[4rem] leading-[1.3] font-medium">
          Everything as simple as possible, but no simpler.
        </h3>
      </div>

      <div className="max-w-[100rem] mx-auto mt-[12rem] bg-white">
        {/* Tabs */}
        <div className="flex justify-center">
          <button
            className={`inline-block bg-[var(--color-secondary)] text-[1.6rem] font-medium border-none py-[1.25rem] px-[4.5rem] rounded-[10rem] cursor-pointer transition-all duration-300 mr-[2.5rem] transform ${
              activeTab === 1 ? '-translate-y-[66%]' : '-translate-y-[50%]'
            } hover:bg-[var(--color-secondary-darker)]`}
            onClick={() => handleTabClick(1)}
          >
            <span className="mr-[1rem] font-semibold inline-block">01</span>
            Instant Transfers
          </button>
          <button
            className={`inline-block bg-primary text-[1.6rem] font-medium border-none py-[1.25rem] px-[4.5rem] rounded-[10rem] cursor-pointer transition-all duration-300 mr-[2.5rem] transform ${
              activeTab === 2 ? '-translate-y-[66%]' : '-translate-y-[50%]'
            } hover:bg-primary-darker`}
            onClick={() => handleTabClick(2)}
          >
            <span className="mr-[1rem] font-semibold inline-block">02</span>
            Instant Loans
          </button>
          <button
            className={`inline-block bg-[var(--color-tertiary)] text-[1.6rem] font-medium border-none py-[1.25rem] px-[4.5rem] rounded-[10rem] cursor-pointer transition-all duration-300 transform ${
              activeTab === 3 ? '-translate-y-[66%]' : '-translate-y-[50%]'
            } hover:bg-[var(--color-tertiary-darker)]`}
            onClick={() => handleTabClick(3)}
          >
            <span className="mr-[1rem] font-semibold inline-block">03</span>
            Instant Closing
          </button>
        </div>

        {/* Content */}
        <div
          className={`${
            activeTab === 1
              ? 'grid grid-cols-[7rem_1fr] gap-x-[3rem] gap-y-[0.5rem] animate-fadeIn'
              : 'hidden'
          } text-[1.7rem] p-[2.5rem_7rem_6.5rem_7rem]`}
        >
          <div className="flex items-center justify-center h-[7rem] w-[7rem] rounded-full bg-[var(--color-secondary-opacity)]">
            <svg className="h-[2.75rem] w-[2.75rem] fill-[var(--color-secondary-darker)]">
              <use xlinkHref="/img/icons.svg#icon-upload"></use>
            </svg>
          </div>
          <h5 className="text-[2.25rem] font-medium self-center">
            Transfer money to anyone, instantly! No fees, no BS.
          </h5>
          <p className="col-start-2 text-[#666]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </div>

        <div
          className={`${
            activeTab === 2
              ? 'grid grid-cols-[7rem_1fr] gap-x-[3rem] gap-y-[0.5rem] animate-fadeIn'
              : 'hidden'
          } text-[1.7rem] p-[2.5rem_7rem_6.5rem_7rem]`}
        >
          <div className="flex items-center justify-center h-[7rem] w-[7rem] rounded-full bg-[var(--color-primary-opacity)]">
            <svg className="h-[2.75rem] w-[2.75rem] fill-primary">
              <use xlinkHref="/img/icons.svg#icon-home"></use>
            </svg>
          </div>
          <h5 className="text-[2.25rem] font-medium self-center">
            Buy a home or make your dreams come true, with instant loans.
          </h5>
          <p className="col-start-2 text-[#666]">
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>

        <div
          className={`${
            activeTab === 3
              ? 'grid grid-cols-[7rem_1fr] gap-x-[3rem] gap-y-[0.5rem] animate-fadeIn'
              : 'hidden'
          } text-[1.7rem] p-[2.5rem_7rem_6.5rem_7rem]`}
        >
          <div className="flex items-center justify-center h-[7rem] w-[7rem] rounded-full bg-[var(--color-tertiary-opacity)]">
            <svg className="h-[2.75rem] w-[2.75rem] fill-[var(--color-tertiary)]">
              <use xlinkHref="/img/icons.svg#icon-user-x"></use>
            </svg>
          </div>
          <h5 className="text-[2.25rem] font-medium self-center">
            No longer need your account? No problem! Close it instantly.
          </h5>
          <p className="col-start-2 text-[#666]">
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
