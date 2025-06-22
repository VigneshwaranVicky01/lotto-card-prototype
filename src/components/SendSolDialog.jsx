// SendSolDialog.jsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useState } from 'react';
import { useWalletDialog } from './WalletDialog'; // <- Context provider you're using

const walletOptions = [
  { name: 'Phantom', value: 'Phantom' },
  { name: 'Solflare', value: 'Solflare' },
];

const SendSolDialog = () => {
  const { open, closeDialog, targetAddress, amount } = useWalletDialog();
  const { connection } = useConnection();
  const { wallet, publicKey, connected, sendTransaction, select, connect } =
    useWallet();

  const [selectedWallet, setSelectedWallet] = useState('Phantom');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!targetAddress || !amount || !selectedWallet) {
      alert('Missing target address, amount or wallet');
      return;
    }
    try {
      setSending(true);

      // Select wallet based
      //  on dropdown
      select('Phantom'); // triggers wallet selection
      await connect(); // triggers wallet popup
      console.log(wallet, publicKey, connected);

      if (!publicKey) {
        alert('Wallet connection failed');
        return;
      }

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(targetAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signature = await sendTransaction(transaction, connection);
      await connection.confirmTransaction(signature, 'confirmed');

      alert('Transaction successful: ' + signature);
      closeDialog();
    } catch (err) {
      console.error('Transaction error:', err);
      alert('Transaction failed: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
    >
      <DialogTitle>Send SOL</DialogTitle>
      <DialogContent>
        <TextField
          label='Recipient Address'
          fullWidth
          value={targetAddress}
          disabled
          margin='dense'
        />
        <TextField
          label='Amount (SOL)'
          fullWidth
          value={amount}
          disabled
          margin='dense'
        />
        <TextField
          label='Choose Wallet'
          select
          fullWidth
          value={selectedWallet}
          onChange={(e) => setSelectedWallet(e.target.value)}
          margin='dense'
        >
          {walletOptions.map((w) => (
            <MenuItem
              key={w.value}
              value={w.value}
            >
              {w.name}
            </MenuItem>
          ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDialog}>Cancel</Button>
        <Button
          onClick={handleSend}
          disabled={sending}
          variant='contained'
          color='primary'
        >
          {sending ? 'Sending...' : 'Send'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendSolDialog;
