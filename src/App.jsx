import { Box } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Landing from './pages/Landing.jsx';
import CardDetails from './pages/CardDetails';
import { createContext /* useMemo */, useState } from 'react';
import SetTicketNumber from './pages/SetTicketNumber';
import {
  getRandomDigitsFromArray,
  getRandomString,
  names,
} from './generals.js';
import { hex256Numbers } from './hex256.js';
import SearchTicket from './pages/SearchTicket.jsx';
// import { clusterApiUrl } from '@solana/web3.js';
// import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
// import {
//   ConnectionProvider,
//   WalletProvider,
// } from '@solana/wallet-adapter-react';
// import {
//   WalletModalProvider,
//   WalletMultiButton,
// } from '@solana/wallet-adapter-react-ui';
import { WalletDialogProvider } from './components/WalletDialog.jsx';
import SendSolDialog from './components/SendSolDialog.jsx';
import BottomNav from './components/BottomNavigation.jsx';
import Purchased from './pages/Purchased';
import Test from './Test.jsx';
import { SolanaProvider } from './provider/solana.jsx';
import Sol from './pages/Sol.jsx';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

function App() {
  const [open, setOpen] = useState(false);
  const [targetAddress, setTargetAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const showDialog = ({ address, amount }) => {
    setTargetAddress(address);
    setAmount(amount);
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
    setTargetAddress('');
    setAmount(0);
  };

  /* cards object */
  const cards = [
    {
      name: getRandomString(names),
      prize: 1000,
      buy: 10,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '01 Jul 2025',
      ticketId: 'CB1041',
      purchase: false,
    },
    {
      name: getRandomString(names),
      prize: 2000,
      buy: 20,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '02 Jul 2025',
      ticketId: 'CB1042',
      purchase: false,
    },
    {
      name: getRandomString(names),
      prize: 3000,
      buy: 30,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '03 Jul 2025',
      ticketId: 'CB1043',
      purchase: false,
    },
    {
      name: getRandomString(names),
      prize: 4000,
      buy: 40,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '04 Jul 2025',
      ticketId: 'CB1044',
      purchase: false,
    },
    {
      name: getRandomString(names),
      prize: 5000,
      buy: 50,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '05 Jul 2025',
      ticketId: 'CB1045',
      purchase: false,
    },
    {
      name: getRandomString(names),
      prize: 10000,
      buy: 100,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '05 Jul 2025',
      ticketId: 'CB1045',
      purchase: false,
    },
    {
      name: getRandomString(names),
      prize: 10000,
      buy: 100,
      number: getRandomDigitsFromArray(hex256Numbers),
      date: '05 Jul 2025',
      ticketId: 'CB1049',
      purchase: false,
    },
  ];

  return (
    <AppContext.Provider
      value={{ cards, open, targetAddress, amount, showDialog, closeDialog }}
    >
      <SolanaProvider>
        {/* <ConnectionProvider endpoint={endpoint}>
          <WalletProvider
            wallets={wallets}
            autoConnect={false}
          >
            <WalletModalProvider> */}
        <div className='App'>
          {/* <WalletMultiButton /> */}
          <Header />
          <Box>
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
              <Route
                path='/purchased'
                element={<Purchased />}
              />
              <Route
                path='/test'
                element={<Test />}
              />
              <Route
                path='/wallet-test'
                element={<Sol />}
              />
            </Routes>
          </Box>
          <BottomNav />
          <SendSolDialog />
        </div>
        {/* </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider> */}
      </SolanaProvider>
    </AppContext.Provider>
  );
}

export default App;
