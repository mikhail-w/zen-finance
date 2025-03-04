'use client';

import { useEffect, useRef, useState } from 'react';

export default function SignUp() {
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

  return (
    <section
      className={`py-[10rem] px-[3rem] bg-[#37383d] border-t-0 border-b border-[#444] text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[8rem]'
      }`}
      ref={sectionRef}
    >
      <div className="max-w-[80rem] mx-auto mb-[6rem]">
        <h2 className="text-[1.8rem] font-semibold uppercase text-primary mb-[1rem]">
          Join our community
        </h2>
        <h3 className="text-[4rem] leading-[1.3] font-medium text-white text-center">
          Your financial life in a click away
        </h3>
      </div>

      <button className="inline-block bg-primary text-[1.9rem] font-medium border-none py-[2rem] px-[5rem] rounded-[10rem] cursor-pointer transition-all duration-300 hover:bg-primary-darker">
        Open your free account today
      </button>
    </section>
  );
}
