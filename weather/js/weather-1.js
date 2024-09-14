const api = {
  key: "fcc8de7015bbb202209bbf0261babf4c",
  base: "https://api.openweathermap.org/data/2.5/"
};

document.querySelector('.search-bar').addEventListener('keypress', function(evt) {
  if (evt.keyCode === 13) {
    const query = evt.target.value;
    fetchWeatherAndForecast(query);
  }
});

function fetchWeatherAndForecast(query) {
  const weatherUrl = `${api.base}weather?q=${query}&units=metric&appid=${api.key}`;
  const forecastUrl = `${api.base}forecast?q=${query}&units=metric&appid=${api.key}`;

  fetch(weatherUrl)
    .then(response => {
      if (!response.ok) throw new Error('Weather fetch error: ' + response.statusText);
      return response.json();
    })
    .then(data => {
      displayWeather(data);
    })
    .catch(error => console.error('Error fetching weather:', error));

  fetch(forecastUrl)
    .then(response => {
      if (!response.ok) throw new Error('Forecast fetch error: ' + response.statusText);
      return response.json();
    })
    .then(data => {
      displayForecast(data);
    })
    .catch(error => console.error('Error fetching forecast:', error));
}

function displayWeather(weather) {
  document.querySelector('.location .city').innerText = `${weather.name}, ${weather.sys.country}`;
  document.querySelector('.location .date').innerText = new Date().toDateString();
  document.querySelector('.current .temp').innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;
  document.querySelector('.current .weather').innerText = weather.weather[0].main;
  document.querySelector('.hi-low').innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
  document.querySelector('.expected-time').innerText = 'Expected Time: N/A';
}

function displayForecast(forecast) {
  const forecastContainer = document.querySelector('.forecast-container');
  forecastContainer.innerHTML = '';

  const forecastItems = forecast.list.filter(item => {
    return new Date(item.dt * 1000).getHours() === 12;
  }).slice(0, 5);

  if (forecastItems.length === 0) {
    forecastContainer.innerHTML = '<p>No forecast data available.</p>';
  }

  forecastItems.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const temp = `${Math.round(item.main.temp)}°C`;
    const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;

    const forecastItem = document.createElement('div');
    forecastItem.classList.add('forecast-item');
    forecastItem.innerHTML = `
      <div class="forecast-date">${date}</div>
      <img src="${icon}" alt="${item.weather[0].description}">
      <div class="forecast-temp">${temp}</div>
    `;
    forecastContainer.appendChild(forecastItem);
  });
}
