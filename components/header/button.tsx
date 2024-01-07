'use client';
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import { MenuIcon, MetamaskIcon } from '@/public/icons';
import { DescentButton, DescentClickAnimation } from '..';
import { formatAddress } from '@/utils';
import useDescent from '@/hooks/useDescent';

const Button = ({ setOpen }: { setOpen: (val: boolean) => void }) => {
  const { openConnectModal } = useConnectModal();
  const { address, isConnected } = useAccount();
  const {} = useDescent();

  return (
    <div className="relative z-10">
      <div>
        {!isConnected && openConnectModal && (
          <div className="min-w-[120px] md:min-w-[180px]">
            <DescentButton onClick={openConnectModal} variant="info" text="Connect Wallet" />
          </div>
        )}

        {address && isConnected && (
          <div className="flex items-center justify-end gap-2">
            <DescentClickAnimation>
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
  );
};

export default Button;
