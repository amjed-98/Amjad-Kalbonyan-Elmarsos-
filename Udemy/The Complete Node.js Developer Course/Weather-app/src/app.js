// ! renew weather app license

const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;

const geoCode = require('./utils/geoCode');
const getForecast = require('./utils/getForecast');

// define paths for Express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static directory to serve
app.use(express.static(publicPath));

// expose the application and request locals
hbs.localsAsTemplateData(app);

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Amjad Yahia',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'about me ',
    name: 'Amjad Yahia',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'this is helping',
    title: 'help',
    name: 'Amjad Yahia',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) return res.send({ error: 'must provide address' });

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });

      getForecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Amjad Yahia',
    error: 'help article not found',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Amjad Yahia',
    error: 'page not found',
  });
});

app.listen(port, () => console.log('server is up on port ' + port));
