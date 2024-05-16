import { Variants } from 'framer-motion';

const fadeInVariants: Variants = {
  hidden: {
    opacity: 0,
    translateY: 0,
  },
  visible: {
    width: '100%',
    opacity: 1,
    translateY: -100,
    transition: {
      duration: 1,
    },
  },
};

export default fadeInVariants;
