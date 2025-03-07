'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

export default function Features() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState<string[]>([]);

  useEffect(() => {
    // Observer for section entrance animation
    const sectionObserver = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          sectionObserver.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const featureObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && !activeFeatures.includes(id)) {
              setActiveFeatures(prev => [...prev, id]);
            }
          }
        });
      },
      {
        root: null,
        threshold: 0.5,
        rootMargin: '-50px 0px',
      }
    );

    // Observe all feature elements
    document.querySelectorAll('.feature-item').forEach(el => {
      featureObserver.observe(el);
    });

    // Cleanup
    return () => {
      sectionObserver.disconnect();
      featureObserver.disconnect();
    };
  }, [activeFeatures]);

  return (
    <section
      className={`max-w-[90%] mx-auto py-16 sm:py-20 md:py-24 lg:py-32 px-4 sm:px-6 border-t border-[#ddd] transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
      }`}
      id="section--1"
      ref={sectionRef}
    >
      <div className="max-w-[90%] w-full mx-auto mb-12 md:mb-16 lg:mb-20">
        <h2
          className={`text-xl sm:text-2xl lg:text-3xl font-semibold uppercase text-primary mb-2 sm:mb-4 transition-all duration-700 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Features
        </h2>
        <h3
          className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-medium transition-all duration-700 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Everything you need in modern finance and more.
        </h3>
      </div>

      <div className="flex flex-col space-y-24 sm:space-y-32 md:space-y-40 max-w-6xl mx-auto">
        {/* Feature 1 */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            id="feature1-img"
            className={`feature-item transition-all duration-700 ease-out ${
              activeFeatures.includes('feature1-img')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Image
              src="/img/digital.svg"
              alt="Digital banking interface"
              width={450}
              height={270}
              priority
              className="w-full h-auto"
            />
          </div>

          <div
            id="feature1-text"
            className={`feature-item w-full text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-700 ease-out ${
              activeFeatures.includes('feature1-text')
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center justify-center bg-[var(--color-primary-opacity)] h-16 w-16 sm:h-20 sm:w-20 rounded-full mb-4 sm:mb-5">
              <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-primary"></svg>
            </div>
            <h5 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-5">
              100% digital banking
            </h5>
            <p>
              Experience banking without boundaries. Our intuitive platform
              gives you complete control over your finances from anywhere, at
              any time. Manage accounts, track spending, and make instant
              transfers with just a few taps—no paperwork, no waiting.
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            id="feature2-text"
            className={`feature-item w-full text-base sm:text-lg md:text-xl lg:text-2xl md:order-1 transition-all duration-700 ease-out ${
              activeFeatures.includes('feature2-text')
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-[-8px]'
            }`}
          >
            <div className="flex items-center justify-center bg-[var(--color-primary-opacity)] h-16 w-16 sm:h-20 sm:w-20 rounded-full mb-4 sm:mb-5">
              <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-primary"></svg>
            </div>
            <h5 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-5">
              Intelligent wealth growth
            </h5>
            <p>
              Put your money to work with our smart investment options. Our
              AI-powered recommendations adapt to your financial goals and risk
              tolerance, helping you build a diversified portfolio that
              maximizes returns while maintaining the security you need for
              peace of mind.
            </p>
          </div>

          <div
            id="feature2-img"
            className={`feature-item md:order-2 transition-all duration-700 ease-out ${
              activeFeatures.includes('feature2-img')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Image
              src="/img/grow.svg"
              alt="Growing investments"
              width={450}
              height={270}
              priority
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            id="feature3-img"
            className={`feature-item transition-all duration-700 ease-out ${
              activeFeatures.includes('feature3-img')
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            <Image
              src="/img/card.svg"
              alt="Premium debit card"
              width={450}
              height={270}
              priority
              className="w-full h-auto"
            />
          </div>

          <div
            id="feature3-text"
            className={`feature-item w-full text-base sm:text-lg md:text-xl lg:text-2xl transition-all duration-700 ease-out ${
              activeFeatures.includes('feature3-text')
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-8'
            }`}
          >
            <div className="flex items-center justify-center bg-[var(--color-primary-opacity)] h-16 w-16 sm:h-20 sm:w-20 rounded-full mb-4 sm:mb-5">
              <svg className="h-8 w-8 sm:h-10 sm:w-10 fill-primary"></svg>
            </div>
            <h5 className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-3 sm:mb-5">
              Premium debit card included
            </h5>
            <p>
              Your finances deserve premium treatment. Enjoy zero fees, enhanced
              security, and exclusive rewards with our metal debit card. Tap to
              pay anywhere globally with competitive exchange rates, real-time
              spending notifications, and seamless integration with digital
              wallets—all with no annual fee.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
