import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import MatchBet from "./pages/MatchBet.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { coreDao } from "wagmi/chains";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const config = getDefaultConfig({
  appName: "Cryck",
  projectId: "fe112a459de722551c0e0e651a7522e9",
  chains: [coreDao],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/match",
        element: <MatchBet />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
