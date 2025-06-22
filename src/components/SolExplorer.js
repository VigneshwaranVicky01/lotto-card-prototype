// to explore address
export const exploreAddress = (address) => {
  // window.open(`https://explorer.solana.com/address/${address}?cluster=testnet`);
  window.open(`https://explorer.solana.com/address/${address}`);
};

// to explore signature
export const exploreSignature = (hash) => {
  // window.open(`https://explorer.solana.com/txn/${hash}?cluster=testnet`);
  window.open(`https://explorer.solana.com/txn/${hash}`);
};
