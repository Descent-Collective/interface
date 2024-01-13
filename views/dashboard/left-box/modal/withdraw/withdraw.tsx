import { useState } from 'react';
import { DescentButton, DescentInput } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils';
import useCollateralActions from '@/application/collateral/actions';
import VaultChanges from './vault-changes';
import { ButtonLoadingState } from '@/components/button/types';

const WithdrawModal = ({ close }: { close: () => void }) => {
  const { userState, collateralState } = useSystemFunctions();
  const { withdrawCollateral } = useCollateralActions();

  const [amount, setAmount] = useState('');

  const { user } = userState;
  const { loadingWithdraw } = collateralState;
  const collateral = formatAmount(user?.availableCollateral);
  const amountWithoutComma = amount.replace(/,/g, '');

  const error =
    Number(amountWithoutComma) > Number(user.availableCollateral)
      ? 'You cannot withdraw more than your available collateral.'
      : '';
  const valid = amount.length > 0 && !error;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    withdrawCollateral(amountWithoutComma);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">Withdraw Collateral</div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Withdraw your available USDC
        </div>
      </div>

      <div>
        <DescentInput
          name="amount"
          label="USDC to Withdraw"
          labelAlt={`${collateral} USDC available`}
          placeholder="0.00"
          valid={valid}
          max={user?.availableCollateral}
          onChange={setAmount}
          error={error}
        />
      </div>
      <VaultChanges amount={Number(amountWithoutComma)} />

      <div className="mt-2">
        <div>
          <DescentButton
            key={1}
            loadingType={ButtonLoadingState.withdraw}
            loading={loadingWithdraw}
            disabled={!valid || loadingWithdraw}
            type="submit"
            text="Continue"
          />
        </div>

        <div className="mt-4">
          <DescentButton key={2} onClick={close} variant="info" text="Cancel" />
        </div>
      </div>
    </form>
  );
};

export default WithdrawModal;
