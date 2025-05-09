import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../App';
import LottoCard from '../components/LottoCard';
import { useNavigate } from 'react-router-dom';
import { hex256Numbers } from '../hex256';

const SetTicketNumber = () => {
  const { cards } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);
  const [showAvailableTickets, setShowAvailableTickets] = useState();
  const [randomSelectedNumber, setRandomSelectedNumber] = useState([
    '',
    '',
    '',
    '',
    '',
    '',
  ]);

  useEffect(() => {
    /* to match all the index with same value */
    const filtered = cards.filter((item) =>
      item.number.every(
        (val, idx) => selectedNumber[idx] === '' || val == selectedNumber[idx]
      )
    );

    /* To get at least one number match with the same index */

    // const filtered = cards.filter((item) =>
    //   item.number.some(
    //     (val, idx) => selectedNumber[idx] != '' && val == selectedNumber[idx]
    //   )
    // );

    setShowAvailableTickets(filtered);
  }, [selectedNumber]);

  useEffect(() => {
    if (showAvailableTickets?.length !== 0) {
      return;
    }
    /*  To get random numbers if 
    @ available ticket is empty
    */
    function getRandomFromChoices(choices) {
      return choices[Math.floor(Math.random() * choices.length)];
    }

    let filledArr = selectedNumber.map((v) => {
      if (v == '') {
        return getRandomFromChoices(hex256Numbers);
      }
      return v;
    });

    setRandomSelectedNumber(filledArr);
  }, [selectedNumber, showAvailableTickets]);

  // Replace empty values with random values from `choices`

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
      <Box
        sx={{ display: 'flex', justifyContent: 'center', mt: '20px', gap: 3 }}
      >
        <LottoCard
          ticketId='CB1049'
          prize='1000'
          buy='10'
          date='10 Jul 2025'
          number={selectedNumber}
          numberClickable={true}
          setNumber={setSelectedNumber}
          name='Luxe Lotto'
          click={false}
        />
        {/* <LottoCard
          ticketId='CB1049'
          prize='1000'
          buy='10'
          date='10 Jul 2025'
          number={selectedNumber}
          numberClickable={true}
          setNumber={setSelectedNumber}
          name='Treasure Ticket'
          click={false}
        /> */}
      </Box>
      {/* <NumberTable setSelectedNumber={setSelectedNumber} /> */}
      <Box
        mt={2}
        display='flex'
        justifyContent='space-evenly'
      >
        {selectedNumber.some((num) => num !== '') && (
          <Button
            variant='contained'
            onClick={() => {
              setSelectedNumber(['', '', '', '', '', '']);
            }}
          >
            Remove All
          </Button>
        )}
      </Box>
      {showAvailableTickets == undefined ||
      showAvailableTickets?.length == 0 ? (
        selectedNumber.some((num) => num !== '') ? (
          <Box mt={4}>
            <LottoCard
              ticketId='CB1049'
              prize='1000'
              buy='10'
              date='10 Jul 2025'
              number={randomSelectedNumber}
              name='Luxe Lotto'
              click={true}
              onClick={() => {
                navigate('/ticket/card', {
                  state: {
                    ticketId: 'CB1049',
                    prize: '1000',
                    buy: '10',
                    date: '10 Jul 2025,',
                    number: randomSelectedNumber,
                    name: 'Luxe Lotto',
                  },
                });
              }}
            />
          </Box>
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
                    onClick={() => {
                      navigate(`/card/${ticket.ticketId}/buy`);
                    }}
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
