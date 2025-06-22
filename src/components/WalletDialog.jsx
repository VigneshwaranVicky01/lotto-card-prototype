// WalletDialog.jsx
import { createContext, useContext, useState } from 'react';

const WalletDialogContext = createContext();

export const useWalletDialog = () => useContext(WalletDialogContext);

export const WalletDialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [targetAddress, setTargetAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const showDialog = ({ address, amount }) => {
    setTargetAddress(address);
    setAmount(amount);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setTargetAddress('');
    setAmount(0);
  };

  return (
    <WalletDialogContext.Provider
      value={{ open, targetAddress, amount, showDialog, closeDialog }}
    >
      {children}
    </WalletDialogContext.Provider>
  );
};
