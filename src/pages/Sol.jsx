import { Box, Typography } from '@mui/material';
import React from 'react';
import SolanaPaymentButton from '../components/SolanaButton';
import WalletButton from '../components/WalletButton';

const Sol = () => {
  return (
    <Box
      ml={1}
      my={2}
    >
      <Typography mb={1}>Direct Pay</Typography>
      <SolanaPaymentButton />
      <Box>
        <Typography my={2}>Stores Public Key</Typography>
        <WalletButton />
      </Box>
    </Box>
  );
};

export default Sol;
