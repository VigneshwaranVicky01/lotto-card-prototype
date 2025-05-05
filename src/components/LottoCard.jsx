import React from 'react';
import PropTypes from 'prop-types';
import './LottoCard.css';
import ICSol from '../assets/icons/IcSol';
import { useNavigate } from 'react-router-dom';

const LottoCard = ({
  ticketId = 'CB2025',
  prize = '1000',
  buy = 1,
  date = '01 jan 2000',
  number = ['01', '02', '03', '04', '05', '06'],
  name = 'name',
}) => {
  const navigate = useNavigate();

  return (
    <div
      className='ticket2'
      style={{ cursor: 'pointer' }}
      onClick={() => {
        navigate(`/card/${ticketId}/buy`);
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
            <div
              className='number2'
              key={index}
            >
              {num}
            </div>
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
