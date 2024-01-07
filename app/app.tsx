'use client';
import { ReactNode } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { store } from '@/application/store';
import RainbowProvider from '@/config/rainbowkit';
import AppHome from '.';
import { DescentLoader } from '@/components';

const App = ({ children }: { children: ReactNode }) => {
  return (
    <RainbowProvider>
      <ReduxProvider store={store}>
        <AppHome>{children}</AppHome>

        <DescentLoader />
      </ReduxProvider>
    </RainbowProvider>
  );
};

export default App;
