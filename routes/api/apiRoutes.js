let request = require('request');

module.exports = app => {
	app.get('/api/background', (req, res) => {
		let image = require('../../modules/backgrounds/getRandomImage')(req, res);
		res.sendFile(image);
	});
};
