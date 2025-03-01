import { useEffect } from 'react';

type IntersectionCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

interface UseIntersectionObserverOptions extends IntersectionObserverInit {
  onlyOnce?: boolean;
}

/**
 * Custom hook for Intersection Observer API
 * @param targets - DOM elements to observe
 * @param callback - Callback function when intersection occurs
 * @param options - IntersectionObserver options
 */
export default function useIntersectionObserver(
  targets: Element | Element[] | null,
  callback: IntersectionCallback,
  options: UseIntersectionObserverOptions = {}
) {
  useEffect(() => {
    if (!targets || (Array.isArray(targets) && targets.length === 0)) return;

    const { onlyOnce = false, ...observerOptions } = options;

    const observer = new IntersectionObserver((entries, observer) => {
      callback(entries, observer);

      // If onlyOnce is true, unobserve elements that have intersected
      if (onlyOnce) {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
          }
        });
      }
    }, observerOptions);

    if (Array.isArray(targets)) {
      targets.forEach(target => observer.observe(target));
    } else {
      observer.observe(targets);
    }

    return () => {
      if (Array.isArray(targets)) {
        targets.forEach(target => observer.unobserve(target));
      } else {
        observer.unobserve(targets);
      }
      observer.disconnect();
    };
  }, [targets, callback, options]);
}
