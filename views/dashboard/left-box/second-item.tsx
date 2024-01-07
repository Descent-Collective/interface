import { DescentHint } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { InfoIcon } from '@/public/icons';
import { formatAmount, roundupNumber } from '@/utils';

const SecondItem = () => {
  const { userState } = useSystemFunctions();

  const { user } = userState;

  const secondItems = [
    {
      title: 'Accrued Interest/Fees',
      value: `${formatAmount(roundupNumber(user?.accruedFees))} xNGN`,
      hint: 'These are the total charges or costs the vault owner must pay, which have added up over time because of the debt from that vault.',
    },
    {
      title: 'Deposited Collateral',
      value: `${formatAmount(roundupNumber(user?.depositedCollateral))} USDC`,
      hint: 'This is the total value of assets or money put into the vault by the vault owner.',
    },
    {
      title: 'Collateral Ratio',
      value: `${roundupNumber(user?.currentCollateralRatio)}%`,
      hint: 'This is the percentage of how much you can borrow against your deposited collateral. For example, an 80% ratio means you can borrow $80 for every $100 of collateral.',
    },
    {
      title: 'Collateral Locked',
      value: `${formatAmount(roundupNumber(user?.collateralLocked))} USDC`,
      hint: "The value of asset loacked in a user's vault that has been used to generate new currencies(xNGN)",
    },
  ];

  return (
    <div className="my-5 md:my-9 py-6 grid grid-cols-2 gap-[22px] xl:gap-0 xl:flex xl:items-center xl:justify-between border-y border-grey-700">
      {secondItems.map((item, index) => (
        <div key={index}>
          <div className="flex items-center xl:justify-center gap-1">
            <div className="text-[9px] md:text-sm font-medium text-grey-500">{item.title}</div>

            <DescentHint text={item?.hint} />
          </div>
          <div className="mt-2 text-[10px] md:text-base font-medium md:font-bold">{item.value}</div>
        </div>
      ))}
    </div>
  );
};

export default SecondItem;
