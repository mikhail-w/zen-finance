'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Testimonials() {
  // Track window size for responsive adjustments
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on client side before accessing window
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      // Set initial value
      handleResize();

      // Add event listener for window resize
      window.addEventListener('resize', handleResize);

      // Clean up
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const slider = function () {
      const slides = document.querySelectorAll('.slide');
      const btnLeft = document.querySelector('.slider__btn--left');
      const btnRight = document.querySelector('.slider__btn--right');
      const dotContainer = document.querySelector('.dots');

      let curSlide = 0;
      const maxSlide = slides.length - 1;

      // Functions
      const createDots = function () {
        if (dotContainer) {
          // Clear existing dots to prevent duplicates on re-render
          dotContainer.innerHTML = '';

          slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML(
              'beforeend',
              `<button class="dot" data-slide="${i}" aria-label="Go to slide ${
                i + 1
              }"></button>`
            );
          });
        }
      };

      const activateDot = function (slide: number) {
        document
          .querySelectorAll('.dot')
          .forEach(dot => dot.classList.remove('active-dot'));

        document
          .querySelector(`.dot[data-slide="${slide}"]`)
          ?.classList.add('active-dot');
      };

      const goToSlide = function (slide: number) {
        slides.forEach((s, i) => {
          (s as HTMLElement).style.transform = `translateX(${
            100 * (i - slide)
          }%)`;
        });
      };

      // Next slide
      const nextSlide = function () {
        curSlide = curSlide === maxSlide ? 0 : curSlide + 1;
        activateDot(curSlide);
        goToSlide(curSlide);
      };

      // Previous slide
      const prevSlide = function () {
        curSlide = curSlide === 0 ? maxSlide : curSlide - 1;
        activateDot(curSlide);
        goToSlide(curSlide);
      };

      const init = function () {
        createDots();
        activateDot(0);
        goToSlide(0);
      };
      init();

      // Event handlers
      btnRight?.addEventListener('click', nextSlide);
      btnLeft?.addEventListener('click', prevSlide);

      // Touch events for mobile swiping
      let touchStartX = 0;
      let touchEndX = 0;

      const handleSwipe = () => {
        const touchThreshold = 50; // Minimum px distance to detect swipe
        if (touchStartX - touchEndX > touchThreshold) {
          // Swipe left, go to next slide
          nextSlide();
        } else if (touchEndX - touchStartX > touchThreshold) {
          // Swipe right, go to previous slide
          prevSlide();
        }
      };

      slides.forEach(slide => {
        slide.addEventListener(
          'touchstart',
          (e: TouchEvent) => {
            touchStartX = e.changedTouches[0].screenX;
          },
          { passive: true }
        );

        slide.addEventListener(
          'touchend',
          (e: TouchEvent) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
          },
          { passive: true }
        );
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
      });

      dotContainer?.addEventListener('click', function (e) {
        const target = e.target as HTMLElement;
        if (target.classList.contains('dot')) {
          const { slide } = target.dataset;
          if (slide) {
            activateDot(parseInt(slide));
            goToSlide(parseInt(slide));
          }
        }
      });

      // Auto-advance slides every 7 seconds
      const slideInterval = setInterval(nextSlide, 7000);

      // Clear interval when user interacts with slider
      const clearSlideInterval = () => {
        clearInterval(slideInterval);
      };

      btnRight?.addEventListener('click', clearSlideInterval);
      btnLeft?.addEventListener('click', clearSlideInterval);
      dotContainer?.addEventListener('click', clearSlideInterval);
      slides.forEach(slide => {
        slide.addEventListener('touchstart', clearSlideInterval, {
          passive: true,
        });
      });

      return () => {
        // Clear interval on cleanup
        clearInterval(slideInterval);
      };
    };

    // Initialize slider
    const sliderInstance = slider();

    // Cleanup
    return () => {
      document.removeEventListener('keydown', () => {});
      if (sliderInstance) {
        sliderInstance();
      }
    };
  }, []);

  return (
    <section
      className="py-16 md:py-60 px-10 md:px-12 border-t border-gray-300 transition-all duration-1000 "
      id="section--3"
    >
      <div className="max-w-[80rem] mx-auto mb-12 md:mb-32">
        <h2 className="text-[1.4rem] md:text-[1.8rem] font-semibold uppercase text-primary mb-4">
          Not sure yet?
        </h2>
        <h3 className="text-[2.5rem] md:text-[4rem] leading-[1.3] font-medium">
          Millions of users are already making their lives simpler.
        </h3>
      </div>

      <div className="max-w-[100rem] h-[65rem] md:h-[50rem] mx-auto relative overflow-hidden">
        {/* Slide 1 */}
        <div className="slide absolute top-0 w-full h-full flex items-center justify-center transition-transform duration-1000">
          <div className="w-[90%] md:w-[65%] relative">
            {/* Quote symbol */}
            <div className="absolute top-[-3rem] md:top-[-5.7rem] left-[-2rem] md:left-[-6.8rem] text-[10rem] md:text-[20rem] leading-[1] font-inherit text-primary z-[-1]">
              &#8220;
            </div>

            <h5 className="text-[1.8rem] md:text-[2.25rem] font-medium mb-4 md:mb-6">
              Best financial decision ever!
            </h5>

            <blockquote className="text-[1.2rem] md:text-[1.7rem] mb-8 md:mb-14 text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium quas quisquam non? Quas voluptate nulla minima
              deleniti optio ullam nesciunt, numquam corporis et asperiores
              laboriosam sunt, praesentium suscipit blanditiis.
            </blockquote>

            <address className="ml-4 md:ml-12 not-italic grid grid-cols-[4rem_1fr] md:grid-cols-[6.5rem_1fr] gap-x-4 md:gap-x-8">
              <Image
                src="/img/user-1.jpg"
                alt="Aarav Lynn"
                className="row-span-2 w-[4rem] md:w-[6.5rem] rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-[1.3rem] md:text-[1.7rem] font-medium self-end m-0">
                Aarav Lynn
              </h6>
              <p className="text-[1.1rem] md:text-[1.5rem] text-gray-600">
                San Francisco, USA
              </p>
            </address>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="slide absolute top-0 w-full h-full flex items-center justify-center transition-transform duration-1000">
          <div className="w-[90%] md:w-[65%] relative">
            {/* Quote symbol */}
            <div className="absolute top-[-3rem] md:top-[-5.7rem] left-[-2rem] md:left-[-6.8rem] text-[10rem] md:text-[20rem] leading-[1] font-inherit text-primary z-[-1]">
              &#8220;
            </div>

            <h5 className="text-[1.8rem] md:text-[2.25rem] font-medium mb-4 md:mb-6">
              The last step to becoming a complete minimalist
            </h5>

            <blockquote className="text-[1.2rem] md:text-[1.7rem] mb-8 md:mb-14 text-gray-600">
              Quisquam itaque deserunt ullam, quia ea repellendus provident,
              ducimus neque ipsam modi voluptatibus doloremque, corrupti
              laborum. Incidunt numquam perferendis veritatis neque repellendus.
            </blockquote>

            <address className="ml-4 md:ml-12 not-italic grid grid-cols-[4rem_1fr] md:grid-cols-[6.5rem_1fr] gap-x-4 md:gap-x-8">
              <Image
                src="/img/user-2.jpg"
                alt="Miyah Miles"
                className="row-span-2 w-[4rem] md:w-[6.5rem] rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-[1.3rem] md:text-[1.7rem] font-medium self-end m-0">
                Miyah Miles
              </h6>
              <p className="text-[1.1rem] md:text-[1.5rem] text-gray-600">
                London, UK
              </p>
            </address>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="slide absolute top-0 w-full h-full flex items-center justify-center transition-transform duration-1000">
          <div className="w-[90%] md:w-[65%] relative">
            {/* Quote symbol */}
            <div className="absolute top-[-3rem] md:top-[-5.7rem] left-[-2rem] md:left-[-6.8rem] text-[10rem] md:text-[20rem] leading-[1] font-inherit text-primary z-[-1]">
              &#8220;
            </div>

            <h5 className="text-[1.8rem] md:text-[2.25rem] font-medium mb-4 md:mb-6">
              Finally free from old-school banks
            </h5>

            <blockquote className="text-[1.2rem] md:text-[1.7rem] mb-8 md:mb-14 text-gray-600">
              Debitis, nihil sit minus suscipit magni aperiam vel tenetur
              incidunt commodi architecto numquam omnis nulla autem,
              necessitatibus blanditiis modi similique quidem. Odio aliquam
              culpa dicta beatae quod maiores ipsa minus.
            </blockquote>

            <address className="ml-4 md:ml-12 not-italic grid grid-cols-[4rem_1fr] md:grid-cols-[6.5rem_1fr] gap-x-4 md:gap-x-8">
              <Image
                src="/img/user-3.jpg"
                alt="Francisco Gomes"
                className="row-span-2 w-[4rem] md:w-[6.5rem] rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-[1.3rem] md:text-[1.7rem] font-medium self-end m-0">
                Francisco Gomes
              </h6>
              <p className="text-[1.1rem] md:text-[1.5rem] text-gray-600">
                Lisbon, Portugal
              </p>
            </address>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          className="slider__btn--left absolute top-1/2 left-[5%] md:left-[6%] z-10 border-none bg-white/70 text-gray-800 rounded-full h-[3rem] w-[3rem] md:h-[5.5rem] md:w-[5.5rem] text-[2rem] md:text-[3.25rem] cursor-pointer flex items-center justify-center -translate-y-1/2 shadow-md"
          aria-label="Previous testimonial"
        >
          &larr;
        </button>
        <button
          className="slider__btn--right absolute top-1/2 right-[5%] md:right-[6%] z-10 border-none bg-white/70 text-gray-800 rounded-full h-[3rem] w-[3rem] md:h-[5.5rem] md:w-[5.5rem] text-[2rem] md:text-[3.25rem] cursor-pointer flex items-center justify-center -translate-y-1/2 shadow-md"
          aria-label="Next testimonial"
        >
          &rarr;
        </button>

        {/* Dots */}
        <div className="dots absolute bottom-[2%] left-1/2 -translate-x-1/2 flex">
          {/* Dots will be created dynamically */}
        </div>
      </div>

      {/* Adding the required styling for dynamically created elements */}
      <style jsx global>{`
        .dot {
          border: none;
          background-color: #b9b9b9;
          opacity: 0.7;
          height: 0.75rem;
          width: 0.75rem;
          border-radius: 50%;
          margin-right: 1rem;
          cursor: pointer;
          transition: all 0.5s;
        }

        @media (min-width: 768px) {
          .dot {
            height: 1rem;
            width: 1rem;
            margin-right: 1.75rem;
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
