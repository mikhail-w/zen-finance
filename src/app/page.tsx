'use client';

import { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Header from '@/components/Header';
// import Features from '@/components/Features/Features';
// import Operations from '@/components/Operations/Operations';
// import Testimonials from '@/components/Testimonials/Testimonials';
// import SignUp from '@/components/SignUp';
// import Footer from '@/components/Footer';
// import Modal from '@/components/Modal';

export default function Home() {
  useEffect(() => {
    // Reveal sections
    const allSections = document.querySelectorAll('.section');
    const revealSection = function (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;

      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
      root: null,
      threshold: 0.15,
    });

    allSections.forEach(section => {
      sectionObserver.observe(section);
      section.classList.add('section--hidden');
    });

    // Lazy loading images
    const imgTargets =
      document.querySelectorAll<HTMLImageElement>('img[data-src]');
    const loadImg = function (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) {
      const [entry] = entries;
      if (!entry.isIntersecting) return;

      // Replace src with data-src
      const target = entry.target as HTMLImageElement;
      const dataSrc = target.dataset.src;

      if (dataSrc) {
        target.src = dataSrc;
      }

      target.addEventListener('load', function () {
        target.classList.remove('lazy-img');
      });

      observer.unobserve(target);
    };

    const imgObserver = new IntersectionObserver(loadImg, {
      root: null,
      threshold: 0,
      rootMargin: '200px',
    });

    imgTargets.forEach(img => imgObserver.observe(img));

    return () => {
      // Cleanup observers
      sectionObserver.disconnect();
      imgObserver.disconnect();
    };
  }, []);

  return (
    <main>
      <Navigation />
      <Header />
      {/* <Features />
      <Operations />
      <Testimonials />
      <SignUp />
      <Footer />
      <Modal /> */}
    </main>
  );
}
