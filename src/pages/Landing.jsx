import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import LottoCard from '../components/LottoCard';
import { Box, Grid, Typography } from '@mui/material';
import { AppContext } from '../App';
import SetTicketNumber from './SetTicketNumber';
import { useNavigate } from 'react-router-dom';

const Landing = () => {
  const { cards } = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <Box sx={{ my: '20px', ml: '20px' }}>
      <Box my={2}>
        <SetTicketNumber />
      </Box>
      <Typography
        variant='body1'
        fontWeight='bold'
        sx={{ mb: '15px' }}
      >
        Lottery
      </Typography>
      <Grid
        container
        gap={3}
      >
        {cards.map((card, index) => {
          return (
            <LottoCard
              ticketId={card.ticketId}
              prize={card.prize}
              buy={card.buy}
              date={card.date}
              number={card.number}
              name={card.name}
              key={index}
              click={true}
              onClick={() => {
                navigate(`/card/${card.ticketId}/buy`);
              }}
            />
          );
        })}
      </Grid>
    </Box>
  );
};

Landing.propTypes = {};

export default Landing;
