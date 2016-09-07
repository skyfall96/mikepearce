module.exports = function(app) {
	var awsRoutes = require('./AWS/awsRoutes');
	var request = require('request');

	app.get('/api/aws/:asin/reviews', awsRoutes.getReviews);

	app.get('/api/background', function(req, res) {
		var image = require('../../modules/backgrounds/getRandomImage')(req, res);
		res.sendFile(image);
	});
};
