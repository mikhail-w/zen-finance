'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';

export default function Testimonials() {
  // Track window size for responsive adjustments
  const [screenSize, setScreenSize] = useState('lg');
  const [isMobile, setIsMobile] = useState(false);
  // State for current slide
  const [curSlide, setCurSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);

  // References for DOM elements
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get total number of slides
  const maxSlide = 3 - 1; // Hardcoded based on the 3 slides in the component

  // Resize handler for responsive design
  useEffect(() => {
    // Check if we're on client side before accessing window
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        const width = window.innerWidth;
        setIsMobile(width < 768);

        if (width < 640) {
          setScreenSize('sm');
        } else if (width < 768) {
          setScreenSize('md');
        } else {
          setScreenSize('lg');
        }
      };

      // Set initial value
      handleResize();

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Function to update slide positions
  const goToSlide = useCallback((slide: number) => {
    slidesRef.current.forEach((s, i) => {
      if (s) {
        s.style.transform = `translateX(${100 * (i - slide)}%)`;
      }
    });
  }, []);

  // Navigation handlers
  const nextSlide = useCallback(() => {
    setCurSlide(prev => (prev === maxSlide ? 0 : prev + 1));
  }, [maxSlide]);

  const prevSlide = useCallback(() => {
    setCurSlide(prev => (prev === 0 ? maxSlide : prev - 1));
  }, [maxSlide]);

  // Touch event handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Reset auto-advance interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const touchThreshold = 50; // Minimum px distance to detect swipe

    if (touchStartX - touchEndX > touchThreshold) {
      // Swipe left, go to next slide
      nextSlide();
    } else if (touchEndX - touchStartX > touchThreshold) {
      // Swipe right, go to previous slide
      prevSlide();
    }
  };

  // Keyboard navigation handler
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Reset auto-advance interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }

      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    },
    [prevSlide, nextSlide]
  );

  // Handle dot click
  const handleDotClick = (slideIndex: number) => {
    // Reset auto-advance interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setCurSlide(slideIndex);
  };

  // Reset auto-advance on navigation button clicks
  const handleNavClick = (callback: () => void) => {
    // Reset auto-advance interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    callback();
  };

  // Initial setup and auto-advance
  useEffect(() => {
    // Initialize slide positions
    goToSlide(curSlide);

    // Add keyboard event listener
    document.addEventListener('keydown', handleKeyDown);

    // Auto-advance slides every 7 seconds
    intervalRef.current = setInterval(nextSlide, 7000);

    // Cleanup
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [goToSlide, curSlide, handleKeyDown, nextSlide]);

  // Update slide positions when current slide changes
  useEffect(() => {
    goToSlide(curSlide);
  }, [curSlide, goToSlide]);

  // Function to add slide to refs
  const addSlideRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      slidesRef.current[index] = el;
    }
  };

  return (
    <section
      className="py-10 md:py-24 lg:py-32 px-2 sm:px-4 md:px-8 lg:px-12 border-t border-gray-300 transition-all duration-1000"
      id="section--3"
    >
      <div className="max-w-6xl mx-auto mb-8 md:mb-16">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold uppercase text-primary mb-2 md:mb-4">
          Not sure yet?
        </h2>
        <h3 className="text-2xl md:text-3xl lg:text-5xl leading-tight font-medium">
          Millions of users are already making their lives simpler.
        </h3>
      </div>

      <div className="max-w-6xl h-[600px] md:h-[500px] lg:h-[550px] mx-auto relative overflow-hidden">
        {/* Slide 1 */}
        <div
          ref={el => addSlideRef(el, 0)}
          className="slide absolute top-0 w-full h-full flex items-center justify-center transition-transform duration-1000 px-2 sm:px-4 md:px-6 "
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full md:w-4/5 lg:w-2/3 relative p-4 md:p-0">
            {/* Quote symbol */}
            <div
              className="absolute top-[-1rem] md:top-[-3rem] left-[-1rem] md:left-[-3rem] text-5xl md:text-8xl lg:text-9xl leading-none font-inherit text-primary z-[-1]"
              style={{ color: '#5ec576' }}
            >
              &#8220;
            </div>

            <h5 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 md:mb-4 pl-5">
              Best financial decision ever!
            </h5>

            <blockquote className="text-base md:text-lg lg:text-xl mb-4 md:mb-8 text-gray-600 pl-5">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium quas quisquam non? Quas voluptate nulla minima
              deleniti optio ullam nesciunt, numquam corporis et asperiores
              laboriosam sunt, praesentium suscipit blanditiis.
            </blockquote>

            <address className="ml-2 md:ml-6 not-italic grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] lg:grid-cols-[6rem_1fr] gap-x-2 md:gap-x-4">
              <Image
                src="/img/user-1.jpg"
                alt="Aarav Lynn"
                className="row-span-2 w-10 md:w-14 lg:w-16 h-10 md:h-14 lg:h-16 rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-base md:text-lg lg:text-xl font-medium self-end m-0">
                Aarav Lynn
              </h6>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                San Francisco, USA
              </p>
            </address>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          ref={el => addSlideRef(el, 1)}
          className="slide absolute top-0 w-full h-full flex items-center justify-center transition-transform duration-1000 px-2 sm:px-4 md:px-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full md:w-4/5 lg:w-2/3 relative">
            {/* Quote symbol */}
            <div
              className="absolute top-[-1rem] md:top-[-3rem] left-[-1rem] md:left-[-3rem] text-5xl md:text-8xl lg:text-9xl leading-none font-inherit text-primary z-[-1]"
              style={{ color: '#5ec576' }}
            >
              &#8220;
            </div>

            <h5 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 md:mb-4">
              The last step to becoming a complete minimalist
            </h5>

            <blockquote className="text-base md:text-lg lg:text-xl mb-4 md:mb-8 text-gray-600">
              Quisquam itaque deserunt ullam, quia ea repellendus provident,
              ducimus neque ipsam modi voluptatibus doloremque, corrupti
              laborum. Incidunt numquam perferendis veritatis neque repellendus.
            </blockquote>

            <address className="ml-2 md:ml-6 not-italic grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] lg:grid-cols-[6rem_1fr] gap-x-2 md:gap-x-4">
              <Image
                src="/img/user-2.jpg"
                alt="Miyah Miles"
                className="row-span-2 w-10 md:w-14 lg:w-16 h-10 md:h-14 lg:h-16 rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-base md:text-lg lg:text-xl font-medium self-end m-0">
                Miyah Miles
              </h6>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                London, UK
              </p>
            </address>
          </div>
        </div>

        {/* Slide 3 */}
        <div
          ref={el => addSlideRef(el, 2)}
          className="slide absolute top-0 w-full h-full flex items-center justify-center transition-transform duration-1000 px-2 sm:px-4 md:px-6"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-full md:w-4/5 lg:w-2/3 relative">
            {/* Quote symbol */}
            <div
              className="absolute top-[-1rem] md:top-[-3rem] left-[-1rem] md:left-[-3rem] text-5xl md:text-8xl lg:text-9xl leading-none font-inherit text-primary z-[-1]"
              style={{ color: '#5ec576' }}
            >
              &#8220;
            </div>

            <h5 className="text-xl md:text-2xl lg:text-3xl font-medium mb-2 md:mb-4">
              Finally free from old-school banks
            </h5>

            <blockquote className="text-base md:text-lg lg:text-xl mb-4 md:mb-8 text-gray-600">
              Debitis, nihil sit minus suscipit magni aperiam vel tenetur
              incidunt commodi architecto numquam omnis nulla autem,
              necessitatibus blanditiis modi similique quidem. Odio aliquam
              culpa dicta beatae quod maiores ipsa minus.
            </blockquote>

            <address className="ml-2 md:ml-6 not-italic grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] lg:grid-cols-[6rem_1fr] gap-x-2 md:gap-x-4">
              <Image
                src="/img/user-3.jpg"
                alt="Francisco Gomes"
                className="row-span-2 w-10 md:w-14 lg:w-16 h-10 md:h-14 lg:h-16 rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-base md:text-lg lg:text-xl font-medium self-end m-0">
                Francisco Gomes
              </h6>
              <p className="text-sm md:text-base lg:text-lg text-gray-600">
                Lisbon, Portugal
              </p>
            </address>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="slider__btn--left absolute top-1/2 left-2 md:left-4 z-10 border-none bg-white/70 text-gray-800 rounded-full h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 text-xl md:text-2xl lg:text-3xl cursor-pointer flex items-center justify-center -translate-y-1/2 shadow-md"
          onClick={() => handleNavClick(prevSlide)}
          aria-label="Previous testimonial"
        >
          &larr;
        </button>
        <button
          className="slider__btn--right absolute top-1/2 right-2 md:right-4 z-10 border-none bg-white/70 text-gray-800 rounded-full h-8 w-8 md:h-12 md:w-12 lg:h-14 lg:w-14 text-xl md:text-2xl lg:text-3xl cursor-pointer flex items-center justify-center -translate-y-1/2 shadow-md"
          onClick={() => handleNavClick(nextSlide)}
          aria-label="Next testimonial"
        >
          &rarr;
        </button>

        {/* Dots */}
        <div className="dots absolute bottom-4 left-1/2 -translate-x-1/2 flex">
          {[...Array(3)].map((_, i) => (
            <button
              key={i}
              className={`dot ${curSlide === i ? 'active-dot' : ''}`}
              onClick={() => handleDotClick(i)}
              aria-label={`Go to slide ${i + 1}`}
              data-slide={i}
            />
          ))}
        </div>
      </div>

      {/* Adding the required styling for dynamically created elements */}
      <style jsx global>{`
        .dot {
          border: none;
          background-color: #b9b9b9;
          opacity: 0.7;
          height: 0.5rem;
          width: 0.5rem;
          border-radius: 50%;
          margin-right: 0.75rem;
          cursor: pointer;
          transition: all 0.5s;
        }

        @media (min-width: 768px) {
          .dot {
            height: 0.75rem;
            width: 0.75rem;
            margin-right: 1rem;
          }
        }

        @media (min-width: 1024px) {
          .dot {
            height: 1rem;
            width: 1rem;
            margin-right: 1.5rem;
          }
        }

        .dot:last-child {
          margin: 0;
        }

        .active-dot {
          background-color: var(--color-primary, #5ec576);
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
