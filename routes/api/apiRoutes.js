let request = require('request');
let AQI = require('aqi-bot');

module.exports = app => {
	app.get('/api/background', (req, res) => {
		let image = require('../../modules/backgrounds/getRandomImage')(req, res);
		res.status(200).sendFile(image);
	});

	app.get('/api/aqi', (req, res) => {
		request('https://www.purpleair.com/json?show=3869', function(e, aqiResponse, body) {
			let json = JSON.parse(body);
			let pm25 = [];
			json.results.forEach(function(sensor) {
				if (sensor && !sensor.A_H) {
					pm25.push(parseFloat(sensor.PM2_5Value));
				}
			});
			let pm25avg = pm25.reduce((a, b) => a + b) / pm25.length;
			AQI.AQICalculator.getAQIResult('PM2.5', pm25avg).then(aqiResult => {
				aqiResult.temperature = parseInt((json.results[0].temp_f - 32) * 0.5556 * 10) / 10;
				aqiResult.humidity = parseFloat(json.results[0].humidity);
				aqiResult.pressure = parseInt(json.results[0].pressure);
				aqiResult.ts = json.results[0].LastSeen * 1000;
				res.status(200).send(aqiResult);
			});
		});
	});
};
