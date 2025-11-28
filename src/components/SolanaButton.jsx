import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from '@solana/web3.js';
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

const receiverAddress = '9NQ9MgmpVe1wrzn5WvXdrxapChTeoQtgbSkHgNpVqRpT'; // Replace with your wallet address

const WALLET_LIST = [
  { name: 'Phantom', key: 'phantom', providerPath: 'phantom' },
  { name: 'Solflare', key: 'solflare', providerPath: 'solflare' },
  { name: 'Backpack', key: 'backpack', providerPath: 'backpack' },
];

export default function SolanaWalletDialog() {
  const [status, setStatus] = useState('Idle');
  const [walletDialogOpen, setWalletDialogOpen] = useState(false);

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  const handleOpenDialog = () => {
    setWalletDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setWalletDialogOpen(false);
  };

  const getProviderFromWindow = (providerPath) => {
    const parts = providerPath.split('.');
    let provider = window;
    for (const part of parts) {
      provider = provider?.[part];
    }
    return provider;
  };

  const openSolanaPayLink = () => {
    const recipient = receiverAddress;
    const amount = 0.01;
    const label = 'Copper Bet';
    const message = 'Payment for lottery ticket from copper bet';
    // const reference = new PublicKey('11111111111111111111111111111111'); // Optional

    const solanaPayUrl = new URL('solana:' + recipient);
    solanaPayUrl.searchParams.append('amount', amount.toString());
    solanaPayUrl.searchParams.append('label', label);
    solanaPayUrl.searchParams.append('message', message);
    // solanaPayUrl.searchParams.append('reference', reference.toBase58());

    // This will open wallet apps with the payment popup
    window.location.href = solanaPayUrl.toString();
  };

  const handleWalletSelect = async (wallet) => {
    handleCloseDialog();

    if (isMobile) {
      setStatus(`Opening ${wallet.name} wallet app for payment...`);
      openSolanaPayLink();
      return;
    }

    setStatus(`Connecting to ${wallet.name}...`);

    try {
      const provider = getProviderFromWindow(wallet.providerPath);

      if (!provider) {
        setStatus(`${wallet.name} not found. Please install the extension.`);
        return;
      }

      const resp = await provider.connect();
      const senderPublicKey = new PublicKey(resp.publicKey.toString());

      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const receiverPublicKey = new PublicKey(receiverAddress);

      const { blockhash } = await connection.getLatestBlockhash('finalized');

      const transaction = new Transaction({
        recentBlockhash: blockhash,
        feePayer: senderPublicKey,
      }).add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: receiverPublicKey,
          lamports: 0.01 * 1e9,
        })
      );

      setStatus('Requesting signature...');
      const { signature } = await provider.signAndSendTransaction(transaction);

      setStatus('Confirming transaction...');
      const confirmation = await connection.confirmTransaction(
        signature,
        'confirmed'
      );

      const result = await connection.getParsedTransaction(signature, {
        commitment: 'confirmed',
      });

      if (result?.meta?.err) {
        setStatus(`On-chain error: ${JSON.stringify(result.meta.err)}`);
      } else {
        setStatus(`Success! Signature: ${signature}`);
      }
    } catch (error) {
      if (error?.message?.includes('User rejected')) {
        setStatus('User rejected the transaction.');
      } else {
        setStatus(`Error: ${error.message || error.toString()}`);
      }
    }
  };

  return (
    <div>
      <Button
        onClick={handleOpenDialog}
        variant='contained'
        color='secondary'
      >
        Send 0.01 SOL
      </Button>

      <Typography
        variant='body2'
        sx={{ mt: 2 }}
        width='100%'
        overflow='clip'
      >
        {status}
      </Typography>

      <Dialog
        open={walletDialogOpen}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Select a Wallet</DialogTitle>
        <DialogContent>
          <List>
            {WALLET_LIST.map((wallet) => (
              <ListItem
                disablePadding
                key={wallet.key}
              >
                <ListItemButton onClick={() => handleWalletSelect(wallet)}>
                  <ListItemText primary={wallet.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
