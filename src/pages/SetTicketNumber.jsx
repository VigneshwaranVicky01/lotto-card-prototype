import { Box, Button, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import LottoCard from '../components/LottoCard';
import { hex256Numbers } from '../hex256';

const SetTicketNumber = () => {
  const { cards } = useContext(AppContext);
  const navigate = useNavigate();
  const [mainCardName, setMainCardName] = useState('Lucky Picks');
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

  const listSearchCards = [
    {
      ticketId: 'CB1049',
      prize: '1000',
      buy: '10',
      date: '10 Jul 2025',
      number: selectedNumber,
      numberClickable: true,
      // setNumber: (ticketId, number) => {
      //   console.log(ticketId, number);
      // },
      setNumber: setSelectedNumber,
      name: 'Lucky Picks',
      click: false,
    },
    {
      ticketId: 'CB1048',
      prize: '100',
      buy: '1',
      date: '10 Sep 2025',
      number: ['', '', '', '', '', ''],
      numberClickable: true,
      setNumber: (ticketId, number) => {
        console.log(ticketId, number);
      },
      name: 'Golden Numbers',
      click: false,
    },
    {
      ticketId: 'CB1050',
      prize: '5000',
      buy: '5',
      date: '10 Aug 2025',
      number: ['', '', '', '', '', ''],
      numberClickable: true,
      setNumber: setSelectedNumber,
      name: 'Treasure Tickets',
      click: false,
    },
    {
      ticketId: 'CB1052',
      prize: '6000',
      buy: '6',
      date: '11 Jul 2025',
      number: ['', '', '', '', '', ''],
      numberClickable: true,
      setNumber: setSelectedNumber,
      name: 'Luxe Lotto',
      click: false,
    },
    {
      ticketId: 'CB1051',
      prize: '4500',
      buy: '4',
      date: '18 Aug 2025',
      number: ['', '', '', '', '', ''],
      numberClickable: true,
      setNumber: setSelectedNumber,
      name: 'Jackpot Royale',
      click: false,
    },
  ];

  // Replace empty values with random values from `choices`

  return (
    <Box
      mb={5}
      width='100%'
    >
      <Typography
        variant='body1'
        fontWeight='bold'
        textAlign='center'
        mt='20px'
      >
        Number Availability Checker
        {/* Check Desired Number */}
      </Typography>
      <Box
        width='100%'
        overflow='scroll'
        display='flex'
        gap={3}
        mt={3}
      >
        {listSearchCards.map((searchCard, index) => {
          return (
            <Box
              width='350px'
              key={index}
            >
              <LottoCard
                ticketId={searchCard.ticketId}
                prize={searchCard.prize}
                buy={searchCard.buy}
                date={searchCard.date}
                number={searchCard.number}
                numberClickable={true}
                setNumber={searchCard.setNumber}
                name={searchCard.name}
                click={false}
              />
            </Box>
          );
        })}
      </Box>

      {/* <NumberTable setSelectedNumber={setSelectedNumber} /> */}
      <Box
        mt={2}
        display='flex'
        justifyContent='space-evenly'
      >
        {selectedNumber?.some((num) => num !== '') && (
          <Button
            variant='contained'
            sx={{ background: '#7c4ef7' }}
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
        selectedNumber?.some((num) => num !== '') ? (
          <Box mt={4}>
            <LottoCard
              ticketId='CB1049'
              prize='1000'
              buy='10'
              date='10 Jul 2025'
              number={randomSelectedNumber}
              name={mainCardName}
              click={true}
              onClick={() => {
                navigate('/ticket/card', {
                  state: {
                    ticketId: 'CB1049',
                    prize: '1000',
                    buy: '10',
                    date: '10 Jul 2025,',
                    number: randomSelectedNumber,
                    name: mainCardName,
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
        sx={{ background: '#7c4ef7' }}
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
