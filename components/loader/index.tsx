import useSystemFunctions from '@/hooks/useSystemFunctions';
import { BottomLogoIcon, TopLogoIcon } from '@/public/icons';
import { motion } from 'framer-motion';

const DescentLoader = () => {
  const { userState } = useSystemFunctions();

  const { user } = userState;

  if (user.doneFetching) return null;

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
