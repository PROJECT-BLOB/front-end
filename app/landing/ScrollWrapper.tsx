'use client';

import { PropsWithChildren } from 'react';

import { motion } from 'framer-motion';

import useScrollAnimation from '@hooks/useScrollAnimation';

import fadeInVariants from './animations/fadeInAnimation';

export default function ScrollWrapper({ children }: PropsWithChildren) {
  const { ref, animation } = useScrollAnimation();

  return (
    <motion.div ref={ref} variants={fadeInVariants} initial='hidden' animate={animation}>
      {children}
    </motion.div>
  );
}
