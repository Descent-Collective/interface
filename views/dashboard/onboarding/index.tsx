'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import { DescentButton, DescentClickAnimation, DescentModal } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import useUserActions from '@/application/user/actions';
import { SuccessAltIcon } from '@/public/icons';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

const images = [
  'https://images.unsplash.com/photo-1634108947682-12a8ddfc9b61?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHZhdWx0fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1526948531399-320e7e40f0ca?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFzc2V0fGVufDB8fDB8fHww',
  'https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBheSUyMGJhY2t8ZW58MHx8MHx8fDA%3D',
  'https://images.unsplash.com/photo-1516570161787-2fd917215a3d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHJlY2VpdmUlMjBtb25leXxlbnwwfHwwfHx8MA%3D%3D',
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
  const { userState } = useSystemFunctions();
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const { setupVault } = useUserActions();

  const [openOnboarding, setOpenOnboarding] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [domLoaded, setDomLoaded] = useState(false);

  const { user, loadingSetup, loading } = userState;

  const nextStep = () => {
    if (activeStep === 4) {
      return setupVault({
        onSuccess: () => setActiveStep((prev) => prev + 1),
      });
    }

    setActiveStep((prev) => prev + 1);
  };

  useEffect(() => {
    if (!loading && !user.hasSetupVault) setOpenOnboarding(true);
  }, [loading, user]);

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (domLoaded && !isConnected && openConnectModal && !openOnboarding) {
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
              <DescentButton onClick={openConnectModal} text="Connect Wallet" variant="secondary" />
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
                vault by clicking the button below and signing the agreement on the next page.
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
                  text="Set up vault"
                  variant="secondary"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {activeStep < 4 && (
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-12 xl:gap-[60px] relative">
            <div className="md:w-[65%] xl:w-[57%] flex flex-col md:items-center gap-4">
              <div className="order-2 md:order-1 py-[15px] px-4 rounded-[20px] bg-grey-750 flex justify-center items-center w-full h-[300px] md:h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeStep}
                    src={images[activeStep]}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    variants={variants}
                    transition={{ duration: 0.4 }}
                    alt={`Step ${activeStep + 1}`}
                    className="h-full rounded-[20px] object-cover"
                  />
                </AnimatePresence>
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

              <DescentButton onClick={nextStep} text="Next" variant="secondary" />
            </div>

            <div className="absolute -top-2.5 md:top-0 right-0">
              <DescentClickAnimation>
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
