'use client';
import { useAccount } from 'wagmi';
import Descent from '@descent-protocol/sdk';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setLoadingSetup } from '.';
import { CallbackProps } from '../store';
import { setLoadingAlert } from '../alert';
import useTransactionListener from '@/hooks/useTransaction';

const useSetupActions = () => {
  const { dispatch } = useSystemFunctions();
  const { connector: activeConnector } = useAccount();
  const { listener } = useTransactionListener();
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

  const setupVault = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoadingSetup(true));
      const descent = await _descentProvider();
      setTimeout(() => {
        dispatch(setLoadingAlert(true));
      }, 2800);
      const response = await descent.setupVault();

      await listener({
        hash: response?.hash,
        type: 'setup',
      });
      return callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoadingSetup(false));
    }
  };
  return {
    setupVault,
  };
};

export default useSetupActions;
