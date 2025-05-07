import { TextField } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ICSol from '../assets/icons/IcSol';
import './LottoCard.css';

const LottoCard = ({
  ticketId = 'CB2025',
  prize = '1000',
  buy = 1,
  date = '01 jan 2000',
  number = ['01', '02', '03', '04', '05', '06'],
  setNumber,
  name = 'name',
  numberClickable = false,
  click = true,
}) => {
  const navigate = useNavigate();

  const handleChange = (index, newValue) => {
    const updated = [...number];
    // Allow empty or valid number strings
    updated[index] = newValue;
    setNumber(updated);
  };

  return (
    <div
      className='ticket2'
      style={{ cursor: 'pointer' }}
      onClick={() => {
        click ? navigate(`/card/${ticketId}/buy`) : '';
      }}
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
          top: '50%',
          transform: 'translateY(-50%)',
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
        {number.map((num, index) => {
          return (
            <TextField
              className='number2'
              key={index}
              value={num}
              onChange={(e) => {
                e.stopPropagation();
                const input = e.target.value;
                if (/^\d{0,2}$/.test(input)) {
                  handleChange(index, input); // Keep it as string
                }
              }}
              slotProps={{
                input: {
                  readOnly: !numberClickable,
                },
              }}
              inputMode='numeric'
              size='medium'
              type='text'
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // Remove default border
                  },
                  '&:hover fieldset': {
                    border: 'none', // Remove border on hover
                  },
                  '&.Mui-focused fieldset': {
                    border: 'none', // Remove border on focus
                  },
                },
              }}
            />
          );
        })}
      </div>

      <div className='ticket2-footer'>
        Draw: {date} • Ticket ID: {ticketId}
      </div>
    </div>
  );
};

LottoCard.propTypes = {};

export default LottoCard;
