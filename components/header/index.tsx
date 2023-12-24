"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import { LogoIcon, NigeriaFlag, UsdcFlag } from "@/public/icons";
import { DescentAlert, DescentContainer } from "..";
import MenuComponent from "./menu";
import useSystemFunctions from "@/hooks/useSystemFunctions";
import Button from "./button";

const DescentHeader = () => {
  const { collateralState } = useSystemFunctions();
  const [isOpen, setIsOpen] = useState(false);
  const [domLoaded, setDomLoaded] = useState(false);

  const { collateral } = collateralState;

  useEffect(() => {
    setDomLoaded(true);
  }, []);

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
                  href="https://docs.descentdao.com"
                >
                  Docs
                </Link>
                {/* <Link
                  className="ml-6 text-base xl:text-lg font-medium"
                  href="#"
                >
                  Community
                </Link> */}
              </div>
            </div>

            {domLoaded && <Button setOpen={setIsOpen} />}
          </nav>

          <div className="mt-10 xl:mt-16 flex items-center justify-between">
            <div>
              <div className="text-sm md:text-base font-medium text-grey-500">
                Current Market Price
              </div>
              <div className="mt-3 flex items-center gap-2">
                <div className="text-black-100 text-xl md:text-2xl font-medium">
                  ₦{Number(collateral.collateralPrice).toLocaleString()}
                  <span className="text-lg md:text-xl text-grey-500">
                    /USDC
                  </span>
                </div>

                <div className="py-[9px] px-2 md:py-[11px] md:px-5 rounded-[20px] bg-grey-900 flex items-center gap-1">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M2.14664 7.58334L1.83864 7.89367C1.92057 7.97489 2.03127 8.02046 2.14664 8.02046C2.26201 8.02046 2.37271 7.97489 2.45464 7.89367L2.14664 7.58334ZM3.43464 6.92184C3.5171 6.84 3.56367 6.72875 3.56411 6.61257C3.56455 6.49639 3.51881 6.3848 3.43697 6.30234C3.39645 6.26151 3.34828 6.22906 3.29522 6.20685C3.24215 6.18463 3.18523 6.17309 3.12771 6.17287C3.01153 6.17243 2.89993 6.21816 2.81747 6.30001L3.43464 6.92184ZM1.47464 6.30001C1.3918 6.22059 1.28108 6.1769 1.16633 6.17836C1.05159 6.17981 0.942005 6.22629 0.861206 6.30778C0.780407 6.38927 0.734859 6.49924 0.734379 6.61399C0.733899 6.72875 0.778525 6.83909 0.85864 6.92126L1.47464 6.30001ZM10.8593 4.31201C10.8886 4.3625 10.9278 4.40662 10.9744 4.44175C11.0211 4.47689 11.0743 4.50233 11.1309 4.51657C11.1875 4.53082 11.2464 4.53359 11.3042 4.52471C11.3619 4.51583 11.4172 4.49549 11.467 4.46488C11.5167 4.43427 11.5598 4.39401 11.5937 4.34648C11.6276 4.29895 11.6517 4.24511 11.6645 4.18813C11.6773 4.13116 11.6786 4.07219 11.6682 4.01472C11.6578 3.95725 11.6361 3.90244 11.6042 3.85351L10.8593 4.31201ZM7.04606 1.31251C4.10197 1.31251 1.70856 3.68142 1.70856 6.61092H2.58356C2.58356 4.17142 4.57856 2.18751 7.04606 2.18751V1.31251ZM1.70856 6.61092V7.58334H2.58356V6.61092H1.70856ZM2.45522 7.89426L3.43464 6.92184L2.81747 6.30001L1.83747 7.27242L2.45522 7.89426ZM2.45522 7.27301L1.47464 6.30001L0.858056 6.92126L1.83806 7.89309L2.45522 7.27301ZM11.6042 3.85467C11.1253 3.07656 10.4549 2.43428 9.65697 1.9892C8.85905 1.54413 7.95972 1.31114 7.04606 1.31251V2.18751C7.81037 2.18592 8.56289 2.38046 9.23052 2.75253C9.89816 3.1246 10.4592 3.66174 10.8599 4.31259L11.6042 3.85467ZM11.8498 6.41667L12.1572 6.10576C12.0753 6.02489 11.9649 5.97955 11.8498 5.97955C11.7347 5.97955 11.6243 6.02489 11.5424 6.10576L11.8498 6.41667ZM10.5583 7.07759C10.5174 7.118 10.4849 7.16606 10.4626 7.21903C10.4403 7.27201 10.4287 7.32885 10.4284 7.38632C10.4277 7.50239 10.4732 7.61397 10.5548 7.69651C10.6364 7.77904 10.7475 7.82578 10.8635 7.82644C10.9796 7.82709 11.0912 7.78162 11.1737 7.70001L10.5583 7.07759ZM12.5259 7.70001C12.5665 7.74147 12.615 7.77443 12.6685 7.79697C12.722 7.81951 12.7794 7.83118 12.8375 7.8313C12.8955 7.83141 12.953 7.81997 13.0066 7.79765C13.0602 7.77532 13.1088 7.74255 13.1496 7.70125C13.1904 7.65996 13.2226 7.61095 13.2443 7.55709C13.2659 7.50324 13.2766 7.4456 13.2758 7.38756C13.275 7.32951 13.2626 7.27221 13.2394 7.21899C13.2162 7.16578 13.1827 7.11771 13.1407 7.07759L12.5259 7.70001ZM3.10214 9.68684C3.04118 9.58806 2.94348 9.51754 2.83053 9.49079C2.71758 9.46404 2.59863 9.48326 2.49985 9.54421C2.40107 9.60517 2.33054 9.70287 2.3038 9.81582C2.27705 9.92877 2.29627 10.0477 2.35722 10.1465L3.10214 9.68684ZM6.93172 12.6875C9.88456 12.6875 12.2867 10.3203 12.2867 7.38909H11.4117C11.4117 9.82742 9.41089 11.8125 6.93172 11.8125V12.6875ZM12.2867 7.38909V6.41667H11.4117V7.38909H12.2867ZM11.5424 6.10576L10.5583 7.07759L11.1737 7.70001L12.1572 6.72759L11.5424 6.10576ZM11.5424 6.72759L12.5259 7.70001L13.1407 7.07759L12.1572 6.10576L11.5424 6.72759ZM2.35664 10.1459C2.83872 10.9249 3.51222 11.5674 4.31298 12.0123C5.11374 12.4572 6.01509 12.6897 6.93114 12.6875V11.8125C6.16443 11.8146 5.40994 11.6204 4.73957 11.2483C4.0692 10.8762 3.50587 10.3387 3.10214 9.68684L2.35664 10.1459Z"
                      fill="#909090"
                    />
                  </svg>
                  <div className="text-[10px] md:text-xs font-medium text-grey-500">
                    Updates in 20 minutes
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-8 md:gap-9">
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
          </div>
        </header>

        <DescentAlert />
      </DescentContainer>

      <MenuComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default DescentHeader;
