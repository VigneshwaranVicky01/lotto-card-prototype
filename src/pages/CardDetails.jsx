import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../App';
import LottoCard from '../components/LottoCard';
import { useWalletDialog } from '../components/WalletDialog';

const CardDetails = () => {
  const { cards } = useContext(AppContext);
  const { id } = useParams();
  const { showDialog } = useWalletDialog();
  const [cardDetails, setCardDetails] = useState();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // const handleClick = () => {
  //   setOpen(true);
  // };

  useEffect(() => {
    setCardDetails(cards.find((card) => card.ticketId == id));
  }, [id]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') setOpen(false); // optional: ignore clickaway
    setOpen(false);
  };

  return (
    <Box
      mt='20px'
      ml='10px'
    >
      {cardDetails ? (
        <>
          <Typography
            variant='body1'
            fontWeight='bold'
            mb='20px'
            textAlign='center'
          >
            Buy Lotto
          </Typography>
          <LottoCard
            ticketId={cardDetails.ticketId}
            prize={cardDetails.prize}
            buy={cardDetails.buy}
            date={cardDetails.date}
            number={cardDetails.number}
            name={cardDetails.name}
            click={false}
          />

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'end',
              mt: '20px',
              mx: '20px',
            }}
          >
            <Button
              variant='contained'
              sx={{ background: '#7c4ef7' }}
              onClick={() => {
                showDialog({
                  address: '9NQ9MgmpVe1wrzn5WvXdrxapChTeoQtgbSkHgNpVqRpT',
                  amount: cardDetails.buy,
                });
                // console.log('successfully purchased');
              }}
            >
              Buy
            </Button>
          </Box>
        </>
      ) : (
        <Box
          display='flex'
          flexDirection='column'
          gap={2}
          alignItems='center'
        >
          <Typography variant='subtitle2'>Ticket Not Found</Typography>
          <Button
            variant='contained'
            sx={{ background: '#7c4ef7' }}
            onClick={() => {
              navigate('/');
            }}
          >
            Search Ticket
          </Button>
        </Box>
      )}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity='success'
          variant='filled'
          icon={false}
        >
          Successfully Purchased !
        </Alert>
      </Snackbar>
    </Box>
  );
};

CardDetails.propTypes = {};

export default CardDetails;
