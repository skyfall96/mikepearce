let updateInterval = 5; // minutes

let aqi = document.getElementById('aqi');
let temperature = document.getElementById('temperature');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let lastUpdated = document.getElementById('lastUpdated');

let category = document.getElementById('category');
let message = document.getElementById('message');

let refresh = () => {
  fetch('/api/aqi').then((response) => {
    response.json().then((data) => {
      aqi.innerHTML = data.aqi;
      category.innerHTML = data.category.toLowerCase();
      message.innerHTML = data.generalMessage === 'None' ? '' : data.generalMessage;
      temperature.innerHTML = data.temperature;
      humidity.innerHTML = data.humidity;
      pressure.innerHTML = data.pressure;
      lastUpdated.innerHTML = (new Date(data.ts)).toTimeString().split(' ')[0];

      let colorClass;
      switch (true) {
        case data.aqi < 50:
          colorClass = 'green';
          break;
        case data.aqi < 100:
          colorClass = 'yellow';
          break;
        case data.aqi < 150:
          colorClass = 'orange';
          break;
        case data.aqi < 200:
          colorClass = 'red';
          break;
        case data.aqi < 300:
          colorClass = 'violet';
          break;
        default:
          colorClass = 'hazard';
      }
      document.body.classList.replace(document.body.classList.value, colorClass);
    });
  });
}

setInterval(refresh, updateInterval * 60 * 1000);
refresh();
