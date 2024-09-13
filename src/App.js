import React, { useState } from 'react';
import './App.css';

const Horoscope = () => {
  const [sign, setSign] = useState('aries');
  const [day, setDay] = useState('TODAY');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const zodiacSigns = [
    'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
    'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
  ];

  const days = ['YESTERDAY', 'TODAY', 'TOMORROW'];

   const getApiBaseUrl = () => {
    return 'https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily';
  };

  const fetchHoroscope = (e) => {
    e.preventDefault();

    const url = `${getApiBaseUrl()}?sign=${sign}&day=${day}`;

    fetch(url, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Origin': window.location.origin
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data.data);
        setError(null);
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Failed to fetch horoscope data. Please try again later.');
        setData(null);
      });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Horoscopia</h1>
      <form onSubmit={fetchHoroscope}>
        <label>
          Select Your Zodiac Sign:
          <select value={sign} onChange={(e) => setSign(e.target.value)}>
            {zodiacSigns.map((zodiacSign) => (
              <option key={zodiacSign} value={zodiacSign}>
                {zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <label>
          Select Day:
          <select value={day} onChange={(e) => setDay(e.target.value)}>
            {days.map((d) => (
              <option key={d} value={d}>
                {d.charAt(0).toUpperCase() + d.slice(1)}
              </option>
            ))}
          </select>
        </label>

        <br /><br />

        <button type="submit">Get Horoscope</button>
      </form>

      {data && (
        <div style={{ marginTop: '30px' }}>
          <h2>Horoscope for {sign.charAt(0).toUpperCase() + sign.slice(1)} on {day.charAt(0).toUpperCase() + day.slice(1)}</h2>
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Horoscope:</strong> {data.horoscope_data}</p>
        </div>
      )}

      {error && (
        <div style={{ marginTop: '20px', color: 'red' }}>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default Horoscope;
