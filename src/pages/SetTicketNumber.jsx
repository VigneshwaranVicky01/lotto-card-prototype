import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import NumberTable from '../components/NumberTable';
import LottoCard from '../components/LottoCard';

const SetTicketNumber = () => {
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState('success');
  const [message, setMessage] = useState('Successfully Purchased!');
  const [selectedNumber, setSelectedNumber] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return; // optional: ignore clickaway
    setOpen(false);
  };

  return (
    <Box mb={5}>
      <Typography
        mt='20px'
        variant='body1'
        fontFamily='bold'
        textAlign='center'
      >
        Choose Lotto Number
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: '20px' }}>
        <LottoCard
          ticketId='CB1049'
          prize='1000'
          buy='10'
          date='10 Jul 2025'
          number={selectedNumber}
          name='Lotto'
        />
      </Box>
      <NumberTable setSelectedNumber={setSelectedNumber} />
      <Box
        mt={2}
        display='flex'
        justifyContent='space-evenly'
      >
        <Button
          variant='contained'
          onClick={() => {
            setSelectedNumber(['', '', '', '', '', '']);
          }}
        >
          Remove All
        </Button>
        <Button
          variant='contained'
          onClick={() => {
            setSeverity(selectedNumber.includes('') ? 'error' : 'success');
            setMessage(
              selectedNumber.includes('')
                ? 'Please select all numbers'
                : 'Successfully Purchased'
            );
            setOpen(true);
          }}
        >
          Buy
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <Alert
          severity={severity}
          variant='filled'
          icon={false}
        >
          {message}
          {/* {selectedNumber.includes('')
            ? 'Please select all numbers'
            : 'Successfully Purchased !'} */}
        </Alert>
      </Snackbar>
    </Box>
  );
};

SetTicketNumber.propTypes = {};

export default SetTicketNumber;
