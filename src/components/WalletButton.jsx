import React, { useEffect, useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

export default function WalletButton() {
  const { publicKey, connected, connecting } = useWallet();
  const [hasSolanaWallet, setHasSolanaWallet] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isPhantomInstalled = window?.solana?.isPhantom;
      const isSolflareInstalled = window?.solflare;
      setHasSolanaWallet(!!isSolflareInstalled || !!isPhantomInstalled);
    }
  }, []);

  //   useEffect(() => {
  //     if (connected && publicKey) {
  //       console.log('✅ Wallet connected:', publicKey.toBase58());
  //     } else if (!connecting && !connected) {
  //       console.log('❌ Wallet disconnected');
  //     }
  //   }, [connected, publicKey, connecting]);

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

  return <WalletMultiButton />;
}
