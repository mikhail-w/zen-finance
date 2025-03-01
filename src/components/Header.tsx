'use client';

import { useEffect } from 'react';
import Image from 'next/image';

export default function Header() {
  useEffect(() => {
    const btnScrollTo = document.querySelector('.btn--scroll-to');
    const section1 = document.querySelector('#section--1');

    const scrollToSection1 = (e: Event) => {
      e.preventDefault();
      section1?.scrollIntoView({ behavior: 'smooth' });
    };

    btnScrollTo?.addEventListener('click', scrollToSection1);

    return () => {
      btnScrollTo?.removeEventListener('click', scrollToSection1);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__title">
        <h1>
          The art of
          <span className="highlight"> Finance </span>
          with
          <br />
          <span className="highlight">Effortless</span> simplicity
        </h1>
        <h4>Financial clarity, without the complexity.</h4>
        <button className="btn--text btn--scroll-to">Learn more &#8595;</button>
        <Image
          src="/img/hero.png"
          className="header__img"
          alt="Minimalist  items"
          width={600}
          height={400}
          priority
        />
      </div>
    </header>
  );
}
