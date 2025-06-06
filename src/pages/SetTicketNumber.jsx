import { Box, Button, Grid, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import LottoCard from '../components/LottoCard';
import '../components/LottoCard.css';
import { hex256Numbers } from '../hex256';

const SetTicketNumber = () => {
  const { cards } = useContext(AppContext);
  const navigate = useNavigate();
  const [selectedNumber, setSelectedNumber] = useState({
    title: '',
    ticketId: '',
    numbers: ['', '', '', '', '', ''],
  });

  const [showAvailableTickets, setShowAvailableTickets] = useState();
  const [randomSelectedNumber, setRandomSelectedNumber] = useState({
    title: 'Test',
    numbers: [],
  });

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

    const numberOfSets = 4;
    let generatedSets = Array.from({ length: numberOfSets }, () => {
      return selectedNumber?.numbers.map((v) => {
        if (v === '') {
          return getRandomFromChoices(hex256Numbers);
        }
        return v;
      });
    });

    let filledArr = selectedNumber.numbers.map((v) => {
      if (v == '') {
        return getRandomFromChoices(hex256Numbers);
      }
      return v;
    });
    setRandomSelectedNumber(() => ({
      title: selectedNumber?.title,
      ticketId: selectedNumber?.ticketId,
      numbers: generatedSets,
    }));
  }, [selectedNumber, showAvailableTickets]);

  const listSearchCards = [
    {
      ticketId: 'CB1049',
      prize: '1000',
      buy: '10',
      date: '10 Jul 2025',
      number:
        selectedNumber.ticketId == 'CB1049'
          ? selectedNumber.numbers
          : ['', '', '', '', '', ''],
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
      number:
        selectedNumber.ticketId == 'CB1048'
          ? selectedNumber.numbers
          : ['', '', '', '', '', ''],
      numberClickable: true,
      setNumber: setSelectedNumber,
      name: 'Golden Numbers',
      click: false,
    },
    {
      ticketId: 'CB1050',
      prize: '5000',
      buy: '5',
      date: '10 Aug 2025',
      number:
        selectedNumber.ticketId == 'CB1050'
          ? selectedNumber.numbers
          : ['', '', '', '', '', ''],
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
      number:
        selectedNumber.ticketId == 'CB1052'
          ? selectedNumber.numbers
          : ['', '', '', '', '', ''],
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
      number:
        selectedNumber.ticketId == 'CB1051'
          ? selectedNumber.numbers
          : ['', '', '', '', '', ''],
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
        gap={1}
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
      {/* <Box
        mt={2}
        display='flex'
        justifyContent='space-evenly'
      >
        {selectedNumber?.numbers?.some((num) => num !== '') && (
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
      </Box> */}

      {showAvailableTickets == undefined ||
      showAvailableTickets?.length == 0 ? (
        selectedNumber?.numbers?.some((num) => num !== '') ? (
          <Box
            mt={4}
            sx={{
              position: 'relative',
              backgroundColor: '#2a2b3f',
              width: '310px',
              padding: '12px',
              borderRadius: '16px',
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden',
              // Pseudo-elements
              '&::before': {
                content: '""',
                position: 'absolute',
                width: '30px',
                height: '30px',
                backgroundColor: '#1c1d31',
                borderRadius: '50%',
                top: '55%',
                transform: 'translateY(-55%)',
                left: '-10px',
                zIndex: 1,
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '30px',
                height: '30px',
                backgroundColor: '#1c1d31',
                borderRadius: '50%',
                top: '55%',
                transform: 'translateY(-55%)',
                right: '-10px',
                zIndex: 1,
              },
            }}
          >
            <Typography
              sx={{
                textAlign: ' center',
                fontSize: ' 18px',
                fontWeight: ' bold',
                color: '#fff',
                mb: '8px',
              }}
            >
              {randomSelectedNumber.title}
            </Typography>
            {randomSelectedNumber?.numbers.map((set, index) => {
              const result = listSearchCards.find(
                (item) => item.ticketId === randomSelectedNumber.ticketId
              );
              return (
                <>
                  <Box
                    class='numbers2'
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                      navigate('/ticket/card', {
                        state: {
                          ticketId: result.ticketId,
                          prize: result.prize,
                          buy: result.buy,
                          date: result.date,
                          number: set,
                          name: result.name,
                        },
                      });
                    }}
                  >
                    {set.map((num, index) => {
                      return (
                        <>
                          <Typography
                            className='number2'
                            key={index}
                          >
                            {num}
                          </Typography>
                        </>
                      );
                    })}
                  </Box>
                  {index < 3 && (
                    <Box
                      sx={{
                        borderBottom: '1px dotted #fff',
                        width: '100%', // or any specific width
                        my: 1, // margin top & bottom (theme spacing)
                      }}
                    />
                  )}
                </>
                // <LottoCard
                //   // key={index}
                //   ticketId='CB1049'
                //   prize='1000'
                //   buy='10'
                //   date='10 Jul 2025'
                //   number={set}
                //   name={mainCardName}
                //   click={true}
                //   onClick={() => {
                //     navigate('/ticket/card', {
                //       state: {
                //         ticketId: 'CB1049',
                //         prize: '1000',
                //         buy: '10',
                //         date: '10 Jul 2025,',
                //         number: set,
                //         name: mainCardName,
                //       },
                //     });
                //   }}
                // />
              );
            })}
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
