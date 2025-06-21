// WalletDialogContext.tsx
import React, { createContext, useState, useContext } from 'react';

const WalletDialogContext = createContext(null);

export const useWalletDialog = () => useContext(WalletDialogContext);

export const WalletDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [targetAddress, setTargetAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const showDialog = (address, amount) => {
    setTargetAddress(address);
    setAmount(amount);
    setOpen(true);
  };

  const closeDialog = () => setOpen(false);

  return (
    <WalletDialogContext.Provider
      value={{ open, targetAddress, amount, showDialog, closeDialog }}
    >
      {children}
    </WalletDialogContext.Provider>
  );
};
