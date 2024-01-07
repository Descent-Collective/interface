import { motion } from 'framer-motion';
import { ClickAnimation } from './types';

const DescentClickAnimation = ({ children, onClick }: ClickAnimation) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.9 }}>
      {children}
    </motion.button>
  );
};

export default DescentClickAnimation;
