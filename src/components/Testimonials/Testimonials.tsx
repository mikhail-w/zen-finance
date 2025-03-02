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
              `<button class="dots__dot" data-slide="${i}"></button>`
            );
          }
        });
      };

      const activateDot = function (slide: number) {
        document
          .querySelectorAll('.dots__dot')
          .forEach(dot => dot.classList.remove('dots__dot--active'));

        document
          .querySelector(`.dots__dot[data-slide="${slide}"]`)
          ?.classList.add('dots__dot--active');
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
        if (target.classList.contains('dots__dot')) {
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
    <section className="section" id="section--3">
      <div className="section__title section__title--testimonials">
        <h2 className="section__description">Not sure yet?</h2>
        <h3 className="section__header">
          Millions of users are already making their lives simpler.
        </h3>
      </div>
      <div className="slider">
        <div className="slide slide--1">
          <div className="testimonial">
            <h5 className="testimonial__header">
              Best financial decision ever!
            </h5>
            <blockquote className="testimonial__text">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Accusantium quas quisquam non? Quas voluptate nulla minima
              deleniti optio ullam nesciunt, numquam corporis et asperiores
              laboriosam sunt, praesentium suscipit blanditiis. Necessitatibus
              id alias reiciendis, perferendis facere pariatur dolore veniam
              autem esse non voluptatem saepe provident nihil molestiae.
            </blockquote>
            <address className="testimonial__author">
              <Image
                src="/img/user-1.jpg"
                alt="Aarav Lynn"
                className="testimonial__photo"
                width={65}
                height={65}
              />
              <h6 className="testimonial__name">Aarav Lynn</h6>
              <p className="testimonial__location">San Francisco, USA</p>
            </address>
          </div>
        </div>

        <div className="slide slide--2">
          <div className="testimonial">
            <h5 className="testimonial__header">
              The last step to becoming a complete minimalist
            </h5>
            <blockquote className="testimonial__text">
              Quisquam itaque deserunt ullam, quia ea repellendus provident,
              ducimus neque ipsam modi voluptatibus doloremque, corrupti
              laborum. Incidunt numquam perferendis veritatis neque repellendus.
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo
              deserunt exercitationem deleniti.
            </blockquote>
            <address className="testimonial__author">
              <Image
                src="/img/user-2.jpg"
                alt="Miyah Miles"
                className="testimonial__photo"
                width={65}
                height={65}
              />
              <h6 className="testimonial__name">Miyah Miles</h6>
              <p className="testimonial__location">London, UK</p>
            </address>
          </div>
        </div>

        <div className="slide slide--3">
          <div className="testimonial">
            <h5 className="testimonial__header">
              Finally free from old-school banks
            </h5>
            <blockquote className="testimonial__text">
              Debitis, nihil sit minus suscipit magni aperiam vel tenetur
              incidunt commodi architecto numquam omnis nulla autem,
              necessitatibus blanditiis modi similique quidem. Odio aliquam
              culpa dicta beatae quod maiores ipsa minus consequatur error sunt,
              deleniti saepe aliquid quos inventore sequi. Necessitatibus id
              alias reiciendis, perferendis facere.
            </blockquote>
            <address className="testimonial__author">
              <Image
                src="/img/user-3.jpg"
                alt="Francisco Gomes"
                className="testimonial__photo"
                width={65}
                height={65}
              />
              <h6 className="testimonial__name">Francisco Gomes</h6>
              <p className="testimonial__location">Lisbon, Portugal</p>
            </address>
          </div>
        </div>

        <button className="slider__btn slider__btn--left">&larr;</button>
        <button className="slider__btn slider__btn--right">&rarr;</button>
        <div className="dots"></div>
      </div>
    </section>
  );
}
