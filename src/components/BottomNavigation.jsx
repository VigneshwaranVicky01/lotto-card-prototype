import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';

const BottomNav = () => {
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) navigate('/');
    if (newValue === 1) navigate('/purchased');
    if (newValue === 2) navigate('/');
  };

  return (
    <Paper
      sx={{
        position: 'fixed', // 🔑 Stick to viewport
        bottom: 0, // Align to bottom
        left: 0,
        right: 0,
        zIndex: 1300, // Keep above content
      }}
      elevation={3}
    >
      <BottomNavigation
        value={value}
        onChange={handleChange}
        sx={{
          backgroundColor: '#2A2B3F',
          '& .MuiBottomNavigationAction-root': {
            color: '#888',
          },
          '& .Mui-selected': {
            color: '#fff',
          },
        }}
      >
        <BottomNavigationAction
          label='Home'
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          label='Purchased'
          icon={<ConfirmationNumberIcon />}
        />
        <BottomNavigationAction
          label='Settings'
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default BottomNav;
