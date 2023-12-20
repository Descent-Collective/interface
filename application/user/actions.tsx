"use client";
import { useAccount } from "wagmi";
import Descent from "@descent-protocol/sdk";

import useSystemFunctions from "@/hooks/useSystemFunctions";
import { setLoading, setUser } from ".";
import { CallbackProps } from "../store";
import { setCollateral } from "../collateral";

const useUserActions = () => {
  const { dispatch } = useSystemFunctions();
  const { address, connector: activeConnector } = useAccount();

  const _descentProvider = async () => {
    try {
      if (!activeConnector) return;

      await activeConnector.connect();

      const connectedProvider = await activeConnector.getProvider();
      const descent = await Descent.create("browser", {
        collateral: "USDC",
        ethereum: connectedProvider,
      });

      return descent;
    } catch (error) {
      console.log(error);
    }
  };

  const setupVault = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const descent = await _descentProvider();
      await descent.setupVault();

      getVaultInfo();

      return callback?.onSuccess?.();
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getVaultInfo = async (callback?: CallbackProps) => {
    try {
      dispatch(setLoading(true));
      const descent = await _descentProvider();
      const vaultInfo = await descent.getVaultInfo(address);
      const hasSetupVault = await descent.getVaultSetupStatus();
      const usdcWalletBalance = await descent.getCollateralTokenBalance(
        address
      );

      const response = { ...vaultInfo, hasSetupVault, usdcWalletBalance };

      return dispatch(setUser(response));
    } catch (error: any) {
      console.log(error);
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

      return dispatch(setCollateral(response));
    } catch (error: any) {
      callback?.onError?.(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    setupVault,
    getVaultInfo,
    getCollateralInfo,
  };
};

export default useUserActions;
