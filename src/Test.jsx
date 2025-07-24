import { Box } from '@mui/material';
import TicketDeck from './components/TicketDeck';
import WalletButton from './components/WalletButton';
import SolanaPaymentButton from './components/SolanaButton';

const Test = () => {
  return (
    <Box
      textAlign='center'
      mt={3}
    >
      My Tickets
      <Box mb={2}>
        <SolanaPaymentButton />
        <WalletButton />
      </Box>
      <Box mt={2}>
        <TicketDeck />
      </Box>
    </Box>
  );
};

export default Test;
