'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Testimonials() {
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
        slides.forEach(function (_, i) {
          if (dotContainer) {
            dotContainer.insertAdjacentHTML(
              'beforeend',
              `<button class="dot" data-slide="${i}"></button>`
            );
          }
        });
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
    };

    slider();

    return () => {
      // Cleanup event listeners
      document.removeEventListener('keydown', () => {});
    };
  }, []);

  return (
    <section
      className="py-60 px-12 border-t border-gray-300 transition-all duration-1000"
      id="section--3"
    >
      <div className="max-w-[80rem] mx-auto mb-32">
        <h2 className="text-[1.8rem] font-semibold uppercase text-primary mb-4">
          Not sure yet?
        </h2>
        <h3 className="text-[4rem] leading-[1.3] font-medium">
          Millions of users are already making their lives simpler.
        </h3>
      </div>

      <div className="max-w-[100rem] h-[50rem] mx-auto relative overflow-hidden">
        {/* Slide 1 */}
        <div className="slide absolute top-0 w-full h-[50rem] flex items-center justify-center transition-transform duration-1000">
          <div className="w-[65%] relative">
            {/* Quote symbol */}
            <div className="absolute top-[-5.7rem] left-[-6.8rem] text-[20rem] leading-[1] font-inherit text-primary z-[-1]">
              &#8220;
            </div>

            <h5 className="text-[2.25rem] font-medium mb-6">
              Best financial decision ever!
            </h5>

            <blockquote className="text-[1.7rem] mb-14 text-gray-600">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium quas quisquam non? Quas voluptate nulla minima
              deleniti optio ullam nesciunt, numquam corporis et asperiores
              laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus
              id alias reiciendis, perferendis facere pariatur dolore veniam
              autem esse non voluptatem saepe provident nihil molestiae.
            </blockquote>

            <address className="ml-12 not-italic grid grid-cols-[6.5rem_1fr] gap-x-8">
              <Image
                src="/img/user-1.jpg"
                alt="Aarav Lynn"
                className="row-span-2 w-[6.5rem] rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-[1.7rem] font-medium self-end m-0">
                Aarav Lynn
              </h6>
              <p className="text-[1.5rem] text-gray-600">San Francisco, USA</p>
            </address>
          </div>
        </div>

        {/* Slide 2 */}
        <div className="slide absolute top-0 w-full h-[50rem] flex items-center justify-center transition-transform duration-1000">
          <div className="w-[65%] relative">
            {/* Quote symbol */}
            <div className="absolute top-[-5.7rem] left-[-6.8rem] text-[20rem] leading-[1] font-inherit text-primary z-[-1]">
              &#8220;
            </div>

            <h5 className="text-[2.25rem] font-medium mb-6">
              The last step to becoming a complete minimalist
            </h5>

            <blockquote className="text-[1.7rem] mb-14 text-gray-600">
              Quisquam itaque deserunt ullam, quia ea repellendus provident,
              ducimus neque ipsam modi voluptatibus doloremque, corrupti
              laborum. Incidunt numquam perferendis veritatis neque repellendus.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
              deserunt exercitationem deleniti.
            </blockquote>

            <address className="ml-12 not-italic grid grid-cols-[6.5rem_1fr] gap-x-8">
              <Image
                src="/img/user-2.jpg"
                alt="Miyah Miles"
                className="row-span-2 w-[6.5rem] rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-[1.7rem] font-medium self-end m-0">
                Miyah Miles
              </h6>
              <p className="text-[1.5rem] text-gray-600">London, UK</p>
            </address>
          </div>
        </div>

        {/* Slide 3 */}
        <div className="slide absolute top-0 w-full h-[50rem] flex items-center justify-center transition-transform duration-1000">
          <div className="w-[65%] relative">
            {/* Quote symbol */}
            <div className="absolute top-[-5.7rem] left-[-6.8rem] text-[20rem] leading-[1] font-inherit text-primary z-[-1]">
              &#8220;
            </div>

            <h5 className="text-[2.25rem] font-medium mb-6">
              Finally free from old-school banks
            </h5>

            <blockquote className="text-[1.7rem] mb-14 text-gray-600">
              Debitis, nihil sit minus suscipit magni aperiam vel tenetur
              incidunt commodi architecto numquam omnis nulla autem,
              necessitatibus blanditiis modi similique quidem. Odio aliquam
              culpa dicta beatae quod maiores ipsa minus consequatur error sunt,
              deleniti saepe aliquid quos inventore sequi. Necessitatibus id
              alias reiciendis, perferendis facere.
            </blockquote>

            <address className="ml-12 not-italic grid grid-cols-[6.5rem_1fr] gap-x-8">
              <Image
                src="/img/user-3.jpg"
                alt="Francisco Gomes"
                className="row-span-2 w-[6.5rem] rounded-full"
                width={65}
                height={65}
              />
              <h6 className="text-[1.7rem] font-medium self-end m-0">
                Francisco Gomes
              </h6>
              <p className="text-[1.5rem] text-gray-600">Lisbon, Portugal</p>
            </address>
          </div>
        </div>

        {/* Navigation Buttons */}
        <button className="slider__btn--left absolute top-1/2 left-[6%] z-10 border-none bg-white/70 text-gray-800 rounded-full h-[5.5rem] w-[5.5rem] text-[3.25rem] cursor-pointer -translate-x-1/2 -translate-y-1/2">
          &larr;
        </button>
        <button className="slider__btn--right absolute top-1/2 right-[6%] z-10 border-none bg-white/70 text-gray-800 rounded-full h-[5.5rem] w-[5.5rem] text-[3.25rem] cursor-pointer translate-x-1/2 -translate-y-1/2">
          &rarr;
        </button>

        {/* Dots */}
        <div className="dots absolute bottom-[5%] left-1/2 -translate-x-1/2 flex">
          {/* Dots will be created dynamically */}
        </div>
      </div>

      {/* Adding the required styling for dynamically created elements */}
      <style jsx global>{`
        .dot {
          border: none;
          background-color: #b9b9b9;
          opacity: 0.7;
          height: 1rem;
          width: 1rem;
          border-radius: 50%;
          margin-right: 1.75rem;
          cursor: pointer;
          transition: all 0.5s;
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
