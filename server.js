// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
const cors = require('cors');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);

function listening() {
  console.log('running on localhost: ' + port);
};

const weatherData = [];

// Initialise all route with callback function
app.get('/all', getData);

// Callback function to cary out GET '/all'
function getData(req, res) {

  res.send(weatherData);

  console.log('GET')
  console.log(weatherData)


};


// Post route for weather sendData
app.post('/addWeatherData', addWeatherData);

function addWeatherData(req, res) {
  newEntry = {
    weather: req.body.currentWeather,
    date: req.body.date,
    userResponse: req.body.userResponse
  }

  weatherData.push(newEntry)
  res.send(weatherData)
  console.log('POST')
  console.log(weatherData)
};
