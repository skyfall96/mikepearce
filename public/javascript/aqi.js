let updateInterval = 5; // minutes
let refreshInterval;

let aqi = document.getElementById('aqi');
let temperature = document.getElementById('temperature');
let humidity = document.getElementById('humidity');
let pressure = document.getElementById('pressure');
let pressureScale = document.getElementById('pressure-scale');
let lastUpdated = document.getElementById('lastUpdated');

let category = document.getElementById('category');
let message = document.getElementById('message');

let refresh = () => {
  if (!refreshInterval) {
    refreshInterval = setInterval(refresh, updateInterval * 60 * 1000);
  }

  fetch('/api/aqi').then((response) => {
    response.json().then((data) => {
      aqi.innerHTML = data.aqi;
      category.innerHTML = data.category.toLowerCase() + '.';
      message.innerHTML = data.generalMessage === 'None' ? '' : data.generalMessage + '.';
      temperature.innerHTML = data.temperature;
      humidity.innerHTML = data.humidity;
      pressure.innerHTML = data.pressure;
      pressureScale.style.top = ((1029 - data.pressure) / (1029 - 1001) * 10) + 'vw'; //SF normal high is 1029, normal low is 1001, record high is 1036, record low is 976, scale height is 10 vw's
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
      document.body.className = '';
      document.body.classList.add(colorClass);
    });
  });
}

document.onvisibilitychange = evt => {
  if (refreshInterval) {
    clearInterval(refreshInterval);
    refreshInterval = null;
  }
  if (!document.hidden) {
    refresh();
  }
}

refresh();
