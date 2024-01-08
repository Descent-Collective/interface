import { DescentHint } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { InfoIcon } from '@/public/icons';
import { formatAmount } from '@/utils';
import { ethers } from 'ethers';

const VaultChanges = ({ amount }: { amount: number }) => {
  const { collateralState, userState } = useSystemFunctions();
  const { user } = userState;
  const { collateral } = collateralState;

  const collateralWorthInCurrency =
    (Number(user.availableCollateral) - amount / Number(collateral.collateralPrice)) *
    Number(collateral.collateralPrice);
  const newCollateralRatio =
    ((Number(user.availablexNGN) / Number(collateralWorthInCurrency)) * 100) / 1;

  // ( newCollateralRatio/ liquidationThreshold) * (currentPrice / 1)

  const liquidationPrice =
    (Number(newCollateralRatio) / Number(collateral.liquidationThreshold)) *
    (Number(collateral.collateralPrice) / 1);

  const vaultChanges = [
    {
      title: 'Collateral Locked',
      value: `${formatAmount(Number(user.collateralLocked))} USDC`,
    },
    {
      title: 'Collateral Ratio',
      // borrowed amount / deposited collateral * collateral price
      value: `${newCollateralRatio.toFixed(2)}%`,
    },
    {
      title: 'Liquidation Price',
      value: `₦${liquidationPrice.toFixed(2)}/USDC`,
    },
    {
      title: 'Vault xNGN Debt',
      value: `${formatAmount(Number(user.borrowedAmount) + Number(amount))} xNGN`,
    },
    {
      title: 'Available Collateral',
      value: `${formatAmount(Number(user.availableCollateral) - Number(amount))} USDC`,
    },
    {
      title: 'Available to Borrow',
      value: `${formatAmount(
        Number(user.availablexNGN) - amount * Number(collateral.collateralPrice),
      )} xNGN`,
    },
  ];

  if (amount > 0) {
    return (
      <div>
        <div className="flex items-center justify-between mb-[13px]">
          <h3 className="font-semibold text-[10px] md:text-xs text-black-50">Vault Changes</h3>
          <DescentHint text={'New vault changes based on deposited amount'} />
        </div>

        <div className="gap-[18px] grid grid-cols-1">
          {vaultChanges.map((item) => (
            <div
              key={item.title}
              className="flex items-center justify-between text-[10px] md:text-xs font-medium">
              <div className="text-grey-500">{item.title}</div>
              <div className="text-black-50 max-w-[50%] text-right">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

export default VaultChanges;
