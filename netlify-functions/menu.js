const axios = require("axios");

exports.handler = async function (event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers };
  }

  const { restaurantId } = event.queryStringParameters;

  if (!restaurantId) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "restaurantId is required" }),
      headers,
    };
  }

  try {
    const response = await axios.get(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=28.6691565&lng=77.45375779999999&restaurantId=${restaurantId}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }
    );

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
