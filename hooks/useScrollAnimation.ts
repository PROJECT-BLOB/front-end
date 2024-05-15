'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import { useAnimation } from 'framer-motion';

export default function useScrollAnimation() {
  const animation = useAnimation();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView) {
      animation.start('visible');
    } else {
      animation.start('hidden');
    }
  }, [animation, inView]);

  return { ref, animation };
}
