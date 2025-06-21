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

  const handleSend = useCallback(async () => {
    if (!currentWalletAdapter || !targetAddress || !amount) return;

    try {
      setSending(true);
      await currentWalletAdapter.connect();

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: currentWalletAdapter?.publicKey,
          toPubkey: new PublicKey(targetAddress),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const blockhash = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash.blockhash;
      transaction.feePayer = currentWalletAdapter?.publicKey;

      const signedTx = await currentWalletAdapter.signTransaction(transaction);
      const sig = await connection.sendRawTransaction(signedTx.serialize());
      await connection.confirmTransaction(sig, 'confirmed');

      alert('Success! Signature: ' + sig);
      currentWalletAdapter.disconnect();
      closeDialog();
    } catch (e) {
      console.error(e);
      alert('Transaction failed!');
    } finally {
      setSending(false);
    }
  }, [currentWalletAdapter, targetAddress, amount, connection, closeDialog]);

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
