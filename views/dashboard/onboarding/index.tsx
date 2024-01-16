'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { DescentButton, DescentClickAnimation, DescentModal } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { SuccessAltIcon } from '@/public/icons';
import { getLocalStorage, removeLocalStorage } from '@/utils';
import { setDisconnectWallet } from '@/application/user';
import Image from 'next/image';
import { ButtonLoadingState } from '@/components/button/types';
import useSetupActions from '@/application/setup/actions';

const images = [
  'https://res.cloudinary.com/njokuscript/image/upload/v1704908157/deposit_asset_yev0ce.gif',
  'https://res.cloudinary.com/njokuscript/image/upload/v1704908157/borrow_asset_qnqktt.gif',
  'https://res.cloudinary.com/njokuscript/image/upload/v1704908156/repay_asset_bstux4.gif',
  'https://res.cloudinary.com/njokuscript/image/upload/v1704908157/withdraw_asset_ukieiu.gif',
];

const contents = [
  {
    title: 'Collateralise Your Vault.',
    description: 'Fund your vault with USDC to generate enough borrowable asset.',
  },
  {
    title: 'Borrow Asset.',
    description: 'Borrow xNGN from available borrowable asset in your vault.',
  },
  {
    title: 'Pay Back Asset You Owe.',
    description: 'Refund your borrowed asset to be able to retrieve deposited collateral.',
  },
  {
    title: 'Withdraw Your Collateral.',
    description: 'You can take out unlocked USDC from your vault.',
  },
];

const variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 },
};

const Onboarding = () => {
  const { userState, dispatch } = useSystemFunctions();
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const { setupVault } = useSetupActions();

  const [openOnboarding, setOpenOnboarding] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false);

  const { user, loadingSetup, loading, disconnected } = userState;

  const isDisconnected = !isConnected || disconnected;

  const nextStep = () => {
    if (activeStep === 4) {
      return setupVault({
        onSuccess: () => setActiveStep((prev) => prev + 1),
      });
    }

    setActiveStep((prev) => prev + 1);
  };

  const connectModal = () => {
    if (isConnected) {
      removeLocalStorage('@descentWalletDisconnected');
      return dispatch(setDisconnectWallet(false));
    }

    openConnectModal && openConnectModal();
  };

  useEffect(() => {
    if (!loading && !user.hasSetupVault) setOpenOnboarding(true);
  }, [loading, user]);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  useEffect(() => {
    if (!domLoaded) return;

    const isUserConnected = getLocalStorage('@descentWalletDisconnected');
    if (isUserConnected && isUserConnected === 'true') {
      dispatch(setDisconnectWallet(true));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domLoaded]);

  if (domLoaded && isDisconnected && !openOnboarding) {
    return (
      <DescentModal variant="large" close={() => setOpenOnboarding(false)}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="bg-grey-750 rounded-[20px] px-4 py-7 md:py-[44px] w-full flex flex-col justify-center items-center my-6 md:my-[42px]">
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
  }

  if (openOnboarding) {
    return (
      <DescentModal variant="large" close={() => setOpenOnboarding(false)}>
        {activeStep === 4 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-grey-750 rounded-[20px] px-4 py-12 md:py-[64px] w-full flex flex-col justify-center items-center my-16 md:my-[72px]">
              <h2 className="text-black-100 font-medium text-[18px] lg:text-xl">
                Set up your vault.
              </h2>
              <p className="text-center lg:w-[55%] text-sm lg:text-base text-grey-500 font-medium mt-2 mb-5">
                Almost there. Just some necessary final steps. All you have to do is to set up your
                vault by clicking the button below and signing the transaction on the next page.
              </p>

              <div className="w-full md:w-[40%]">
                <DescentButton
                  onClick={nextStep}
                  text="Set up vault"
                  variant="secondary"
                  loading={loadingSetup}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {activeStep === 5 && (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="bg-grey-750 rounded-[20px] px-4 py-12 md:py-[64px] w-full flex flex-col justify-center items-center my-16 md:my-[72px]">
              <SuccessAltIcon />
              <h2 className="text-black-100 font-medium text-[18px] lg:text-xl mt-6">
                Your vault has been set up successfully.
              </h2>
              <p className="text-center lg:w-[55%] text-sm lg:text-base text-grey-500 font-medium mt-2 mb-5">
                You can go ahead to collateralize your vault.
              </p>

              <div className="w-full md:w-[40%]">
                <DescentButton
                  onClick={() => setOpenOnboarding(false)}
                  text="Start Borrowing"
                  variant="secondary"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {activeStep < 4 && (
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-12 xl:gap-[60px] relative">
            <div className="md:w-[65%] xl:w-[57%] flex flex-col md:items-center gap-4">
              <div className="order-2 md:order-1 py-[15px] px-4 rounded-[20px] bg-white flex justify-center items-center w-full h-[300px] md:h-[400px]">
                <Image
                  src={images[activeStep]}
                  height={500}
                  width={500}
                  alt={`Step ${activeStep + 1}`}
                  unoptimized={true}
                />
              </div>

              <div className="order-1 md:order-2 flex items-center gap-3">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    key={index}
                    className={classNames('w-3 h-3 rounded-full', {
                      'bg-grey-950': activeStep !== index,
                      'bg-blue-50': activeStep === index,
                    })}
                  />
                ))}
              </div>
            </div>

            <div className="md:w-[35%] xl:w-[43%]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.5 }}>
                  <h2 className="text-black-100 text-[18px] lg:text-xl font-medium">
                    {contents[activeStep].title}
                  </h2>
                  <p className="text-sm lg:text-base text-grey-500 font-medium mt-2 mb-10">
                    {contents[activeStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              <DescentButton
                loadingType={ButtonLoadingState.setup}
                onClick={nextStep}
                text="Next"
                variant="secondary"
              />
            </div>

            <div className="absolute -top-2.5 md:top-0 right-0">
              <DescentClickAnimation onClick={() => setActiveStep(4)}>
                <button
                  type="button"
                  className="py-[7px] px-5 lg:py-[9px] lg:px-[28px] bg-green-400 rounded-lg cursor-pointer">
                  <div className="text-xs md:text-sm text-black-100 font-medium">Skip</div>
                </button>
              </DescentClickAnimation>
            </div>
          </div>
        )}
      </DescentModal>
    );
  }
};

export default Onboarding;
