import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  coreDao,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";

const coreDaoTestnet = {
  id: 1115,
  name: 'Core Chain TestNet',
  nativeCurrency: { name: 'tCORE', symbol: 'tCORE', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.test.btcs.network'] },
  },
  blockExplorers: {
    default: { name: 'CoreDaoTestnet', url: 'https://scan.test.btcs.network' },
  },
  
};

const config = getDefaultConfig({
  appName: 'Cryck',
  projectId: 'fe112a459de722551c0e0e651a7522e9',
  chains: [coreDaoTestnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>,
)
