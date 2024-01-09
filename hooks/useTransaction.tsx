import React from 'react';
import useAlertActions from '@/application/alert/actions';
import useUserActions from '@/application/user/actions';
import useSystemFunctions from './useSystemFunctions';
import { setLoadingAlert } from '@/application/alert';
import { waitForTransaction } from 'wagmi/actions';
import { setClearInputs } from '@/application/input';
import {
  setLoadingBorrow,
  setLoadingRepay,
  setLoadingSupply,
  setLoadingWithdraw,
} from '@/application/collateral';
import { setBorrow, setSupply } from '@/application/menu';

type TransactionStatus = {
  type: 'approve' | 'deposit' | 'borrow' | 'repay' | 'withdraw';
  amount?: string;
  hash: `0x${string}`;
};

const useTransactionListener = () => {
  const { dispatch } = useSystemFunctions();
  const { alertUser } = useAlertActions();
  const { getVaultInfo, getCollateralInfo } = useUserActions();

  const _clearInputs = () => {
    dispatch(setClearInputs(true));

    setTimeout(() => {
      dispatch(setClearInputs(false));
    }, 1000);
  };

  const reset = () => {
    dispatch(setLoadingAlert(false));
    _clearInputs();

    setTimeout(() => {
      getVaultInfo();
      getCollateralInfo();
    }, 4000);
  };

  const listener = async ({ hash, type, amount }: TransactionStatus) => {
    dispatch(setLoadingAlert(true));
    const receipt = await waitForTransaction({ confirmations: 3, hash });

    if (receipt?.status == 'success') {
      reset();
      switch (type) {
        case 'deposit':
          dispatch(setLoadingSupply(false));
          return alertUser({
            title: 'Bravo! Collateral deposited.',
            variant: 'success',
            message: (
              <div>
                Your collateral deposit of{' '}
                <span className="text-black-100">{Number(amount).toLocaleString()} USDC</span> was
                successful.
              </div>
            ),
          });

        case 'borrow':
          dispatch(setLoadingBorrow(false));
          return alertUser({
            title: 'Bravo! xNGN borrowed.',
            variant: 'success',
            message: (
              <div>
                Your loan of{' '}
                <span className="text-black-100">{Number(amount).toLocaleString()} xNGN</span> has
                been successfully disbursed. Congratulations!
              </div>
            ),
          });

        case 'repay':
          dispatch(setLoadingRepay(false));
          return alertUser({
            title: 'Bravo! Loan Repayed.',
            variant: 'success',
            message: (
              <div>
                Your loan of{' '}
                <span className="text-black-100">{Number(amount).toLocaleString()} xNGN</span> has
                been repayed successfully. Congratulations!
              </div>
            ),
          });

        case 'withdraw':
          dispatch(setLoadingWithdraw(false));
          return alertUser({
            title: 'Bravo! Collateral Withdrawn.',
            variant: 'success',
            message: (
              <div>
                Your withdrawal request of{' '}
                <span className="text-black-100">{Number(amount).toLocaleString()} USDC</span> has
                been successful.
              </div>
            ),
          });
        default:
          break;
      }
    }
  };

  return { listener };
};

export default useTransactionListener;
