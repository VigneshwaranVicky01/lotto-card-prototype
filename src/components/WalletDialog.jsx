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

// <Dialog
//   open={isOpen}
//   onClose={() => {
//     setIsOpen((prev) => !prev);
//   }}
// >
//   <DialogTitle>Pay with Solana Wallet</DialogTitle>
//   <DialogContent>
//     <p>Product: {payload?.productId}</p>
//     <p>Amount: {payload?.amount} SOL</p>
//   </DialogContent>

//   <div style={{ margin: '1rem 0' }}>
//     <WalletMultiButton />
//   </div>

//   {connected && publicKey && (
//     <>
//       <p>Connected Wallet: {publicKey.toBase58()}</p>
//       {/* You can also show balance by fetching via connection.getBalance */}
//       <button onClick={disconnect}>Disconnect Wallet</button>
//     </>
//   )}

//   <button onClick={closePaymentDialog}>Cancel</button>
//   <button
//     onClick={() => {
//       if (!connected) return alert('Please connect a wallet first');
//       // Call payment logic here (e.g., send SOL)
//       console.log('Proceeding with payment...');
//       closePaymentDialog();
//     }}
//   >
//     Pay Now
//   </button>
// </Dialog>
/*  {connected && publicKey && (
          <>
            <Typography
              width='100%'
              variant='caption'
              color='#fff'
              fontWeight='bold'
            >
              Connected Wallet :
            </Typography>
            <Typography
              mt={0.5}
              width='100%'
              overflow='scroll'
              variant='body1'
              color='#fff'
              fontWeight='bold'
            >
              {publicKey.toBase58()}
            </Typography>
            // {/* You can also show balance by fetching via connection.getBalance */
{
  /* <button onClick={disconnect}>Disconnect Wallet</button> */
}
// </>
// )} */
