import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';

const NumberTable = ({ setSelectedNumber }) => {
  const numbers = Array.from({ length: 48 }, (_, i) =>
    (i + 1).toString().padStart(2, '0')
  );

  // Responsive logic
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm = useMediaQuery(theme.breakpoints.only('sm'));
  const isMd = useMediaQuery(theme.breakpoints.only('md'));

  let columns = 12;
  if (isXs) columns = 6;
  else if (isSm) columns = 9;
  else if (isMd) columns = 12;

  // Break into rows
  const rows = [];
  for (let i = 0; i < numbers.length; i += columns) {
    rows.push(numbers.slice(i, i + columns));
  }

  const fillNextEmptySlot = (number) => {
    setSelectedNumber((prev) => {
      const index = prev.findIndex((val) => val === '');
      if (index === -1) return prev; // no empty slot
      const updated = [...prev];
      updated[index] = number;
      return updated;
    });
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: '20px',
        maxWidth: '100%',
        overflowX: 'auto',
        backgroundColor: 'transparent',
      }}
    >
      <Table sx={{ borderCollapse: 'collapse' }}>
        <TableBody>
          {rows.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              {row.map((num, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  align='center'
                  onClick={() => fillNextEmptySlot(num)}
                  sx={{
                    color: '#ffffff',
                    border: '1px solid #ffffff',
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    padding: 1,
                  }}
                >
                  {num}
                </TableCell>
              ))}
              {/* Fill empty cells if the last row is short */}
              {row.length < columns &&
                Array.from({ length: columns - row.length }).map((_, idx) => (
                  <TableCell
                    key={`empty-${idx}`}
                    sx={{
                      border: '1px solid #ffffff',
                      backgroundColor: '#ffffff',
                    }}
                  />
                ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NumberTable;
