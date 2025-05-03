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
    const response = await axios.get('https://www.swiggy.com/dapi/restaurants/list/v5', {
      params: {
        lat: '28.6691565',
        lng: '77.45375779999999',
        is_seo_homepage_enabled: true,
        page_type: 'DESKTOP_WEB_LISTING',
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
      headers,
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
      headers,
    };
  }
};
