import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import IcDownArrow from '../assets/icons/IcDownArrow.jsx';
import ICSol from '../assets/icons/IcSol';
import './LottoCard.css';
import { useState } from 'react';

const LottoCard = ({
  ticketId = 'CB2025',
  prize = '1000',
  buy = 1,
  date = '01 jan 2000',
  number = ['01', '02', '03', '04', '05', '06'],
  setNumber,
  name = 'name',
  numberClickable = false,
  onClick,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const animationStyle = !isFocused ? 'jump 3s ease-in-out' : undefined;

  const handleChange = (newValue, index) => {
    const updated = [...number];
    // Allow empty or valid number strings
    updated[index] = newValue;
    // setNumber(ticketId, updated);
    setNumber(() => ({ title: name, ticketId: ticketId, numbers: updated }));
  };

  const availableNumbers = [
    'B1',
    'CD',
    '43',
    '44',
    '45',
    '46',
    '47',
    '48',
    '49',
    '4A',
    '4B',
    '4C',
    '4D',
    '4E',
    '4F',
    '50',
  ];

  // custom styling icon to center
  function CustomCenteredIcon(props) {
    return (
      <IcDownArrow
        {...props}
        sx={{
          top: '50%',
          transform: 'translateY(-50%)',
          position: 'absolute',
          fontSize: '18px',
          right: 14,
          pointerEvents: 'none',
          color: 'inherit',
          animation: animationStyle,
        }}
      />
    );
  }

  return (
    <div
      className='ticket2'
      style={{ cursor: 'pointer' }}
      onClick={onClick}
    >
      <div className='ticket2-header'>{name}</div>
      <div className='ticket2-info'>
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
            {buy} <ICSol sx={{ width: '15px', height: '15px' }} />
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
            {prize} <ICSol sx={{ width: '15px', height: '15px' }} />
          </div>
        </div>
      </div>
      <div
        style={{
          position: 'absolute',
          top: '45%',
          transform: 'translateY(-45%)',
          zIndex: 1,
          marginBottom: '4px',
          border: '1px dashed #fff',
          width: '100%',
          textAlign: 'center',
          overflow: 'hidden',
          left: '6%',
        }}
      ></div>
      <div className='numbers2'>
        {numberClickable
          ? number.map((num, index) => {
              return (
                <>
                  <style>
                    {`
          @keyframes jump {
            0%, 100% {
              transform: translateY(-50%);
            }
            50% {
              transform: translateY(-80%);
            }
          }
        `}
                  </style>
                  <FormControl key={index}>
                    <Select
                      value={num}
                      className='number2'
                      onChange={(event) => {
                        handleChange(event.target.value, index);
                        // console.log(event.target.value, `index:${index}`);
                      }}
                      sx={{ padding: '0px', borderRadius: '50%' }}
                      IconComponent={num === '' && CustomCenteredIcon}
                      onOpen={handleFocus}
                      onClose={handleBlur}
                      // input={
                      //   <OutlinedInput
                      //     startAdornment={
                      //       <InputAdornment position='end'>
                      //         <IcDownArrow />
                      //       </InputAdornment>
                      //     }
                      //   />
                      // }
                      MenuProps={{
                        PaperProps: {
                          style: {
                            marginTop: '5px',
                            // width: 20,
                            overflowY: 'auto',
                            scrollbarWidth: 'thin',
                            maxHeight: 200,
                          },
                        },
                      }}
                    >
                      {availableNumbers.map((availableNum) => (
                        <MenuItem
                          key={availableNum}
                          value={availableNum}
                          // style={getStyles(availableNum, personName, theme)}
                        >
                          {availableNum}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </>
              );
            })
          : number.map((num, index) => {
              return (
                <Typography
                  className='number2'
                  key={index}
                >
                  {num}
                </Typography>
              );
            })}
      </div>
      <div style={{ textAlign: 'center', fontSize: '12px', color: '#888' }}>
        BlockHash: 0000000000000000..............c91a5a3dca7a82f0
      </div>
      <div className='ticket2-footer'>
        Draw:
        {date} • Ticket ID: {ticketId}
      </div>
    </div>
  );
};

LottoCard.propTypes = {};

export default LottoCard;
