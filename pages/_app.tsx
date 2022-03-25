import "../styles/globals.css";
import type { AppProps } from "next/app";
import Web3 from "web3";
import { AppEthereumProvider } from "../context/AppEthereumContext";
import Layout from "../components/layout/main";
import { AppWrapper } from "../context/AppThemeContext";

declare global {
  interface Window {
    web3: Web3;
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <AppEthereumProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppEthereumProvider>
    </AppWrapper>
  );
}

export default MyApp;
