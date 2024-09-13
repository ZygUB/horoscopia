const https = require('https');

exports.handler = async function(event) {
  const { sign, day } = event.queryStringParameters;

  const url = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${sign}&day=${day}`;

  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        try {
          const parsedData = JSON.parse(data);
          resolve({
            statusCode: 200,
            body: JSON.stringify(parsedData),
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          });
        } catch (error) {
          resolve({
            statusCode: 500,
            body: JSON.stringify({ error: 'Failed to parse response data' }),
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          });
        }
      });

    }).on('error', (error) => {
      resolve({
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to fetch horoscope data' }),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        },
      });
    });
  });
};
