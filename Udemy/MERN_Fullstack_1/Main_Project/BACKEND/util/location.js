const axios = require("axios");

const HttpError = require('../models/http-error');
const { MAP_API_KEY } = require('../sneaky'); // get your own google key you sneaky guy >:)

async function getCoordsForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${MAP_API_KEY}`
  );

  const data = response.data;

  // 'ZERO_RESULTS' apparently custom google response
  if (!data || data.status === 'ZERO_RESULTS') {
    const error = new HttpError('Could not find the location for the specified address.', 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordsForAddress;
