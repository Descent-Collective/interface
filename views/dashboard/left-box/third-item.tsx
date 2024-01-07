import { useState } from 'react';
import classNames from 'classnames';

import { DescentButton, DescentHint, DescentModal } from '@/components';
import RepayModal from './modal/repay';
import WithdrawModal from './modal/withdraw';
import { formatAmount, roundupNumber } from '@/utils';
import useSystemFunctions from '@/hooks/useSystemFunctions';

const ThirdItem = () => {
  const { userState } = useSystemFunctions();

  const { user } = userState;

  const items = [
    {
      title: 'Available to Borrow',
      value: `${formatAmount(roundupNumber(user?.availablexNGN))} xNGN`,
      hint: "The maximum money a user can borrow based on their vault's collateral ratio and deposited collateral, without risking liquidation.",
    },

    {
      title: 'Available Collateral',
      value: `${formatAmount(roundupNumber(user?.availableCollateral))} USDC`,
      hint: 'The highest amount of collateral a user can remove from their vault, calculated from the collateral ratio and deposited collateral, without facing liquidation.',
      buttonText: 'Withdraw',
      disabled: Number(user?.availableCollateral) === 0,
    },

    {
      title: 'Vault xNGN Debt',
      value: `${formatAmount(roundupNumber(user?.borrowedAmount))} xNGN`,
      buttonText: 'Repay',
      disabled: Number(user?.borrowedAmount) === 0,
    },
  ];
  return (
    <div className="bg-white-50 rounded-lg py-6 flex justify-between">
      {items.map((item, index) => (
        <Item key={index} item={item} items={items} index={index} />
      ))}
    </div>
  );
};

const Item = ({ item, index, items }: { item: any; index: number; items: any[] }) => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen(!open);
  };

  const isWithdraw = item.title === 'Available Collateral';
  return (
    <>
      <div
        className={classNames('', {
          'xl:border-r xl:border-grey-700': index < items.length - 1,
          'px-3 md:pl-6 md:pr-10 xl:pr-14': index === 0,
          'px-3 md:px-10 xl:px-14': index > 0,
          'xl:pr-6': index === items.length - 1,
        })}>
        <div className="flex items-center gap-3 xl:gap-5">
          <div>
            <div className="flex items-center xl:justify-center gap-1">
              <div className="text-[9px] md:text-sm font-medium text-grey-500 whitespace-nowrap">
                {item.title}
              </div>
              {item?.hint && <DescentHint text={item?.hint} />}
            </div>
            <div className="mt-2 text-[9.5px] md:text-base font-medium md:font-bold whitespace-nowrap">
              {item.value}
            </div>
          </div>

          {item.buttonText && (
            <div className="hidden md:block md:min-w-[70px]">
              <DescentButton
                disabled={item.disabled}
                variant="action"
                text={item.buttonText}
                onClick={handleModal}
              />
            </div>
          )}
        </div>

        {item.buttonText && (
          <div className="md:hidden min-w-[50px] mt-2">
            <DescentButton
              disabled={item.disabled}
              variant="action"
              text={item.buttonText}
              onClick={handleModal}
            />
          </div>
        )}
      </div>

      {open && (
        <DescentModal close={handleModal}>
          {isWithdraw ? <WithdrawModal close={handleModal} /> : <RepayModal close={handleModal} />}
        </DescentModal>
      )}
    </>
  );
};

export default ThirdItem;
