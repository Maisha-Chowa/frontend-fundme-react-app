import React, { createContext, useContext, useState } from "react";

// Create the context
const WalletContext = createContext();

// Create the provider component
export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0xaa36a7");

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
        seedPhrase,
        setSeedPhrase,
        selectedChain,
        setSelectedChain,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

// Custom hook to use the WalletContext
export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};
