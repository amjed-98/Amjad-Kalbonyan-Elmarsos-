const request = require('request');

const getForecast = (longitude, latitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=f069385e8eda9e0a778645e5b53c35b7&query=${longitude},${latitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('no internet connection');
    } else if (body.error) {
      callback(`invalid longitude and latitude`);
    } else {
      callback(undefined, {
        weatherDescription: body.current.weather_descriptions[0],
        temp: body.current.temperature,
        feelLike: body.current.feelslike,
      });
    }
  });
};

module.exports = getForecast;
