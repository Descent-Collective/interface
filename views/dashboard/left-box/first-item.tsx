import { DescentHint } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';

import { formatAmount, formatLargeNumber, roundupNumber } from '@/utils';
import classNames from 'classnames';
import { memo } from 'react';

const FirstItem = () => {
  const { collateralState } = useSystemFunctions();

  const { collateral } = collateralState;

  const items = [
    {
      title: 'Total Amount Minted',
      value: `${formatAmount(roundupNumber(collateral?.totalBorrowedAmount))} xNGN`,
      hint: 'The complete sum of currency created by all users.',
    },
    {
      title: 'Debt Limit',
      value: `${formatLargeNumber(collateral.debtCeiling)} xNGN`,
      hint: 'The highest total amount of currency all users can collectively borrow.',
    },
    {
      title: 'Liqudiation Threshold',
      value: `${collateral.liquidationThreshold}%`,
      hint: 'The specific collateral ratio at which a vault can be liquidated. It is advisable to keep you collateral ratio below the Liquidation Threshold.',
    },
    {
      title: 'Borrow Interest',
      value: `${Number(roundupNumber(collateral.rate))}%`,
      hint: 'This is an annual percentage yield calculated on top of how much Currency(xNGN) has been generated.',
    },
  ];

  return (
    <div className="py-4 md:py-6 grid grid-cols-2 gap-[22px] xl:gap-0 xl:flex xl:items-center xl:justify-between rounded-xl bg-grey-750 xl:pr-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={classNames('', {
            'pl-3 md:pl-6 pr-10': index === 0,
            'px-3 md:px-6 xl:px-10': index > 0,
            'xl:border-r xl:border-grey-700': index < items.length - 1,
            'xl:pr-0': index === items.length - 1,
          })}>
          <div className="flex items-center xl:justify-center gap-1">
            <div className="text-[9px] md:text-sm font-medium text-grey-500 whitespace-nowrap">
              {item.title}
            </div>
            <DescentHint text={item?.hint} />
          </div>
          <div className="mt-2 text-[9.5px] md:text-base font-medium md:font-bold">
            {item.value}
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(FirstItem);
