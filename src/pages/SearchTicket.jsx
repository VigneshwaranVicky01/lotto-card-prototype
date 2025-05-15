import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import LottoCard from '../components/LottoCard';
import { useLocation } from 'react-router-dom';

const SearchTicket = () => {
  const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const { ticketId, prize, buy, date, number, name } = state || {};

  const handleClick = () => {
    setOpen(true);
  };

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
        ticketId={ticketId}
        prize={prize}
        buy={buy}
        date={date}
        number={number}
        name={name}
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
          sx={{ backgroundColor: '#7c4ef7' }}
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

export default SearchTicket;
