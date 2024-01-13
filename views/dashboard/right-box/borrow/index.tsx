import { useState } from 'react';

import useCollateralActions from '@/application/collateral/actions';
import { DescentButton, DescentInput } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils';
import VaultChanges from './vault-changes';
import { ButtonLoadingState } from '@/components/button/types';

const liquidationWarning = (
  <div>
    Continuing with this amount may risk vault liquidation. Consider a lower value that takes you
    farther away from the Liquidation Threshold
  </div>
);

const errorMessage = <div>You cannot borrow more than available xNGN generatable</div>;

const BorrowTab = () => {
  const { collateralState, userState } = useSystemFunctions();
  const { borrowXNGN } = useCollateralActions();

  const [amount, setAmount] = useState('');

  const { loadingBorrow, loadingApproveBorrow, collateral } = collateralState;
  const { user } = userState;
  const { availablexNGN } = user;

  const loading = loadingApproveBorrow || loadingBorrow;
  const xNgn = formatAmount(availablexNGN);

  const amountWithoutComma = amount.replace(/,/g, '');
  const error = Number(amountWithoutComma) > Number(availablexNGN) ? errorMessage : '';

  const liquidatableAmount = Number(0.8) * Number(availablexNGN);

  const liquidationError =
    Number(amountWithoutComma) > liquidatableAmount ? liquidationWarning : '';

  const valid = amount.length > 0;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const amountWithoutComma = amount.replace(/,/g, '');

    await borrowXNGN(amountWithoutComma);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">Borrow xNGN</div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">
          Borrow from xNGN in vault
        </div>
      </div>

      <DescentInput
        name="amount"
        label="xNGN to Borrow"
        labelAlt={`${xNgn} xNGN available`}
        placeholder="0.00"
        max={availablexNGN}
        onChange={setAmount}
        error={error || liquidationError}
      />

      <VaultChanges amount={Number(amountWithoutComma)} />
      <div className="mt-2">
        <DescentButton
          loadingType={ButtonLoadingState.borrow}
          loading={loading}
          disabled={!valid || loading || error.toString().length > 0}
          type="submit"
          text="Continue"
        />
      </div>
    </form>
  );
};

export default BorrowTab;
