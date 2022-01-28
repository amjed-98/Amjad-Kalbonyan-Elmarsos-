const request = require('request');

const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoicm9iYmVuOTgiLCJhIjoiY2t4bGI4emhiMW4zcjJwa2oxejU3ZjN5cSJ9.bD6YfKyoWR7tK1VQsCXBCQ&limit=1;`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(`unable to connect to weather service`, undefined);
    } else if (!body.features.length) {
      callback(`no results found, try different search terms`, undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geoCode;
