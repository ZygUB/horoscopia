import React, { useState } from 'react';
import './App.css';

const Horoscope = () => {
  const [sign, setSign] = useState('aries');
  const [day, setDay] = useState('TODAY');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // ... (rest of your zodiacSigns and days arrays)

  const fetchHoroscope = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/get-horoscope?sign=${sign}&day=${day}`);
      const data = await response.json();
      setData(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch horoscope data');
      setData(null);
    }
  };

  // ... (rest of your JSX rendering)

  return (
    // ... (rest of your JSX structure)
  );
};

export default Horoscope;
