import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing.jsx';
import CardDetails from './pages/CardDetails';
import { createContext } from 'react';
import SetTicketNumber from './pages/SetTicketNumber';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

function App() {
  const cards = [
    {
      name: 'Lotto1',
      prize: 1000,
      buy: 10,
      number: [11, 21, 31, 41, 51, 61],
      date: '01 Jul 2025',
      ticketId: 'CB1041',
      purchase: false,
    },
    {
      name: 'Lotto2',
      prize: 2000,
      buy: 20,
      number: [12, 22, 32, 42, 52, 62],
      date: '02 Jul 2025',
      ticketId: 'CB1042',
      purchase: false,
    },
    {
      name: 'Lotto3',
      prize: 3000,
      buy: 30,
      number: [13, 23, 33, 43, 53, 63],
      date: '03 Jul 2025',
      ticketId: 'CB1043',
      purchase: false,
    },
    {
      name: 'Lotto4',
      prize: 4000,
      buy: 40,
      number: [14, 24, 34, 44, 54, 64],
      date: '04 Jul 2025',
      ticketId: 'CB1044',
      purchase: false,
    },
    {
      name: 'Lotto5',
      prize: 5000,
      buy: 50,
      number: [15, 25, 35, 45, 55, 65],
      date: '05 Jul 2025',
      ticketId: 'CB1045',
      purchase: false,
    },
  ];

  return (
    <AppContext.Provider value={{ cards }}>
      <Box>
        <Header />
        <Routes>
          <Route
            path='/*'
            element={<Landing />}
          />
          <Route
            path='/card/:id/buy'
            element={<CardDetails />}
          />
          <Route
            path='/search/ticket'
            element={<SetTicketNumber />}
          />
        </Routes>
      </Box>
    </AppContext.Provider>
  );
}

export default App;
