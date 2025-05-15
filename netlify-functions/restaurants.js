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
    // Extract lat/lng from query params or use default
    const params = event.queryStringParameters || {};
    const lat = params.lat || '28.6304203';
    const lng = params.lng || '77.21772159999999';

    // Construct Swiggy API URL dynamically
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

    // Fetch data from Swiggy API
    const response = await axios.get(url, {
      headers: {
        'user-agent': 'Mozilla/5.0',  // mimic browser user agent
        accept: 'application/json',
      },
    });

    // Return Swiggy API data as JSON string with CORS headers
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers,
    };
  }
};
