import { useState } from 'react';
import { DescentButton, DescentInput } from '@/components';
import useSystemFunctions from '@/hooks/useSystemFunctions';
import { formatAmount } from '@/utils';
import useCollateralActions from '@/application/collateral/actions';
import VaultChanges from './vault-changes';
import { ButtonLoadingState } from '@/components/button/types';

const RepayModal = ({ close }: { close: () => void }) => {
  const { userState, collateralState } = useSystemFunctions();
  const { repayXNGN } = useCollateralActions();

  const { user } = userState;
  const { loadingRepay, loadingApproveRepay } = collateralState;
  const [amount, setAmount] = useState('');

  const loading = loadingRepay || loadingApproveRepay;
  const amountWithoutComma = amount.replace(/,/g, '');
  const debt = formatAmount(user?.borrowedAmount);

  const error =
    Number(amountWithoutComma) > Number(user.borrowedAmount)
      ? 'You cannot repay more than your debt.'
      : '';
  const valid = amount.length > 0 && !error;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    repayXNGN(amountWithoutComma);
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 md:gap-6">
      <div>
        <div className="text-black-100 text-lg md:text-xl font-medium">Repay xNGN</div>
        <div className="text-grey-500 font-medium text-xs md:text-sm">Payback the xNGN you owe</div>
      </div>

      <div>
        <DescentInput
          name="amount"
          label="xNGN to Repay"
          labelAlt={`${debt} xNGN debt`}
          placeholder="0.00"
          valid={valid}
          max={user?.borrowedAmount}
          onChange={setAmount}
          error={error}
        />
      </div>
      <VaultChanges amount={Number(amountWithoutComma)} />
      <div className="mt-2">
        <div>
          <DescentButton
            loadingType={ButtonLoadingState.repay}
            loading={loading}
            disabled={!valid || loading}
            type="submit"
            text="Continue"
          />
        </div>

        <div className="mt-4">
          <DescentButton onClick={close} variant="info" text="Cancel" />
        </div>
      </div>
    </form>
  );
};

export default RepayModal;
