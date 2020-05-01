/* Global Variables */
const apiKey = '&appid=6f2b809108a9e9accceb41304658d42f'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';

// Create a new date instance dynamically with JS
let d = new Date();
// UK date format used
let newDate = ('0' + d.getDate()).slice(-2) + '.' + ('0' + d.getMonth()).slice(-2) + '.' + d.getFullYear();

// Event listener adds function to DOM
document.getElementById('generate').addEventListener('click', performAction);

// Function called by event listener
function performAction(e) {
  const myCity = document.getElementById('city').value;
  const myFeelings = document.getElementById('feelings').value;

  getWeatherData(baseURL, myCity, apiKey).then(function(weatherData) {
    postData('http://localhost:3000/addWeatherData', {
      date: newDate,
      currentWeather: weatherData.weather[0].main,
      userResponse: myFeelings
    })
  }).then(function() {
    updateUI('http://localhost:3000/all')
  }).then(function(value) {
    console.log('all promises resolved');
  }, function(reason) {
    console.log('error in promises');
  })
}

// Function to GET Web API data
const getWeatherData = async (baseURL, myCity, apiKey) => {

  console.log('WEATHER');

  const res = await fetch(baseURL + myCity + apiKey)
  try {
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log("error", error);
  }
}

// Function to POST data
const postData = async (url = '', data = {}) => {

  console.log('POST');
  console.log(data);

  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  console.log(data)

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

// Function to GET Project Data and update UI
const updateUI = async (url = '') => {

  console.log('UPDATE');

  const res = await fetch(url);
  try {
    const data = await res.json();
    let allData = data[data.length - 1];
    console.log(data)

    document.getElementById("weather").innerHTML = 'Current Weather: ' + allData.weather;
    document.getElementById("date").innerHTML = 'Date: ' + newDate;
    document.getElementById("content").innerHTML = 'How I\'m feeling: <br>' + allData.userResponse;

} catch (error) {
    console.log("error", error);
  }
}
