import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing.jsx';
import CardDetails from './pages/CardDetails';
import { createContext } from 'react';
import SetTicketNumber from './pages/SetTicketNumber';
import { getRandomDigitsFromArray } from './generals.js';
import { hex256Numbers } from './hex256.js';
import SearchTicket from './pages/SearchTicket.jsx';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

function App() {
  /* cards object */
  const cards = [
    {
      name: 'Lotto1',
      prize: 1000,
      buy: 10,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '01 Jul 2025',
      ticketId: 'CB1041',
      purchase: false,
    },
    {
      name: 'Lotto2',
      prize: 2000,
      buy: 20,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '02 Jul 2025',
      ticketId: 'CB1042',
      purchase: false,
    },
    {
      name: 'Lotto3',
      prize: 3000,
      buy: 30,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '03 Jul 2025',
      ticketId: 'CB1043',
      purchase: false,
    },
    {
      name: 'Lotto4',
      prize: 4000,
      buy: 40,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '04 Jul 2025',
      ticketId: 'CB1044',
      purchase: false,
    },
    {
      name: 'Lotto5',
      prize: 5000,
      buy: 50,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '05 Jul 2025',
      ticketId: 'CB1045',
      purchase: false,
    },
    {
      name: 'Luxe Lotto',
      prize: 10000,
      buy: 100,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '05 Jul 2025',
      ticketId: 'CB1045',
      purchase: false,
    },
    {
      name: 'Luxe Ticket',
      prize: 10000,
      buy: 100,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '05 Jul 2025',
      ticketId: 'CB1049',
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
          <Route
            path='/ticket/card'
            element={<SearchTicket />}
          />
        </Routes>
      </Box>
    </AppContext.Provider>
  );
}

export default App;
