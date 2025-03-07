'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const router = useRouter();

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
      className={`py-16 md:py-32 px-4 md:px-12 bg-[#37383d] border-t-0 border-b border-[#444] text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-32'
      }`}
      ref={sectionRef}
    >
      <div className="max-w-5xl mx-auto mb-8 md:mb-16">
        <h2 className="text-lg md:text-xl font-semibold uppercase text-primary mb-2 md:mb-4">
          Join our community
        </h2>
        <h3 className="text-2xl md:text-4xl leading-tight font-medium text-white text-center">
          Your financial life in a click away
        </h3>
      </div>
      <button
        onClick={() => router.push('/dashboard')}
        className="inline-block bg-[#5ec576] text-base md:text-xl font-medium border-none py-3 md:py-5 px-6 md:px-12 rounded-full cursor-pointer transition-all duration-300 hover:bg-[#4bbb6b] focus:outline-none focus:ring-2 focus:ring-[#4bbb6b] focus:ring-opacity-50"
      >
        Open your free account today
      </button>
    </section>
  );
}
