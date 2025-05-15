const axios = require('axios');

exports.handler = async function (event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
    };
  }

  try {
    // Hardcoded coordinates
    const lat = '28.7040592';
    const lng = '77.10249019999999';

    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    const response = await axios.get(url, {
      headers: {
        'user-agent': 'Mozilla/5.0',
        'accept': 'application/json',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers,
    };
  } catch (err) {
    console.error("Backend error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers,
    };
  }
};
