'use client';
import { useAccount, useWaitForTransaction } from 'wagmi';
import Descent from '@descent-protocol/sdk';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setLoading, setLoadingSetup, setUser } from '.';
import { CallbackProps } from '../store';
import { setCollateral } from '../collateral';
import { setLoadingAlert } from '../alert';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import useTransactionListener from '@/hooks/useTransaction';

const useUserActions = () => {
  const { dispatch } = useSystemFunctions();
  const { address, connector: activeConnector } = useAccount();

  const _descentProvider = async () => {
    try {
      if (!activeConnector) return;

      await activeConnector.connect();

      const connectedProvider = await activeConnector.getProvider();
      const descent = await Descent.create('browser', {
        collateral: 'USDC',
        ethereum: connectedProvider,
      });

      return descent;
    } catch (error) {}
  };

  const getVaultInfo = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const descent = await _descentProvider();
      const vaultInfo = await descent.getVaultInfo(address);
      const hasSetupVault = await descent.getVaultSetupStatus();
      const usdcWalletBalance = await descent.getCollateralTokenBalance(address);

      const newVaultInfo = {
        healthFactor: vaultInfo?.healthFactor,
        depositedCollateral: ethers.formatUnits(vaultInfo.depositedCollateral?.toString(), 6),
        collateralLocked: `${ethers.formatUnits(vaultInfo.collateralLocked?.toString(), 6)}`,
        borrowedAmount: ethers.formatUnits(vaultInfo.borrowedAmount?.toString(), 18),
        accruedFees: ethers.formatUnits(vaultInfo.accruedFees?.toString(), 18),
        currentCollateralRatio: `${ethers.formatUnits(
          vaultInfo.currentCollateralRatio?.toString(),
          18,
        )}`,
        availableCollateral: ethers.formatUnits(vaultInfo.availableCollateral?.toString(), 6),
        availablexNGN: ethers.formatUnits(vaultInfo.availablexNGN?.toString(), 18),
        doneFetching: true,
      };

      const response = { ...newVaultInfo, hasSetupVault, usdcWalletBalance };

      return dispatch(setUser(response));
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
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
        liquidationThreshold: ethers.formatUnits(response?.liquidationThreshold?.toString(), 18),
        debtCeiling: ethers.formatUnits(response?.debtCeiling?.toString(), 18),
        rate: ethers.formatUnits(BigInt(response?.rate)?.toString(), 18),
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

  return {
    getVaultInfo,
    getCollateralInfo,
  };
};

export default useUserActions;
