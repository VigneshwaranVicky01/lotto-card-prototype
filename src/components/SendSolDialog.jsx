// SendSolDialog.tsx
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from '@mui/material';
import { useConnection } from '@solana/wallet-adapter-react';
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useCallback, useMemo, useState } from 'react';

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { useWalletDialog } from './WalletDialog';

const walletAdapters = [
  { name: 'Phantom', adapter: new PhantomWalletAdapter() },
  { name: 'Solflare', adapter: new SolflareWalletAdapter() },
];

const SendSolDialog = () => {
  const { open, closeDialog, targetAddress, amount } = useWalletDialog();
  const { connection } = useConnection();

  const [selectedWallet, setSelectedWallet] = useState('Phantom');
  const [sending, setSending] = useState(false);

  const currentWalletAdapter = useMemo(() => {
    return walletAdapters.find((w) => w.name === selectedWallet)?.adapter;
  }, [selectedWallet]);

  const handleSend = async () => {
    if (!targetAddress || !amount || !selectedWallet) {
      alert('Missing target address, amount or wallet');
      return;
    }

    // Get the selected wallet adapter instance
    const adapterEntry = walletAdapters.find((w) => w.name === selectedWallet);
    if (!adapterEntry) {
      alert('Wallet adapter not found');
      return;
    }

    const adapter = adapterEntry.adapter;

    try {
      setSending(true);

      // 🔌 Connect wallet (if not already connected)
      if (!adapter.connected) {
        await adapter.connect();
      }

      if (!adapter.publicKey) {
        alert('Wallet failed to connect.');
        return;
      }

      // 🧾 Create the transfer transaction
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: adapter.publicKey,
          toPubkey: new PublicKey(targetAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = adapter.publicKey;

      // ✍️ Sign and send
      const signedTx = await adapter.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(
        signedTx.serialize()
      );

      // ⏳ Wait for confirmation
      await connection.confirmTransaction(signature, 'confirmed');

      alert('Transaction successful: ' + signature);
      await adapter.disconnect(); // 🔌 Optional: Disconnect wallet
      closeDialog(); // ❌ Close dialog
    } catch (err) {
      console.error('Transaction failed:', err);
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
          {walletAdapters.map((w) => (
            <MenuItem
              key={w.name}
              value={w.name}
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
