import { Box, IconButton, Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '../assets/icons/searchIcon';

const Header = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        background: '#2A2B3F',
        display: 'flex',
        padding: '10px',
        justifyContent: 'space-between',
      }}
    >
      <Typography
        variant='h5'
        fontWeight='bold'
        display='flex'
        alignItems='center'
        sx={{ cursor: 'pointer' }}
        onClick={() => {
          navigate('/');
        }}
      >
        Copper bet
      </Typography>
      <IconButton
        sx={{ padding: '0 !important' }}
        onClick={() => navigate('/search/ticket')}
      >
        <SearchIcon
          sx={{
            width: '40px',
            height: '40px',
            cursor: 'pointer',
            color: '#fff',
          }}
        />
      </IconButton>
    </Box>
  );
};

Header.propTypes = {};

export default Header;
