import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Wallet imports
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";


// Walet Config
const { chains, publicClient } = configureChains(
  // TODO CHANGE TO REQUIRED NETWORK(OPTIONAL)
  [sepolia],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  // TODO : ADD YOUR PROJECT ID AND APP NAME FROM CONNECT-WALLET
  appName: "YOUR_PROJECT_NAME",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider
      chains={chains}
      modalSize="compact"
    >
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </RainbowKitProvider>
  </WagmiConfig>,
)
