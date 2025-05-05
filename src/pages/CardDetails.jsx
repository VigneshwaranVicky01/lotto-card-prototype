import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import LottoCard from '../components/LottoCard';
import { AppContext } from '../App';

const CardDetails = () => {
  const { cards } = useContext(AppContext);
  const { id } = useParams();
  const [cardDetails, setCardDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

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
      />

      <Box
        sx={{ display: 'flex', justifyContent: 'end', mt: '20px', mx: '20px' }}
      >
        <Button
          variant='contained'
          onClick={() => {
            handleClick();
            console.log('successfully purchased');
          }}
        >
          Buy
        </Button>
      </Box>
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
