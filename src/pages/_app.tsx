import { FC } from "react";
import type { AppProps } from "next/app";
import "@Styles/globals.scss";
import AppLayout from "@Layouts/AppLayout";
import { UseWalletProvider } from "use-wallet";

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const walletConnectors = {
    injected: { chainId: [80001] },
  };
  return (
    <UseWalletProvider connectors={walletConnectors} autoConnect>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </UseWalletProvider>
  );
};

export default App;
