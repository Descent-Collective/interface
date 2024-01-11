'use client';
import Descent from '@descent-protocol/sdk';
import { useAccount } from 'wagmi';
import { waitForTransaction } from 'wagmi/actions';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import {
  setCollateral,
  setLoading,
  setLoadingApproveBorrow,
  setLoadingApproveRepay,
  setLoadingApproveSupply,
  setLoadingBorrow,
  setLoadingRepay,
  setLoadingSupply,
  setLoadingWithdraw,
} from '.';
import { CallbackProps } from '../store';
import useAlertActions from '../alert/actions';
import useTransactionListener from '@/hooks/useTransaction';
import { setLoadingAlert } from '../alert';
import { ethers } from 'ethers';

const useCollateralActions = () => {
  const { dispatch } = useSystemFunctions();
  const { address, connector: activeConnector } = useAccount();

  const { alertUser } = useAlertActions();
  const { listener } = useTransactionListener();

  const _descentProvider = async () => {
    try {
      if (!activeConnector) return;

      await activeConnector.connect();

      const connectedProvider = await activeConnector.getProvider();
      const descentApp = await Descent.create('browser', {
        collateral: 'USDC',
        ethereum: connectedProvider,
      });

      return descentApp;
    } catch (error) {}
  };

  const getCollateralInfo = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const descent = await _descentProvider();
      const response = await descent.getCollateralInfo();

      const newResponse = {
        totalDepositedCollateral: ethers.formatUnits(
          response?.totalDepositedCollateral?.toString(),
          6,
        ),
        totalBorrowedAmount: ethers.formatUnits(response?.totalBorrowedAmount?.toString(), 18),
        liquidationThreshold: ethers.formatUnits(response?.liquidationThreshold?.toString(), 16),
        debtCeiling: ethers.formatUnits(response?.debtCeiling?.toString(), 18),
        rate: ethers.formatUnits(BigInt(response?.rate)?.toString(), 16),
        minDeposit: ethers.formatUnits(response?.minDeposit?.toString(), 18),
        collateralPrice: ethers.formatUnits(response?.collateralPrice?.toString(), 6),
      };

      return dispatch(setCollateral(newResponse));
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const depositCollateral = async (amount: string, callback?: CallbackProps) => {
    try {
      const descent = await _descentProvider();

      const allowance = await descent.collateralTokenAllowance(address);
      console.log(allowance, 'here');
      if (allowance >= amount) {
        dispatch(setLoadingSupply(true));

        await _depositCollateralAfterApproval(amount);
        return callback?.onSuccess?.();
      }

      dispatch(setLoadingApproveSupply(true));

      const approve = await descent.approveCollateral!(amount);
      const receipt = await waitForTransaction({ confirmations: 3, hash: approve?.hash });

      if (receipt?.status == 'success') {
        await _depositCollateralAfterApproval(amount);
        return callback?.onSuccess?.();
      }

      return callback?.onSuccess?.();
    } catch (error: any) {
      dispatch(setLoadingAlert(false));
      callback?.onError?.(error);

      alertUser({
        title: 'Collateral deposited unsuccessful.',
        variant: 'error',
        message: (
          <div>
            Your collateral deposit of{' '}
            <span className="text-black-100">{Number(amount).toLocaleString()} USDC</span> was not
            successful. Please try again.
          </div>
        ),
      });
    }
  };

  const borrowXNGN = async (amount: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingBorrow(true));

      const descent = await _descentProvider();

      const response = await descent.borrowCurrency(amount);

      listener({
        hash: response?.hash,
        amount,
        type: 'borrow',
      });
      return callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
      dispatch(setLoadingBorrow(false));

      alertUser({
        title: 'Borrow unsuccessful.',
        variant: 'error',
        message: (
          <div>
            Your loan of{' '}
            <span className="text-black-100">{Number(amount).toLocaleString()} xNGN</span> was not
            successful. Please try again.
          </div>
        ),
      });
    }
  };

  const repayXNGN = async (amount: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingRepay(true));
      const descent = await _descentProvider();

      const response = await descent.repayCurrency(amount);

      listener({
        hash: response?.hash,
        amount,
        type: 'repay',
      });
      return callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
      dispatch(setLoadingRepay(false));

      alertUser({
        title: 'Loan repayment unsuccessful.',
        variant: 'error',
        message: (
          <div>
            Your loan repayment of{' '}
            <span className="text-black-100">{Number(amount).toLocaleString()} xNGN</span> was not
            successful. Please try again.
          </div>
        ),
      });
    }
  };

  const withdrawCollateral = async (amount: string, callback?: CallbackProps) => {
    try {
      dispatch(setLoadingWithdraw(true));

      const descent = await _descentProvider();

      const response = await descent.withdrawCollateral(amount);

      listener({
        hash: response?.hash,
        amount,
        type: 'withdraw',
      });
      return callback?.onSuccess?.(response);
    } catch (error: any) {
      callback?.onError?.(error);
      dispatch(setLoadingWithdraw(false));

      alertUser({
        title: 'Collateral withdrawal unsuccessful.',
        variant: 'error',
        message: (
          <div>
            Your withdrawal request of{' '}
            <span className="text-black-100">{Number(amount).toLocaleString()} USDC</span> was not
            successful. Please try again.
          </div>
        ),
      });
    }
  };

  const _depositCollateralAfterApproval = async (amount: string) => {
    try {
      dispatch(setLoadingApproveSupply(false));
      dispatch(setLoadingSupply(true));

      const descent = await _descentProvider();

      const response = await descent.depositCollateral(amount);

      listener({
        hash: response?.hash,
        amount,
        type: 'deposit',
      });
    } catch (error: any) {
      dispatch(setLoadingSupply(false));
      alertUser({
        title: 'Collateral deposited unsuccessful.',
        variant: 'error',
        message: (
          <div>
            Your collateral deposit of{' '}
            <span className="text-black-100">{Number(amount).toLocaleString()} USDC</span> was not
            successful. Please try again.
          </div>
        ),
      });
    }
  };

  return {
    getCollateralInfo,
    depositCollateral,
    borrowXNGN,
    repayXNGN,
    withdrawCollateral,
  };
};

export default useCollateralActions;
