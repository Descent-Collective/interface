import '@rainbow-me/rainbowkit/styles.css';
import { ReactNode } from 'react';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { baseSepolia } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

export const availableChains = [baseSepolia];

const { chains, publicClient } = configureChains(availableChains, [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: process.env.NEXT_PUBLIC_APP_NAME!,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID!,
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const RainbowProvider = ({ children }: { children: ReactNode }) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
};

export default RainbowProvider;
