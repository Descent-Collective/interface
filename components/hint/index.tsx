import { useState } from 'react';
import { motion } from 'framer-motion';

import { HintIcon, InfoIcon } from '@/public/icons';
import { Hint } from './types';

const DescentHint = ({ text }: Hint) => {
  const [showHint, setShowHint] = useState(false);
  return (
    <div>
      <div
        onMouseLeave={() => setShowHint(false)}
        onMouseEnter={() => setShowHint(true)}
        className="cursor-pointer">
        <InfoIcon />
      </div>

      {text && showHint && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative z-50 top-10 md:top-12 -left-20 md:-left-28">
          <div className="absolute rotate-180 -top-6 z-50 left-7">
            <HintIcon />
          </div>
          <div className="bg-white-400 shadow-wide-box p-4 md:p-6 rounded-xl absolute w-[230px] md:w-[500px] z-40">
            <div className="text-[11px] md:text-base text-black-50">{text}</div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DescentHint;
