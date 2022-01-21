const generateMessage = (username, text, color) => {
  return {
    username,
    text,
    createdAt: new Date().getTime(),
    color,
  };
};

const generateLocation = (username, { latitude, longitude }) => {
  return {
    username,
    url: `https://google.com/maps?q=${latitude},${longitude}`,
    createdAt: new Date().getTime(),
  };
};

module.exports = {
  generateMessage,
  generateLocation,
};
