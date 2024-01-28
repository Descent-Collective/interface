'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

import { DescentButton, DescentModal } from '@/components';
import { removeLocalStorage } from '@/utils';
import { setDisconnectWallet } from '@/application/user';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const ConnectWallet = ({ setOpenOnboarding }: { setOpenOnboarding: (val: boolean) => void }) => {
  const { dispatch } = useSystemFunctions();
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();

  const connectModal = () => {
    if (isConnected) {
      removeLocalStorage('@descentWalletDisconnected');
      return dispatch(setDisconnectWallet(false));
    }

    openConnectModal && openConnectModal();
  };

  return (
    <DescentModal variant="large" close={() => setOpenOnboarding(false)}>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="bg-grey-750 rounded-[20px] px-4 py-7 md:py-[64px] w-full flex flex-col justify-center items-center">
          <h2 className="text-black-100 font-medium text-[18px] lg:text-xl">
            Connect your wallet.
          </h2>
          <p className="text-center lg:w-[55%] text-sm lg:text-base text-grey-500 font-medium mt-2 mb-5">
            Connect your wallet to continue.
          </p>

          <div className="w-full md:w-[40%]">
            <DescentButton onClick={connectModal} text="Connect Wallet" variant="secondary" />
          </div>
        </motion.div>
      </AnimatePresence>
    </DescentModal>
  );
};

export default ConnectWallet;
