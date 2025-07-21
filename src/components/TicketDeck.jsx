import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import ICSol from '../assets/icons/IcSol';

const data = [
  {
    id: 1,
    title: 'Lotto',
    details: 'Draw – 8 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 1,
    prize: 1000,
  },
  {
    id: 2,
    title: 'Lotto',
    details: 'Draw – 9 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 5,
    prize: 5000,
  },
  {
    id: 3,
    title: 'Lucky Picks',
    details: 'Draw – 6 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 2,
    prize: 2000,
  },
  {
    id: 4,
    title: 'Lotto',
    details: 'Draw  – 10 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 7,
    prize: 7000,
  },
  {
    id: 5,
    title: 'Lucky Picks',
    details: 'Draw – 8 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 6,
    prize: 6000,
  },
  {
    id: 6,
    title: 'Goldline Tickets',
    details: 'Draw – 7 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 6,
    prize: 6000,
  },
  {
    id: 7,
    title: 'Goldline Tickets',
    details: 'Draw – 9 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 10,
    prize: 1000,
  },
  {
    id: 8,
    title: 'Lucky Picks',
    details: 'Draw – 8 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 4,
    prize: 4000,
  },
  {
    id: 9,
    title: 'Lucky Picks',
    details: 'Draw – 8 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 10,
    prize: 1000,
  },
  {
    id: 10,
    title: 'Lucky Picks',
    details: 'Draw – 8 PM',
    number: ['F', 'A', '3', 'B', '5', '0'],
    buy: 10,
    prize: 1000,
  },
];

/* ----------------------------------------------------------------
   Helpers
   ----------------------------------------------------------------*/
const groupByTitle = (arr) =>
  arr.reduce((acc, t) => {
    (acc[t.title] ??= []).push(t);
    return acc;
  }, {});

const TicketCard = ({ ticket, w, h, i }) => {
  const elevation = Math.max(2, 8 - i * 2);
  return (
    <Card
      elevation={elevation} /* ✅ SAME shadow for every card */
      sx={{
        width: w,
        height: h,
        bgcolor: '#2a2b3f',
        overflow: 'hidden',
        userSelect: 'none',
        transition: 'transform .25s',
        border: '3px solid rgba(0,0,0,.12)',
      }}
    >
      <CardContent sx={{ p: 1 }}>
        <Typography
          textAlign='center'
          fontWeight={600}
          color='#fff'
          noWrap
        >
          {ticket.title}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div className='info2-block'>
            <div className='info2-label'>Buy</div>
            <div
              className='info2-value'
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {ticket.buy} <ICSol sx={{ width: '15px', height: '15px' }} />
            </div>
          </div>
          <div className='info2-block'>
            <div className='info2-label'>Prize</div>
            <div
              className='info2-value'
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {ticket.prize} <ICSol sx={{ width: '15px', height: '15px' }} />
            </div>
          </div>
        </Box>
        <Box
          display='flex'
          justifyContent='center'
          mt={1}
          gap={0.5}
        >
          {ticket?.number?.map((num, index) => {
            return (
              <Typography
                style={{
                  width: '35px',
                  height: '35px',
                  borderRadius: '50%',
                  background: '#f5f5f5',
                  display: 'flex',
                  justifyContent: ' center',
                  alignItems: 'center',
                  fontWeight: 'bold',
                  fontSize: ' 16px',
                  color: '#1f2937',
                  border: '1px solid #ccc',
                }}
                key={index}
              >
                {num}
              </Typography>
            );
          })}
        </Box>
        <Box
          mt={2}
          display='flex'
          flexDirection='column'
        >
          <Typography
            textAlign='center'
            variant='caption'
            color='#fff'
            noWrap
          >
            {ticket.details}
          </Typography>
          <Typography
            textAlign='center'
            variant='caption'
            color='#fff'
            noWrap
          >
            {ticket.id}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

/* ----------------------------------------------------------------
   Main component
   ----------------------------------------------------------------*/
export default function TicketDeckStrip() {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));

  /* Responsive dims */
  const CARD_W = sm ? 210 : 250;
  const CARD_H = sm ? 190 : 190;
  const GAP = sm ? 30 : 40;
  const STEP_H = 10;

  /* State: each title‑group keeps its own ordering */
  const initialGroups = Object.fromEntries(
    Object.entries(groupByTitle(data)).map(([title, list]) => [title, list])
  );

  const grouped = groupByTitle(data);
  const [groups, setGroups] = useState(grouped);
  const [openDeck, setOpenDeck] = useState(null);

  /* Bring clicked card to front within its title‑group */
  const bringToFront = (title, id) => {
    setGroups((prev) => {
      const deck = prev[title];
      const idx = deck.findIndex((t) => t.id === id);
      if (idx <= 0) return prev;
      return {
        ...prev,
        [title]: [deck[idx], ...deck.slice(0, idx), ...deck.slice(idx + 1)],
      };
    });
  };
  return (
    <Box
      sx={{
        display: 'flex',
        // flexDirection: 'column',
        gap: '15px',
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        px: 2,
        pb: 3,
        // ml: 5,
        // mb: 10,
        '::-webkit-scrollbar': { display: 'none' },
      }}
    >
      {/* one design for card decks */}
      {Object.entries(groups).map(([title, deck]) => {
        return (
          <Box
            key={title}
            onClick={() => {
              // toggleExpand(title);
            }}
            sx={{
              position: 'relative',
              mr: 4,
              scrollSnapAlign: 'start',
              minWidth: CARD_W + (deck.length - 1) * GAP,
              height: CARD_H,
            }}
          >
            {deck.map((t, i) => (
              <Box
                key={t.id}
                onClick={() => bringToFront(title, t.id)}
                sx={{
                  position: 'absolute',
                  left: i * GAP,
                  // left: i * (CARD_W - EDGE),
                  zIndex: deck.length - i,
                  cursor: 'pointer',
                  transform: `scale(${1 - i * 0.04})`,
                  transformOrigin: 'left top',
                  transition: 'left .25s, transform .25s',
                }}
              >
                <TicketCard
                  i={i}
                  ticket={t}
                  w={CARD_W}
                  // h={CARD_H + i * STEP_H}
                  h={Math.max(60, CARD_H - i * STEP_H)}
                />
              </Box>
            ))}
          </Box>
        );
      })}
      {/*   {Object.entries(grouped).map(([title, deck]) => {
        const selectedId = activeFrontCard[title] ?? deck[0].id;
        const selectedIndex = deck.findIndex((c) => c.id === selectedId);
        const showExpanded = activeDeck === title;

        return (
          <Box
            key={title}
            sx={{ mb: 5 }}
          >
            {/* DECK VIEW */}
      {/* <Box
              sx={{
                // display: 'flex',
                position: 'relative',
                scrollSnapAlign: 'start',
                width: Math.max(CARD_W + (deck.length - 1) * GAP, 250),
                height: CARD_H + (deck.length - 1) * STEP_H,
                cursor: 'pointer',
              }}
            >
              {deck.map((ticket, i) => {
                const isActive = ticket.id === selectedId;
                return (
                  <Box
                    key={ticket.id}
                    onClick={() => {
                      setActiveFrontCard((prev) => ({
                        ...prev,
                        [title]: ticket.id,
                      }));
                      setActiveDeck(title); // show full list below
                    }}
                    sx={{
                      position: 'absolute',
                      left: i * GAP,
                      top: 0,
                      zIndex: isActive ? deck.length : i,
                      transition: 'all 0.3s ease-in-out',
                    }}
                  >
                    <TicketCard
                      ticket={ticket}
                      w={CARD_W}
                      h={Math.max(60, CARD_H - i * STEP_H)}
                      // h={CARD_H + i * STEP_H}
                      i={i}
                    />
                  </Box>
                );
              })}
            </Box>

          EXPANDED VIEW */}
      {/*   {showExpanded && (
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  overflowX: 'auto',
                  gap: 2,
                  py: 1,
                  pl: 1,
                  '::-webkit-scrollbar': { display: 'none' },
                }}
              >
                {deck.map((ticket, i) => (
                  <TicketCard
                    key={ticket.id}
                    ticket={ticket}
                    w={CARD_W}
                    h={CARD_H}
                    i={i}
                  />
                ))}
              </Box>
            )}
          </Box>
        );
      })} */}
    </Box>
  );
}
