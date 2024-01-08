'use client';
import { useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { motion } from 'framer-motion';

import { CloseIcon, LogoutIcon, MenuIcon, MetamaskIcon, SmallUsdcIcon } from '@/public/icons';
import { DescentButton, DescentClickAnimation } from '..';
import { formatAddress, formatAmount, setLocalStorage } from '@/utils';
import useDescent from '@/hooks/useDescent';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setDisconnectWallet } from '@/application/user';

const Button = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  const { userState, dispatch } = useSystemFunctions();
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const {} = useDescent();

  const { user, disconnected } = userState;

  const [showModal, setShowModal] = useState(false);

  const usdcBalance = formatAmount(user?.usdcWalletBalance);
  const notConnected = !isConnected || disconnected;
  const connected = address && isConnected && !disconnected;

  const disconnectWallet = () => {
    setLocalStorage('@descentWalletDisconnected', 'true');
    dispatch(setDisconnectWallet(true));
    setShowModal(false);
  };

  return (
    <>
      <div className="relative z-50">
        <div>
          {notConnected && openConnectModal && (
            <div className="min-w-[120px] md:min-w-[180px]">
              <DescentButton onClick={openConnectModal} variant="info" text="Connect Wallet" />
            </div>
          )}

          {connected && (
            <div className="flex items-center justify-end gap-2">
              <DescentClickAnimation onClick={() => setShowModal(true)}>
                <div className="bg-white-150 cursor-pointer border border-white-100 rounded-2xl md:rounded-md h-8 md:h-12 px-[6px] py-[7px] md:p-3 flex justify-center items-center gap-2">
                  <MetamaskIcon />
                  <div className="md:text-lg text-[10px] font-medium text-black-100">
                    {formatAddress(address || '')}
                  </div>
                </div>
              </DescentClickAnimation>

              <DescentClickAnimation>
                <div onClick={() => setOpen(true)} className="md:hidden">
                  <MenuIcon />
                </div>
              </DescentClickAnimation>
            </div>
          )}
        </div>
      </div>

      {isConnected && address && showModal && !disconnected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-screen">
          <div
            onClick={() => setShowModal(false)}
            className="z-10 absolute w-full h-full bg-transparent"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 right-11 md:right-16 top-[72px] md:top-20 min-w-[300px] md:min-w-[360px]">
            <div className="bg-white-50 p-6 md:p-10 rounded-[20px] flex flex-col gap-5 shadow-box">
              <div className="flex items-center justify-between">
                <h3 className="text-black-100 text-lg md:text-2xl font-semibold">Wallet</h3>
                <DescentClickAnimation onClick={() => setShowModal(false)}>
                  <div className="p-2 cursor-pointer flex items-center justify-center rounded-[20px] bg-grey-750">
                    <CloseIcon />
                  </div>
                </DescentClickAnimation>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 flex items-center justify-center rounded-[20px] bg-grey-100">
                  <MetamaskIcon />
                </div>
                <div>
                  <div className="text-black-100 font-semibold text-sm">
                    {formatAddress(address || '')}
                  </div>
                  <div className="mt-1 flex items-center gap-1">
                    <SmallUsdcIcon />
                    <div className="text-grey-500 font-semibold text-xs">{usdcBalance}</div>
                  </div>
                </div>
              </div>

              <DescentButton
                onClick={disconnectWallet}
                variant="action2"
                leftIcon={<LogoutIcon />}
                text="Disconnect Wallet"
              />
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default Button;
