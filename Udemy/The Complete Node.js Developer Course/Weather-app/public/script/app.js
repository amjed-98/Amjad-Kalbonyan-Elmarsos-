const getWeather = async (location) => {
  const response = await fetch(`/weather?address=${location}`);

  const data = await response.json();

  if (data.error) return data.error;
  return data;
};

const weatherForm = document.querySelector('form');
const searchInput = document.querySelector('input');

const MsgOne = document.getElementById('Msg1');
const MsgTwo = document.getElementById('Msg2');

weatherForm.onsubmit = async (e) => {
  e.preventDefault();

  const enteredLocation = searchInput.value;

  MsgOne.textContent = 'loading ...';
  MsgTwo.textContent = '';

  const forecastData = await getWeather(enteredLocation);

  if (typeof forecastData === 'string')
    return (MsgOne.textContent = forecastData);

  const {
    location,
    forecast: { temp, feelsLike, weatherDescription, humidity },
  } = forecastData;

  MsgOne.textContent = location;
  MsgTwo.textContent = `${weatherDescription}. it is currently ${temp} degrees and feels like ${feelsLike} and the humidity is ${humidity} `;
};
