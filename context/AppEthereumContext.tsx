import * as React from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider";
import { AbstractProvider } from "web3-core";


export interface AppEthereumContextData {
  web3?: Web3;
  account?: string;
}

const AppEthereumContext = React.createContext<AppEthereumContextData>(
  {} as AppEthereumContextData
);

export const AppEthereumProvider: React.FC = ({ children }) => {
  const [web3, setWeb3] = React.useState<Web3 | undefined>(undefined);
  const [account, setAccount] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
    async function loadWeb3Provider() {
      try {
        await loadWeb3();
      } catch (ex) {
        console.log(ex);
      }
    }
    loadWeb3Provider();
  }, [account]);

  async function loadWeb3() {
    const provider = (await detectEthereumProvider()) as AbstractProvider;
    provider.sendAsync(
      {
        method: "eth_requestAccounts",
        jsonrpc: "2.0",
        params: [],
      },
      (error, response) => {
        if (!error) {
          setWeb3(new Web3(provider));
          setAccount(response?.result[0]);
        }
      }
    );
  }

  return (
    <AppEthereumContext.Provider
      value={{
        web3,
        account,
      }}
    >
      {children}
    </AppEthereumContext.Provider>
  );
};

export function useAppEthereumContext(): AppEthereumContextData {
  return React.useContext(AppEthereumContext);
}
