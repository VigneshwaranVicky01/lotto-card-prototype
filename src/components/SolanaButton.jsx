import {
  Connection,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
} from '@solana/web3.js';
import { useState } from 'react';

const receiverAddress = '9NQ9MgmpVe1wrzn5WvXdrxapChTeoQtgbSkHgNpVqRpT'; // Replace with your wallet address

export default function SolanaPaymentButton() {
  const [status, setStatus] = useState('Idle');

  const handlePayment = async () => {
    setStatus('Checking wallet...');

    try {
      //  1. Detect Phantom
      const provider = window.solana;
      if (!provider || !provider.isPhantom) {
        setStatus('Phantom wallet not detected.');
        return;
      }

      //  2. Connect to wallet
      const resp = await provider.connect(); // Will trigger wallet popup
      const senderPublicKey = new PublicKey(resp.publicKey.toString());

      //  3. Set up connection
      const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

      //  4. Create transaction
      const receiverPublicKey = new PublicKey(receiverAddress);
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: senderPublicKey,
          toPubkey: receiverPublicKey,
          lamports: 0.01 * 1e9, // 0.01 SOL
        })
      );

      setStatus('✍️ Requesting signature...');

      //  5. Let Phantom sign and send transaction
      const { signature } = await provider.signAndSendTransaction(transaction);

      setStatus('⏳ Sending transaction...');

      //  6. Confirm transaction
      const confirmation = await connection.confirmTransaction(
        signature,
        'confirmed'
      );

      console.log(confirmation);
      //  7. Check on-chain confirmation
      const result = await connection.getParsedTransaction(signature, {
        commitment: 'confirmed',
      });

      if (result?.meta?.err) {
        setStatus(
          ` Transaction failed on-chain: ${JSON.stringify(result.meta.err)}`
        );
      } else {
        setStatus(' Transaction confirmed! Signature: ' + signature);

        // 👉 Record success to DB or analytics here
      }
    } catch (error) {
      if (error?.message?.includes('User rejected')) {
        setStatus(' Transaction rejected by user.');
      } else {
        setStatus(` Error: ${error.message || error.toString()}`);
      }
    }
  };

  return (
    <div className='p-4 bg-gray-100 rounded-md'>
      <button
        onClick={handlePayment}
        className='bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded'
      >
        Send 0.01 SOL
      </button>
      <p className='mt-3 text-sm'>{status}</p>
    </div>
  );
}
