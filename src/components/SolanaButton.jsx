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
  { name: 'Phantom', key: 'phantom', providerPath: 'phantom.solana' },
  { name: 'Solflare', key: 'solflare', providerPath: 'solflare' },
  { name: 'Backpack', key: 'backpack', providerPath: 'backpack' },
  // You can add more manually here
];

export default function SolanaStaticWalletDialog() {
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

  const handleWalletSelect = async (wallet) => {
    handleCloseDialog();

    if (isMobile) {
      setStatus(
        ` Mobile wallets are not injected in browser. Please open this page inside the ${wallet.name} app browser.`
      );

      // Optional: Redirect to Phantom mobile wallet if user chose it
      if (wallet.key === 'phantom') {
        const dappUrl = encodeURIComponent(window.location.href);
        window.location.href = `https://phantom.app/ul/browse/${dappUrl}`;
      }

      return;
    }

    setStatus(`Opening ${wallet.name}...`);

    try {
      const provider = getProviderFromWindow(wallet.providerPath);

      if (!provider) {
        setStatus(` ${wallet.name} not found. Please install the extension.`);
        return;
      }

      const resp = await provider.connect();
      const senderPublicKey = new PublicKey(resp.publicKey.toString());

      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
      const receiverPublicKey = new PublicKey(receiverAddress);

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: receiverPublicKey,
          lamports: 0.01 * 1e9,
        })
      );

      setStatus('Requesting signature...');
      const { signature } = await provider.signAndSendTransaction(transaction);

      setStatus('Sending transaction...');
      const confirmation = await connection.confirmTransaction(
        signature,
        'confirmed'
      );

      const result = await connection.getParsedTransaction(signature, {
        commitment: 'confirmed',
      });

      if (result?.meta?.err) {
        setStatus(` On-chain error: ${JSON.stringify(result.meta.err)}`);
      } else {
        setStatus(` Success! Signature: ${signature}`);
      }
    } catch (error) {
      if (error?.message?.includes('User rejected')) {
        setStatus(' User rejected the transaction.');
      } else {
        setStatus(` Error: ${error.message || error.toString()}`);
      }
    }
  };

  return (
    <div className='p-4 bg-gray-100 rounded-md'>
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
