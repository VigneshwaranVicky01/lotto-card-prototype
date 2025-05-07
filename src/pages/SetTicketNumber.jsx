import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import LottoCard from '../components/LottoCard';

const SetTicketNumber = () => {
  const { cards } = useContext(AppContext);
  const [selectedNumber, setSelectedNumber] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [showAvailableTickets, setShowAvailableTickets] = useState();

  useEffect(() => {
    /* to match all the index with same value */
    const filtered = cards.filter((item) =>
      item.number.every(
        (val, idx) => selectedNumber[idx] === '' || val == selectedNumber[idx]
      )
    );

    /* To get atleast one number match with the same index */
    // const filtered = cards.filter((item) =>
    //   item.number.some(
    //     (val, idx) => selectedNumber[idx] != '' && val == selectedNumber[idx]
    //   )
    // );
    setShowAvailableTickets(filtered);
  }, [selectedNumber]);

  return (
    <Box mb={5}>
      <Typography
        variant='body1'
        fontWeight='bold'
        textAlign='center'
        mt='20px'
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
          numberClickable={true}
          setNumber={setSelectedNumber}
          name='Lotto'
          click={false}
        />
      </Box>
      {/* <NumberTable setSelectedNumber={setSelectedNumber} /> */}
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
      </Box>
      {showAvailableTickets == undefined ||
      showAvailableTickets?.length == 0 ? (
        selectedNumber.some((num) => num !== '') ? (
          <Typography>
            Ticket is Not Available. Please try with different number
          </Typography>
        ) : null
      ) : (
        selectedNumber.some((num) => num !== '') && (
          <Box sx={{ ml: '20px' }}>
            <Typography
              variant='body1'
              fontWeight='bold'
              textAlign='center'
              my={4}
            >
              Available Tickets
            </Typography>
            <Grid
              container
              gap={3}
            >
              {showAvailableTickets.map((ticket, index) => {
                return (
                  <LottoCard
                    key={index}
                    ticketId={ticket.ticketId}
                    prize={ticket.prize}
                    buy={ticket.buy}
                    date={ticket.date}
                    number={ticket.number}
                    name={ticket.name}
                    click={true}
                  />
                );
              })}
            </Grid>
          </Box>
        )
      )}
      {/* <Button
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
      </Button> */}
    </Box>
  );
};

SetTicketNumber.propTypes = {};

export default SetTicketNumber;
