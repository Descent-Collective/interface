import { useState } from 'react';

import useCollateralActions from '@/application/collateral/actions';
import { DescentButton, DescentInput } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils';
import VaultChanges from './vault-changes';
import { ButtonLoadingState } from '@/components/button/types';

const SupplyTab = () => {
  const { collateralState, userState } = useSystemFunctions();
  const { depositCollateral } = useCollateralActions();
  const [amount, setAmount] = useState('');
  const [generated, setGenerated] = useState('');

  const { loadingSupply, loadingApproveSupply, collateral } = collateralState;
  const { collateralPrice, liquidationThreshold } = collateral;
  const { user } = userState;

  const loading = loadingApproveSupply || loadingSupply;
  const buttonLoading = loadingApproveSupply
    ? ButtonLoadingState.approve
    : ButtonLoadingState.deposit;
  const amountWithoutComma = amount.replace(/,/g, '');
  const _generated = !amountWithoutComma
    ? ''
    : Number(amountWithoutComma) * Number(collateralPrice) * (Number(liquidationThreshold) / 100);
  const error =
    Number(amountWithoutComma) > Number(user.usdcWalletBalance)
      ? 'You cannot deposit more collateral than the amount in your wallet.'
      : '';

  const valid = amount.length > 0 && !error;
  const usdcBalance = formatAmount(user.usdcWalletBalance);

  const handleChange = (val: string) => {
    setAmount(val);
    const valueWithoutComma = val.replace(/,/g, '');

    const _amount = Number(valueWithoutComma);

    const _generated = !_amount
      ? ''
      : _amount * Number(collateralPrice) * (Number(liquidationThreshold) / 100);

    setGenerated(_generated.toLocaleString());
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amountWithoutComma = amount.replace(/,/g, '');

    depositCollateral(amountWithoutComma);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">Deposit collateral</div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Fund your vault with USDC
        </div>
      </div>

      <DescentInput
        name="amount"
        label="USDC to Deposit"
        labelAlt={`Balance: ${usdcBalance}`}
        placeholder="0.00"
        max={user.usdcWalletBalance}
        onChange={handleChange}
        error={error}
      />

      <DescentInput
        name="generated"
        label="Generated xNGN"
        placeholder="0.00"
        disabled
        value={generated}
      />

      <VaultChanges amount={Number(amountWithoutComma)} generated={Number(_generated)} />

      <div className="mt-2">
        <DescentButton
          loadingType={buttonLoading}
          loading={loading}
          disabled={!valid || loading}
          type="submit"
          text="Continue"
        />
      </div>
    </form>
  );
};

export default SupplyTab;
