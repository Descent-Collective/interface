import useAlertActions from '@/application/alert/actions';
import useCollateralActions from '@/application/collateral/actions';
import useUserActions from '@/application/user/actions';
import React, { useState, useEffect } from 'react';
import { useWaitForTransaction } from 'wagmi';
import useSystemFunctions from './useSystemFunctions';
import { setLoadingAlert } from '@/application/alert';
import { waitForTransaction } from 'wagmi/actions';

type TransactionStatus = {
  type: 'approve' | 'deposit' | 'borrow' | 'repay' | 'withdraw';
  amount?: string;
  hash: `0x${string}`;
};

type Data = {
  [key: `0x${string}`]: {
    type: 'approve' | 'deposit' | 'borrow' | 'repay' | 'withdraw';
    amount?: string;
  };
};

const useTransactionListener = () => {
  const { dispatch } = useSystemFunctions();
  const { alertUser } = useAlertActions();
  const { getVaultInfo, getCollateralInfo } = useUserActions();

  const [transactionHash, setTransactionHash] = useState<`0x${string}` | undefined>(undefined);
  const [data, setData] = useState<Data>();

  const {
    data: receipt,
    isError,
    isLoading,
  } = useWaitForTransaction({
    hash: transactionHash,
    enabled: !!transactionHash, // Only enable when transactionHash is not null
    confirmations: 2,
  });

  const listener = ({ hash, type, amount }: TransactionStatus) => {
    setTransactionHash(hash);
    setData({
      ...data,
      [hash]: {
        type,
        amount,
      },
    });
  };

  const reset = (hash: `0x${string}`) => {
    dispatch(setLoadingAlert(false));
    setTransactionHash(undefined);
    delete data?.[hash!];
    setTimeout(() => {
      getVaultInfo();
      getCollateralInfo();
    }, 4300);
  };

  const checkTransactionStatus = async () => {
    const hashDetails = data?.[transactionHash!];
    if (!hashDetails) return;

    const { type, amount } = hashDetails;

    const receipt = await waitForTransaction({ confirmations: 3, hash: transactionHash! });

    if (receipt?.status == 'success') {
      switch (type) {
        case 'deposit':
          reset(transactionHash!);
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
          reset(transactionHash!);
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
          reset(transactionHash!);
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
          reset(transactionHash!);
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

    if (isError) {
      // There was an error with the transaction
    }

    if (isLoading) {
      // Transaction is still pending
    }
  };

  useEffect(() => {
    checkTransactionStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receipt, isError, isLoading, transactionHash]);

  return { listener };
};

export default useTransactionListener;
