'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { BaseIcon, LogoIcon, NigeriaFlag, UsdcFlag } from '@/public/icons';
import { DescentAlert, DescentClickAnimation, DescentContainer } from '..';
import MenuComponent from './menu';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import Button from './button';

const DescentHeader = () => {
  const { collateralState, userState } = useSystemFunctions();
  const [isOpen, setIsOpen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const { user } = userState;
  const { collateral } = collateralState;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

  const collateralWorthInCurrency =
    Number(user.depositedCollateral) * Number(collateral.collateralPrice);
  const newCollateralRatio =
    ((Number(user.borrowedAmount) / Number(collateralWorthInCurrency)) * 100) / 1;

  // ( newCollateralRatio/ liquidationThreshold) * (currentPrice / 1)

  const liquidationPrice =
    (Number(newCollateralRatio) / Number(collateral.liquidationThreshold)) *
    (Number(collateral.collateralPrice) / 1);

  return (
    <>
      <DescentContainer>
        <header className="bg-white-50">
          <nav className="flex items-center justify-between pt-5">
            <div className="flex items-center gap-6 relative z-10">
              <Link href="/">
                <LogoIcon />
              </Link>
              <div className="items-center gap-6 hidden md:flex">
                <div className="w-[1px] h-[39px] bg-grey-100" />
                <Link
                  className="text-base xl:text-lg font-medium"
                  href="https://docs.descentdao.com">
                  Docs
                </Link>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 z-30">
              <a
                href="https://faucet.circle.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:block">
                <DescentClickAnimation>
                  <button
                    type="button"
                    className="h-12 mr-2 py-3 px-[14px] rounded-3xl border border-black-100 font-medium text-base text-black-100">
                    Get Test USDC
                  </button>
                </DescentClickAnimation>
              </a>
              <div className="hidden md:block">
                <div className="h-12 py-[13px] px-3 flex items-center gap-1 rounded-lg border border-white-100 bg-grey-1000">
                  <BaseIcon />
                  <div className="font-medium text-base text-black-100">Base Sepolia</div>
                </div>
              </div>
              {domLoaded && <Button setOpen={setIsOpen} />}
            </div>
          </nav>

          <div className="mt-10 xl:mt-16 flex items-center justify-between">
            <div>
              <div className="text-sm md:text-base font-medium text-grey-500">
                Current Market Price
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="text-black-100 text-xl md:text-2xl font-medium">
                  ₦{Number(collateral.collateralPrice).toLocaleString()}
                  <span className="text-lg md:text-xl text-grey-500">/USDC</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-8 md:gap-9 right-0">
                <div className="relative">
                  <div className="z-20 relative ">
                    <UsdcFlag />
                  </div>
                  <div className="absolute top-0 left-5 rounded-full">
                    <NigeriaFlag />
                  </div>
                </div>
                <div className="text-sm md:text-base font-medium hidden md:block">
                  USDC - xNGN Vault
                </div>
              </div>

              <div className="hidden lg:block mt-3 px-[14px] py-3 rounded-[20px] border border-white-450 bg-white-500 text-xs font-medium text-grey-500">
                Your Vault Liquidation Price: ₦
                {Number.isNaN(liquidationPrice) ? '0.00' : liquidationPrice.toFixed(2)}
                /USDC
              </div>
            </div>
          </div>
        </header>

        <DescentAlert />
      </DescentContainer>

      <MenuComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DescentHeader;
