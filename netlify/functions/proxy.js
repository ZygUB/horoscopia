const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { sign, day } = event.queryStringParameters;

  try {
    const response = await fetch(`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`);
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to fetch horoscope data' }),
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      }
    };
  }
};
