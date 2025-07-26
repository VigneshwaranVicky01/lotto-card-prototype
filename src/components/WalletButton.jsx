import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
} from '@mui/material';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import {
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from '@solana/web3.js';
import { useCallback, useEffect, useState } from 'react';

export default function WalletButton() {
  const { publicKey, connected, connecting, sendTransaction } = useWallet();
  const [hasSolanaWallet] = useState(true);
  const [recipientAddress, setRecipientAddress] = useState(
    '9NQ9MgmpVe1wrzn5WvXdrxapChTeoQtgbSkHgNpVqRpT'
  );
  const [solAmount, setSolAmount] = useState(0.1);
  const [transactionStatus, setTransactionStatus] = useState('');

  useEffect(() => {
    if (connected && publicKey) {
      console.log('Wallet connected:', publicKey.toBase58());
      setTransactionStatus('');
    } else if (!connecting && !connected) {
      console.log('Wallet disconnected');
      setTransactionStatus('');
    }
  }, [connected, publicKey, connecting]);

  const sendSol = useCallback(async () => {
    if (!publicKey) {
      setTransactionStatus('Wallet not connected!');
      return;
    }

    if (!recipientAddress || !solAmount) {
      setTransactionStatus('Please enter recipient address and SOL amount.');
      return;
    }

    let recipientPublicKey;
    try {
      recipientPublicKey = new PublicKey(recipientAddress);
    } catch (error) {
      setTransactionStatus('Invalid recipient address.');
      console.error('Invalid recipient address:', error);
      return;
    }

    const amountInLamports = parseFloat(solAmount) * LAMPORTS_PER_SOL;
    if (isNaN(amountInLamports) || amountInLamports <= 0) {
      setTransactionStatus('Invalid SOL amount.');
      return;
    }

    setTransactionStatus('Sending SOL...');

    try {
      const connection = new Connection(
        'https://api.devnet.solana.com',
        'confirmed'
      );

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientPublicKey,
          lamports: amountInLamports,
        })
      );

      // Don't manually set blockhash or feePayer
      const signature = await sendTransaction(transaction, connection);

      await connection.confirmTransaction(signature, 'confirmed');

      setTransactionStatus(` Transaction successful! Signature: ${signature}`);
      console.log('Transaction successful! Signature:', signature);
      setRecipientAddress('');
      setSolAmount('');
    } catch (error) {
      setTransactionStatus(` Transaction failed: ${error.message}`);
      console.error('Transaction failed:', error);
    }
  }, [publicKey, recipientAddress, solAmount, sendTransaction]);

  if (!hasSolanaWallet) {
    return (
      <Alert severity='warning'>
        No Solana wallet detected.{' '}
        <a
          href='https://phantom.app/'
          target='_blank'
          rel='noopener noreferrer'
        >
          Install Phantom Wallet
        </a>
      </Alert>
    );
  }

  return (
    <Box
      sx={{
        color: '#ffffff',
        mb: 30,
        width: '100%',
        background: 'transparent',
      }}
    >
      <WalletMultiButton />

      {connected && (
        <Box
          // mt={3}
          width='100%'
          overflow='clip'
        >
          <Typography
            variant='h6'
            gutterBottom
          >
            Connected Wallet:{' '}
            <Typography
              component='span'
              fontWeight='bold'
              sx={{ width: '80%', overflow: 'clip' }}
            >
              {publicKey?.toBase58()}
            </Typography>
          </Typography>

          <TextField
            fullWidth
            label='Recipient Public Address'
            margin='normal'
            value={recipientAddress}
            // onChange={(e) => setRecipientAddress(e.target.value)}
            // placeholder='e.g., AnV5Ff...'
            sx={{
              input: {
                color: '#ffffff',
              },
              label: {
                color: '#ffffff',
                '&.Mui-focused': {
                  color: '#ffffff',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ffffff',
                },
                '&:hover fieldset': {
                  borderColor: '#ffffff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffffff',
                },
              },
            }}
          />
          <TextField
            fullWidth
            type='number'
            label='SOL Amount'
            margin='normal'
            value={solAmount}
            // onChange={(e) => setSolAmount(e.target.value)}
            placeholder='e.g., 0.1'
            sx={{
              input: {
                color: '#ffffff',
              },
              label: {
                color: '#ffffff',
                '&.Mui-focused': {
                  color: '#ffffff',
                },
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: '#ffffff',
                },
                '&:hover fieldset': {
                  borderColor: '#ffffff',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#ffffff',
                },
              },
            }}
          />

          <Button
            fullWidth
            variant='contained'
            color='primary'
            sx={{ mt: 0.5, width: '80%' }}
            disabled={!connected || !recipientAddress || !solAmount}
            onClick={sendSol}
          >
            Send SOL
          </Button>
          {transactionStatus && (
            <Alert
              severity={
                transactionStatus.includes('failed') ? 'error' : 'success'
              }
            >
              {transactionStatus}
            </Alert>
          )}
        </Box>
      )}
    </Box>
  );
}
