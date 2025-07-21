import { Box } from '@mui/material';
import TicketDeck from '../components/TicketDeck';

const Purchased = () => {
  return (
    <Box mt={3}>
      <Box textAlign='center'>My Tickets</Box>
      <Box mt={2}>
        <TicketDeck />
      </Box>
    </Box>
  );
};

export default Purchased;
