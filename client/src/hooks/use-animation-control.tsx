import { useIntersectionObserver } from './use-intersection-observer';
import { useEffect } from 'react';

export function useAnimationControl() {
  const [ref, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '50px'
  });

  useEffect(() => {
    if (ref.current) {
      const element = ref.current;
      if (isVisible) {
        element.classList.add('visible');
        element.classList.remove('animation-paused');
      } else {
        element.classList.remove('visible');
        element.classList.add('animation-paused');
      }
    }
  }, [isVisible]);

  return [ref, isVisible] as const;
}