import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAccount } from 'wagmi';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { BottomLogoIcon, TopLogoIcon } from '@/public/icons';

const DescentLoader = () => {
  const { userState } = useSystemFunctions();
  const { isConnected } = useAccount();

  const [showLoader, setShowLoader] = useState(true);

  const { user } = userState;

  useEffect(() => {
    setTimeout(() => {
      setShowLoader(false);
    }, 3500);
  }, []);

  if (user.doneFetching || (!isConnected && !showLoader)) return null;

  return (
    <div className="bg-white-50 fixed top-0 left-0 h-screen w-screen z-[9999999] flex flex-col justify-center items-center">
      <div className="relative">
        <TopLogoIcon />
        <motion.div
          className="absolute top-[17px]"
          animate={{ x: [0, -4], y: 0 }}
          transition={{ repeat: Infinity, repeatType: 'reverse', duration: 0.8 }}>
          <BottomLogoIcon />
        </motion.div>
      </div>
    </div>
  );
};

export default DescentLoader;
