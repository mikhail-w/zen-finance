'use client';

import Image from 'next/image';

export default function Features() {
  return (
    <section className="section" id="section--1">
      <div className="section__title">
        <h2 className="section__description">Features</h2>
        <h3 className="section__header">
          Everything you need in modern finance and more.
        </h3>
      </div>

      <div className="features">
        <Image
          src="/img/digital.svg"
          data-src="/img/digital.svg"
          alt="Computer"
          className="features__img lazy-img"
          width={500}
          height={300}
        />
        <div className="features__feature">
          <div className="features__icon">
            <svg>
              <use xlinkHref="/img/icons.svg#icon-monitor"></use>
            </svg>
          </div>
          <h5 className="features__header">100% digital bank</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde alias
            sint quos? Accusantium a fugiat porro reiciendis saepe quibusdam
            debitis ducimus.
          </p>
        </div>

        <div className="features__feature">
          <div className="features__icon">
            <svg>
              <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
            </svg>
          </div>
          <h5 className="features__header">Watch your money grow</h5>
          <p>
            Nesciunt quos autem dolorum voluptates cum dolores dicta fuga
            inventore ab? Nulla incidunt eius numquam sequi iste pariatur
            quibusdam!
          </p>
        </div>
        <Image
          src="/img/grow.svg"
          data-src="/img/grow.svg"
          alt="Plant"
          className="features__img lazy-img"
          width={500}
          height={300}
        />

        <Image
          src="/img/card.svg"
          data-src="/img/card.svg"
          alt="Credit card"
          className="features__img lazy-img"
          width={500}
          height={300}
        />
        <div className="features__feature">
          <div className="features__icon">
            <svg>
              <use xlinkHref="/img/icons.svg#icon-credit-card"></use>
            </svg>
          </div>
          <h5 className="features__header">Free debit card included</h5>
          <p>
            Quasi, fugit in cumque cupiditate reprehenderit debitis animi enim
            eveniet consequatur odit quam quos possimus assumenda dicta fuga
            inventore ab.
          </p>
        </div>
      </div>
    </section>
  );
}
