import { Typography } from '@mui/material';
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
  const [hasSolanaWallet, setHasSolanaWallet] = useState(true);
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

      //  Let wallet-adapter handle recentBlockhash and feePayer
      const signature = await sendTransaction(transaction, connection);

      // Confirm transaction
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
      <div className='bg-yellow-100 text-yellow-800 p-4 rounded-md'>
        <p>No Solana wallet detected.</p>
        <a
          href='https://phantom.app/'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 underline'
        >
          Install Phantom Wallet
        </a>
      </div>
    );
  }

  return (
    <div className='space-y-4 p-4 border rounded-lg shadow-md'>
      <WalletMultiButton />

      {connected && (
        <div className='mt-4 space-y-3'>
          <Typography variant='h6'>
            Connected Wallet:{' '}
            <span className='font-semibold'>{publicKey?.toBase58()}</span>
          </Typography>

          <div>
            <label
              htmlFor='recipientAddress'
              className='block text-sm font-medium text-gray-700'
            >
              Recipient Public Address:
            </label>
            <input
              type='text'
              id='recipientAddress'
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='e.g., AnV5Ff...'
            />
          </div>

          <div>
            <label
              htmlFor='solAmount'
              className='block text-sm font-medium text-gray-700'
            >
              SOL Amount:
            </label>
            <input
              type='number'
              id='solAmount'
              value={solAmount}
              onChange={(e) => setSolAmount(e.target.value)}
              step='any'
              min='0'
              className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              placeholder='e.g., 0.1'
            />
          </div>

          <button
            onClick={sendSol}
            disabled={!connected || !recipientAddress || !solAmount}
            className='w-full px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Send SOL
          </button>

          {transactionStatus && (
            <p
              className={`mt-2 text-sm ${
                transactionStatus.includes('failed')
                  ? 'text-red-600'
                  : 'text-green-600'
              }`}
            >
              {transactionStatus}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
