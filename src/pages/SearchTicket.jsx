import { Alert, Box, Button, Snackbar, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import LottoCard from '../components/LottoCard';
import { useWalletDialog } from '../components/WalletDialog';

const SearchTicket = () => {
  const [open, setOpen] = useState(false);
  const { state } = useLocation();
  const { ticketId, prize, buy, date, number, name } = state || {};
  const { showDialog } = useWalletDialog();
  // const { connection } = useConnection();
  // const { publicKey, sendTransaction } = useWallet();

  // const handleSend = useCallback(async () => {
  //   console.log('first');
  //   if (!publicKey) {
  //     alert('Please connect your wallet first');
  //     return;
  //   }
  //   console.log('second');

  //   try {
  //     // 📬 Destination address and amount to send
  //     const destination = new PublicKey('DESTINATION_WALLET_ADDRESS_HERE');
  //     const amount = buy * LAMPORTS_PER_SOL; // 0.1 SOL

  //     // 🧾 Create transaction
  //     const transaction = new Transaction().add(
  //       SystemProgram.transfer({
  //         fromPubkey: publicKey,
  //         toPubkey: destination,
  //         lamports: amount,
  //       })
  //     );

  //     // 🚀 Send transaction (opens wallet popup)
  //     const signature = await sendTransaction(transaction, connection);

  //     console.log('Transaction sent:', signature);

  //     // ⏳ Wait for confirmation
  //     await connection.confirmTransaction(signature, 'confirmed');

  //     alert('Transaction successful! Signature: ' + signature);
  //   } catch (err) {
  //     console.error('Transaction failed:', err);
  //     alert('Transaction failed!');
  //   }
  // }, [publicKey, sendTransaction, connection]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') setOpen(false); // optional: ignore clickaway
    setOpen(false);
  };

  return (
    <Box
      mt='20px'
      ml='10px'
    >
      <Typography
        variant='body1'
        fontWeight='bold'
        mb='20px'
        textAlign='center'
      >
        Buy Lotto
      </Typography>
      <LottoCard
        ticketId={ticketId}
        prize={prize}
        buy={buy}
        date={date}
        number={number}
        name={name}
        click={false}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'end',
          mt: '20px',
          mx: '20px',
        }}
      >
        <Button
          variant='contained'
          sx={{ backgroundColor: '#7c4ef7' }}
          onClick={() => {
            showDialog({
              address: '9NQ9MgmpVe1wrzn5WvXdrxapChTeoQtgbSkHgNpVqRpT',
              amount: buy,
            });
            console.log('successfully purchased');
          }}
        >
          Buy
        </Button>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          severity='success'
          variant='filled'
          icon={false}
        >
          Successfully Purchased !
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SearchTicket;
