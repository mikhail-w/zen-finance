'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Features.module.css';

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Observer for section entrance animation
    const observer = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          entry.target.classList.remove(styles.sectionHidden);
          // Only observe once
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      // Add hidden class and then observe
      sectionRef.current.classList.add(styles.sectionHidden);
      observer.observe(sectionRef.current);
    }

    // Lazy loading for images
    const imgTargets = document.querySelectorAll('img[data-src]');
    const loadImg = function (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) {
      const [entry] = entries;

      if (!entry.isIntersecting) return;

      // Replace src with data-src
      const img = entry.target as HTMLImageElement;
      img.src = img.dataset.src || '';
      img.classList.remove(styles.lazyImg);

      observer.unobserve(entry.target);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: '200px',
    });

    imgTargets.forEach(img => imgObserver.observe(img));

    // Feature items animations
    const animateFeatures = () => {
      if (!featuresRef.current) return;

      const featureItems = featuresRef.current.querySelectorAll(
        `.${styles.featureItem}`
      );

      featureItems.forEach((item, index) => {
        // Add animation with delay based on index
        (item as HTMLElement).style.animationDelay = `${index * 0.2}s`;
      });
    };

    // Start feature animations when section is visible
    const featureObserver = new IntersectionObserver(
      entries => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          animateFeatures();
          featureObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (featuresRef.current) {
      featureObserver.observe(featuresRef.current);
    }

    // Cleanup
    return () => {
      observer.disconnect();
      imgObserver.disconnect();
      featureObserver.disconnect();
    };
  }, []);

  return (
    <section className="section" id="section--1" ref={sectionRef}>
      <div className="section__title">
        <h2 className="section__description">Features</h2>
        <h3 className="section__header">
          Everything you need in modern finance and more.
        </h3>
      </div>

      <div className="features" ref={featuresRef}>
        <Image
          src="/img/digital.svg"
          data-src="/img/digital.svg"
          alt="Digital banking interface"
          className={`features__img ${styles.lazyImg} ${styles.featureItem} ${styles.featureImage}`}
          width={500}
          height={300}
        />
        <div
          className={`features__feature ${styles.featureItem} ${styles.featureRight}`}
        >
          <div className="features__icon">
            <svg>
              <use xlinkHref="/img/icons.svg#icon-monitor"></use>
            </svg>
          </div>
          <h5 className="features__header">100% digital banking</h5>
          <p>
            Experience banking without boundaries. Our intuitive platform gives
            you complete control over your finances from anywhere, at any time.
            Manage accounts, track spending, and make instant transfers with
            just a few taps—no paperwork, no waiting.
          </p>
        </div>

        <div
          className={`features__feature ${styles.featureItem} ${styles.featureLeft}`}
        >
          <div className="features__icon">
            <svg>
              <use xlinkHref="/img/icons.svg#icon-trending-up"></use>
            </svg>
          </div>
          <h5 className="features__header">Intelligent wealth growth</h5>
          <p>
            Put your money to work with our smart investment options. Our
            AI-powered recommendations adapt to your financial goals and risk
            tolerance, helping you build a diversified portfolio that maximizes
            returns while maintaining the security you need for peace of mind.
          </p>
        </div>
        <Image
          src="/img/grow.svg"
          data-src="/img/grow.svg"
          alt="Growing investments"
          className={`features__img ${styles.lazyImg} ${styles.featureItem} ${styles.featureImage}`}
          width={500}
          height={300}
        />

        <Image
          src="/img/card.svg"
          data-src="/img/card.svg"
          alt="Premium debit card"
          className={`features__img ${styles.lazyImg} ${styles.featureItem} ${styles.featureImage}`}
          width={500}
          height={300}
        />
        <div
          className={`features__feature ${styles.featureItem} ${styles.featureRight}`}
        >
          <div className="features__icon">
            <svg>
              <use xlinkHref="/img/icons.svg#icon-credit-card"></use>
            </svg>
          </div>
          <h5 className="features__header">Premium debit card included</h5>
          <p>
            Your finances deserve premium treatment. Enjoy zero fees, enhanced
            security, and exclusive rewards with our metal debit card. Tap to
            pay anywhere globally with competitive exchange rates, real-time
            spending notifications, and seamless integration with digital
            wallets—all with no annual fee.
          </p>
        </div>
      </div>
    </section>
  );
}
